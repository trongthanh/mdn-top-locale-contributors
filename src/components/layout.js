import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
//TODO: I'm using CDN's linked Bootstrap CSS, will move it to npm later

const Layout = ({ children }) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				metaJson(key: { eq: "checkTime" }) {
					key
					value
				}
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={data => (
			<>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{
							name: 'description',
							content: `List of top contributors to Vietnamese articles on MDN. This list was updated at ${new Date(
								data.metaJson.value
							).toUTCString()}`,
						},
						{
							name: 'keywords',
							content: 'mdn, mozilla dev docs, top contributors, locale, vietnamese, vi, translate',
						},
						{
							property: 'og:description',
							content: `List of top contributors to Vietnamese articles on MDN. This list was updated at ${new Date(
								data.metaJson.value
							).toUTCString()}`,
						},
						{ property: 'og:type', content: 'website' },
						{ property: 'og:title', content: data.site.siteMetadata.title },
						{ property: 'og:image', content: '/cover.png' },
					]}
				>
					<html lang="en" />
				</Helmet>
				<Header siteTitle={data.site.siteMetadata.title} />
				<main>{children}</main>
				<hr />
				<Footer />
			</>
		)}
	/>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
