require('isomorphic-fetch');

const { URL } = require('url');
const fs = require('fs');
const cheerio = require('cheerio');
const _ = require('lodash');

function fetchPage() {
	const query = {
		locale: 'vi',
		// user,
		// topic,
		// start_date,
		// end_date,
		// preceding_period,
		authors: 0,
		page: 1,
	};
	const url = new URL('https://developer.mozilla.org/vi/dashboards/revisions');
	Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
	console.log('Full URL:', url.href);

	// return fetch(url.href, {
	return fetch('/home/thanh/work/labs/thanh/mdn-vi-top-contributors.github/private/response-example.html', {
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
			return html;
		});
}

// for testing locally
function readSampleFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(
			'/home/thanh/work/labs/thanh/mdn-vi-top-contributors.github/private/response-example.html',
			'utf8',
			(err, data) => {
				if (!err) {
					resolve(data);
				}
			}
		);
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
		console.log('Entry:', entryObj);

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

			return authors;
		},
		{}
	);
	const authors = Object.keys(objAuthors).map(authorName => {
		const author = objAuthors[authorName];
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
		console.log(authorName, ':', author.articles);
		return author;
	});
	console.log('objAuthors:', authors);
}

async function main() {
	// const html = await fetchPage();
	const html = await readSampleFile();
	const parsedData = parsePage(html);

	console.log(parsedData);
}

main();
