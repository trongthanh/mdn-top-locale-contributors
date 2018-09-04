import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from './layout';
import ProfileRow from './profile-row';
import Pagination from './pagination';

const LandingPage = ({ pageContext, data }) => {
	const { prevPath, nextPath, pagesCount, page, limit } = pageContext;

	return (
		<Layout>
			<div class="jumbotron jumbotron-fluid">
				<div class="container">
					<h1 className="display-4">
						MDN Top <code>vi</code> Locale Contributors
					</h1>
					<p>
						List of top contributors to Vietnamese articles on{' '}
						<a href="http://developer.mozilla.org">MDN</a>. This list was updated at{' '}
						<strong>{new Date(data.metaJson.value).toUTCString()}</strong>.
					</p>
				</div>
			</div>
			<div class="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<Pagination {...pageContext} />
						<table className="table is-fullwidth">
							<thead>
								<tr>
									<th>Rank</th>
									<th>Author</th>
									<th>Articles</th>
									<th>Photo</th>
								</tr>
							</thead>
							<tbody>
								{data.allAuthorsJson.edges.map((author, index) => (
									<ProfileRow author={author.node} rank={index + 1 + (page - 1) * limit} />
								))}
							</tbody>
						</table>
						<Pagination {...pageContext} />
					</div>
				</div>
			</div>
		</Layout>
	);
};
/*
 */

export default LandingPage;

export const query = graphql`
	query LandingPage($skip: Int!, $limit: Int!) {
		metaJson(key: { eq: "checkTime" }) {
			key
			value
		}
		allAuthorsJson(skip: $skip, limit: $limit, sort: { fields: [articlesCount], order: DESC }) {
			totalCount
			edges {
				node {
					authorName
					authorProfileURL
					articlesCount
					lastestEntryTime
					profile {
						fullName
						location
						org
						avatar
						joinDate
						links {
							type
							url
						}
					}
				}
			}
		}
	}
`;
