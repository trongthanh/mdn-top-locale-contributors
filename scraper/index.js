/* © 2018 Tran Trong Thanh
 * Scrape the whole MDN for VI contribution entries and authors data
 */
require('isomorphic-fetch');

const { URL } = require('url');
const _ = require('lodash');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { fetchProfile } = require('./profile');
const metaJson = require('../data/meta.json');
const authorsJson = require('../data/authors.json');
const entriesJson = require('../data/entries.json');

const checkTime = _.find(metaJson, { key: 'checkTime' });

function getStartDate(dateStr = '') {
	// the str replacer is to remove timezone conversion of Date parser
	// as per: https://stackoverflow.com/questions/12076212/format-a-date-in-javascript-without-converting-to-local-timezone
	let date = new Date(dateStr.replace(/[TZ]/g, ' ').replace(/-/g, '/'));
	// invalid date
	if (!date.getTime()) {
		date = new Date(0); // since epoc
	}
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function fetchPage(page = 1) {
	const query = {
		page,
		locale: 'vi',
		authors: 0,
		start_date: getStartDate(checkTime.value),
		preceding_period: 'day',
		// user,
		// topic,
		// end_date,
	};
	const url = new URL('https://developer.mozilla.org/vi/dashboards/revisions');
	Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
	console.log('Full URL:', url.href);

	return fetch(url.href, {
		method: 'GET',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
	})
		.then(function(response) {
			if (response.status >= 400) {
				throw new Error('Bad response from server');
			}
			return response.text();
		})
		.then(function(html) {
			// console.log(html);
			return parsePage(html);
		});
}

function parsePage(html) {
	let $ = cheerio.load(html);
	// console.log('html: ', html);
	const $entries = $('.dashboard-table tbody tr.dashboard-row');
	const entries = [];
	$entries.each((index, el) => {
		// console.log($entry);
		const $entry = $(el);
		const entryObj = {
			// unique for each entry
			revisionURL: $entry.find('.dashboard-revision a').prop('href'),
			dateTime: $entry.find('.dashboard-revision a time').attr('datetime'),
			// unique for each article
			url: $entry.find('.dashboard-title a').prop('href'),
			title: $entry.find('.dashboard-title a').text(),
			// unique for each author
			authorName: $entry.find('.dashboard-author a').text(),
			authorProfileURL: $entry.find('.dashboard-author a').prop('href'),
		};
		// console.log('Entry:', entryObj);

		entries.push(entryObj);
	});

	console.log('There are', $entries.length, 'entries');
	console.log(
		'Current Page:',
		$('.pagination .selected a')
			.first()
			.text()
	);
	console.log('Has next page:', $('.pagination .next').length ? 'YES' : 'NO');
	console.log('Has prev page:', $('.pagination .prev').length ? 'YES' : 'NO');

	return {
		entries,
		hasNext: $('.pagination .next').length > 0,
	};
}

/**
 * Main data processor, parsing new entries and merge with existing entries
 * @param  {[type]} entries [description]
 * @return {[type]}         [description]
 */
function processEntries(entries = []) {
	const currentEntries = Array.isArray(entriesJson) && entriesJson.length ? entriesJson : [];

	// step 1. Filter and keep only new entries
	const newEntries = entries.filter(entry => !_.find(currentEntries, { revisionURL: entry.revisionURL }));
	console.log('newEntries', newEntries);
	// step 2. Reduce new entries to group by authors
	const objAuthors = _.reduce(
		newEntries,
		(authors, entry) => {
			const authorEntry = _.pick(entry, ['revisionURL', 'dateTime', 'url', 'title']);
			if (!authors[entry.authorName]) {
				authors[entry.authorName] = {
					authorName: entry.authorName,
					authorProfileURL: entry.authorProfileURL,
					entries: [authorEntry],
				};
			} else {
				authors[entry.authorName].entries.push(authorEntry);
			}

			return authors;
		},
		{}
	);

	// step 3. Create or update authors in the authors database
	const allAuthors = Array.isArray(authorsJson) && authorsJson.length ? authorsJson : [];
	const recentAuthors = Object.keys(objAuthors).map(authorName => {
		const author = objAuthors[authorName];
		let currentAuthor = _.find(allAuthors, { authorName });

		// author already existed:
		if (currentAuthor) {
			currentAuthor.entries = currentAuthor.entries.concat(author.entries);
		} else {
			// new author
			allAuthors.unshift(author);
			currentAuthor = author;
		}
		// sort entry by dateTime descending
		currentAuthor.entries.sort((a, b) => {
			return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
		});

		// getting author summary
		const authorArticles = _.groupBy(currentAuthor.entries, 'url');
		currentAuthor.articles = Object.keys(authorArticles).map(url => {
			const articleEntries = authorArticles[url];

			return {
				url,
				title: articleEntries[0].title,
				revisions: articleEntries.length,
			};
		});
		currentAuthor.articlesCount = currentAuthor.articles.length;
		currentAuthor.lastestEntryTime = currentAuthor.entries[0].dateTime;

		return currentAuthor;
	});

	// step 4. Sort and ranking
	allAuthors.sort((a, b) => {
		// first sort by entry time
		const byArticleCounts = b.articlesCount - a.articlesCount;

		if (byArticleCounts !== 0) {
			// not equal, sort by articleCounts
			return byArticleCounts;
		}
		// if equal, then sort by lastestEntryTime
		return new Date(b.lastestEntryTime).getTime() - new Date(a.lastestEntryTime).getTime();
	});
	// calculate ranking
	allAuthors.forEach((author, index) => {
		author.rank = index + 1;
	});

	const allEntries = currentEntries.concat(newEntries);
	allEntries.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

	return {
		recentAuthors, // for fetching updated profile
		authors: allAuthors,
		entries: allEntries,
	};
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

function writeFiles(parsedEntries) {
	// console.log(parsedEntries.authors);
	fs.writeFile(
		path.resolve(__dirname, '../data/authors.json'),
		JSON.stringify(parsedEntries.authors, null, '\t'),
		'utf8',
		() => {
			console.log('Write authors.json done');
		}
	);
	fs.writeFile(
		path.resolve(__dirname, '../data/entries.json'),
		JSON.stringify(parsedEntries.entries, null, '\t'),
		'utf8',
		() => {
			console.log('Write entries.json done');
		}
	);
	if (checkTime) {
		checkTime.value = new Date();
	}
	// console.log('metaJson', metaJson);
	fs.writeFile(path.resolve(__dirname, '../data/meta.json'), JSON.stringify(metaJson, null, '\t'), 'utf8', () => {
		console.log('Write meta.json done');
	});
}

// NOTE: this is full fetch
// TODO: write accumulate fetch using previous date time
async function main() {
	// const html = await readSampleFile();
	// const pageData = parsePage(html);
	let next = true;
	let currentPage = 1;
	let recentEntries = [];

	while (next) {
		const pageData = await fetchPage(currentPage);
		recentEntries = recentEntries.concat(pageData.entries);
		currentPage += 1;
		if (!pageData.hasNext) {
			next = false;
		}
		console.log('Page fetched: ', currentPage, ', items:', pageData.entries.length);
	}

	const data = processEntries(recentEntries);
	await asyncForEach(data.recentAuthors, async author => {
		// we get new profile every time we visit this author to update latest info
		const profile = await fetchProfile(`https://developer.mozilla.org/${author.authorProfileURL}`);
		const currentAuthor = _.find(data.authors, { authorName: author.authorName });
		currentAuthor.profile = profile;
		console.log('updated author profile:', profile);
	});
	console.log('data.entries:', data.entries.length);
	console.log('data.recentAuthors:', data.recentAuthors.length);
	console.log('data.authors:', data.authors.length);
	if (data.recentAuthors.length) {
		writeFiles(data);
	} else {
		console.log('No new entries. Skip writing JSON');
	}
	console.log('****** ALL DONE ******');
}

main();

// for testing locally
// eslint-disable-next-line
function readSampleFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(__dirname, '../private/response-example.html'), 'utf8', (err, data) => {
			if (!err) {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});
}

// eslint-disable-next-line
async function test() {
	/*
	const html = await readSampleFile();
	const pageData = parsePage(html);
	/*/
	const pageData = await fetchPage();
	console.log('pageData', pageData);
	//*/
	const parsedEntries = processEntries(pageData.entries);

	console.log('parsedEntries.entries:', parsedEntries.entries.length);
	console.log('parsedEntries.recentAuthors:', parsedEntries.recentAuthors.length);
	console.log('parsedEntries.authors:', parsedEntries.authors.length);
	// testing sort
	/*
	const allAuthors = authorsJson;
	allAuthors.sort((a, b) => {
		const byArticleCounts = b.articlesCount - a.articlesCount;

		if (byArticleCounts !== 0) {
			// not equal, we have a clear sort by articleCounts
			return byArticleCounts;
		}
		// if not, sort by lastestEntryTime
		const byLatestEntryTime = new Date(b.lastestEntryTime).getTime() - new Date(a.lastestEntryTime).getTime();
		return byLatestEntryTime;
	});
	fs.writeFile(
		path.resolve(__dirname, '../data/authors2.json'),
		JSON.stringify(allAuthors, null, '\t'),
		'utf8',
		() => {
			console.log('Write authors2.json done');
		}
	);
	//*/

	// if (checkTime) {
	// 	checkTime.value = new Date();
	// }
	// console.log('metaJson', metaJson);
	// fs.writeFile(path.resolve(__dirname, '../data/meta.json'), JSON.stringify(metaJson, null, '\t'), 'utf8', () => {
	// 	console.log('Write meta.json done');
	// });
}
// test();
