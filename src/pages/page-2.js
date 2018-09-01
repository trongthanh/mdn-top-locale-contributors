import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const SecondPage = ({ data }) => (
	<Layout>
		<h1>Hi from the second page</h1>
		<p>Welcome to page 2</p>
		<Link to="/">Go back to the homepage</Link>
		<div>{data.allAuthorsJson.totalCount}</div>
		<ul>
			{data.allAuthorsJson.edges.map(author => (
				<li>
					{author.node.authorName}
					<br />
					{author.node.articlesCount}
				</li>
			))}
		</ul>
	</Layout>
);

export default SecondPage;

export const query = graphql`
	query Page2Query {
		allAuthorsJson(limit: 20, sort: { fields: [articlesCount], order: DESC }) {
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
`;
