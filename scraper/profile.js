/* © 2018 Tran Trong Thanh
 * Scrape author page
 */
require('isomorphic-fetch');

const { URL } = require('url');
const _ = require('lodash');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

function fetchProfile(url) {
	console.log('Fetching profile:', url);
	return fetch(url, {
		method: 'GET',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
	})
		.then(response => {
			if (response.status >= 400) {
				throw new Error('Bad response from server');
			}
			return response.text();
		})
		.then(html => {
			// console.log(html);
			return parseProfilePage(html);
		})
		.catch(err => {
			return null;
		});
}

// for testing locally
function readSampleFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(__dirname, '../private/profile-example.html'), 'utf8', (err, data) => {
			if (!err) {
				resolve(data);
			}
		});
	});
}

function parseProfilePage(html) {
	let $ = cheerio.load(html);
	// console.log('html: ', html);
	const profileObj = {
		fullName: $('.user-title-fullname .fn').text(),
		// intro may be multiline
		location: $('.user-info .loc').text(),
		org: $('.user-info .org').text(),
		avatar: $('.user-photo.avatar')
			.first()
			.prop('src'),
		joinDate: $('.user-since time').attr('datetime'),
		links: $('.user-links li')
			.map((i, el) => {
				const $url = $(el).find('a.url');
				return {
					type: $url.text().toLowerCase(),
					url: $url.prop('href'),
				};
			})
			.get(),
	};

	return profileObj;
}

async function test() {
	// const pageHtml = await readSampleFile();
	// const profile = parseProfilePage(pageHtml);
	const profile = await fetchProfile('https://developer.mozilla.org/vi/profiles/trongthanh');

	console.log(profile);
}

// run directly for test
// test();

exports = module.exports = {
	fetchProfile,
};
