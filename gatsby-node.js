const _ = require('lodash');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;
	return new Promise((resolve, reject) => {
		const landingPage = path.resolve('./src/components/landing-page.js');
		resolve(
			graphql(
				`
					{
						allAuthorsJson(sort: { fields: [articlesCount], order: DESC }) {
							totalCount
							edges {
								node {
									authorName
									authorProfileURL
									articlesCount
									lastestEntryTime
								}
							}
						}
					}
				`
			).then(result => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}
				const data = result.data;
				// How many items do we have?
				const authorsCount = data.allAuthorsJson.totalCount;
				// How many items per paginated page?
				const pageSize = 20;
				// How many paginated pages do we need?
				const pagesCount = Math.ceil(authorsCount / pageSize);

				console.log('authorsCount', authorsCount);
				console.log('pagesCount', pagesCount);
				// Create each paginated page
				_.times(pagesCount, index => {
					createPage({
						// Calculate the path for this page like `/blog`, `/blog/2`
						path: paginationPath('/', index, pagesCount),
						// Set the component as normal
						component: landingPage,
						// Pass the following context to the component
						context: {
							// Skip this number of items from the beginning
							skip: index * pageSize,
							// How many items to show on this paginated page
							limit: pageSize,
							// How many paginated pages there are in total
							pagesCount,
							// Current page:
							page: index + 1,
							// The path to the previous paginated page (or an empty string)
							prevPath: paginationPath('/', index - 1, pagesCount),
							// The path to the next paginated page (or an empty string)
							nextPath: paginationPath('/', index + 1, pagesCount),
						},
					});
				});
			})
		);
	});
};

function paginationPath(path, page, totalPages) {
	if (page === 0) {
		return path;
	} else if (page < 0 || page >= totalPages) {
		return '';
	} else {
		return `${path}/page/${page + 1}`;
	}
}
