import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const IndexPage = ({ data }) => (
	<Layout>
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<Link to="/page-2/">Go to page 2</Link>
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

export default IndexPage;

export const query = graphql`
	query HomePageQuery {
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
