import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from './layout';
import Profile from './profile';
import Pagination from './pagination';

const LandingPage = ({ pageContext, data }) => {
	const { prevPath, nextPath, pagesCount, page, limit } = pageContext;
	return (
		<Layout>
			<h1 className="is-size-1">MDN Top Contributors</h1>
			<p>List of top contributors to MDN, Vietnamese articles.</p>
			<p>
				Page {page} of {pagesCount} pages.
			</p>
			<Link to={prevPath}>Go to previous page</Link>
			<Link to={nextPath}>Go to next page</Link>
			<div>{data.allAuthorsJson.totalCount}</div>
			<div className="columns is-centered">
				<div className="column is-three-quarters">
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
								<Profile author={author.node} rank={index + 1 + (page - 1) * limit} />
							))}
						</tbody>
					</table>
					<Pagination {...pageContext} />
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
