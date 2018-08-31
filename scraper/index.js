require('isomorphic-fetch');

const { URL } = require('url');

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

fetch(url.href, {
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
		console.log(html);
	});
