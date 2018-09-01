/* © 2018 Tran Trong Thanh
 * Scrape the whole MDN for VI contribution entries and authors data
 */
require('isomorphic-fetch');

const { URL } = require('url');
const _ = require('lodash');
const cheerio = require('cheerio');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require('fs');
const path = require('path');
const low = require('lowdb');

const { fetchProfile } = require('./profile');

const adapter = new FileSync(path.resolve(__dirname, '../data/data.json'));
const db = low(adapter);

db.defaults({ authors: [], entries: [] }).write();

function fetchPage(page = 1) {
	const query = {
		page,
		locale: 'vi',
		authors: 0,
		// user,
		// topic,
		// start_date,
		// end_date,
		// preceding_period,
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

// for testing locally
function readSampleFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(__dirname, '../private/response-example.html'), 'utf8', (err, data) => {
			if (!err) {
				resolve(data);
			}
		});
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

function normalizeEntries(entries) {
	// const byAuthors = _.groupBy(entries, 'authorName');
	// console.log('byAuthors:', byAuthors);
	// const byAuthors2 = _.map(author, ())
	const objAuthors = _.reduce(
		entries,
		(authors, entry) => {
			if (!authors[entry.authorName]) {
				authors[entry.authorName] = {
					authorName: entry.authorName,
					authorProfileURL: entry.authorProfileURL,
					entries: [entry],
				};
			} else {
				authors[entry.authorName].entries.push(entry);
			}
			delete entry.authorName;
			delete entry.authorProfileURL;

			return authors;
		},
		{}
	);
	const authors = Object.keys(objAuthors).map(authorName => {
		const author = objAuthors[authorName];
		// sort entry by dateTime descending
		author.entries.sort((a, b) => {
			return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
		});
		const latestEntry = author.entries[0];
		const articles = _.groupBy(author.entries, 'url');

		author.articles = Object.keys(articles).map(url => {
			const articleEntries = articles[url];
			return {
				url,
				title: articleEntries[0].title,
				revisions: articleEntries.length,
			};
		});
		author.articlesCount = author.articles.length;
		author.lastestEntryTime = latestEntry.dateTime;
		// console.log(authorName, ':', author.articles);
		return author;
	});
	// console.log('objAuthors:', authors);

	return {
		entries,
		authors,
	};
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

async function test() {
	const html = await readSampleFile();
	const pageData = parsePage(html);

	const parsedEntries = normalizeEntries(pageData.entries);
	console.log(parsedEntries.authors[0]);
}
// test();

// NOTE: this is full fetch
// TODO: write accumulate fetch using previous date time
async function main() {
	// const html = await readSampleFile();
	// const pageData = parsePage(html);
	let next = true;
	let currentPage = 1;
	let allEntries = [];

	while (next) {
		const pageData = await fetchPage(currentPage);
		allEntries = allEntries.concat(pageData.entries);
		currentPage += 1;
		if (!pageData.hasNext) {
			next = false;
		}
		console.log('Page fetched: ', currentPage, ', items:', pageData.entries.length);
	}

	const parsedEntries = normalizeEntries(allEntries);
	await asyncForEach(parsedEntries.authors, async author => {
		// we get new profile every time we visit this author to update latest info
		author.profile = await fetchProfile(`https://developer.mozilla.org/${author.authorProfileURL}`);
	});

	// console.log(parsedEntries.authors);
	db.set('authors', parsedEntries.authors)
		.set('entries', parsedEntries.entries)
		.write();
	console.log('****** ALL DONE ******');
}

main();
