import React from 'react';
import { graphql } from 'gatsby';

import Layout from './layout';
import ProfileRow from './profile-row';
import Pagination from './pagination';

const LandingPage = ({ pageContext, data }) => {
	const { page, limit } = pageContext;

	return (
		<Layout>
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
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
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<Pagination {...pageContext} />
						<table className="table is-fullwidth">
							<thead>
								<tr>
									<th>Rank</th>
									<th>Author</th>
									<th>Articles</th>
									<th>Last entry</th>
								</tr>
							</thead>
							<tbody>
								{data.allAuthorsJson.edges.map((author, index) => (
									<ProfileRow key={index} author={author.node} />
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
					rank
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
