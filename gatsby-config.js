module.exports = {
	siteMetadata: {
		title: 'MDN Top Vietnamese Locale Contributors - int3ractive.com',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'mdn-top-vi-contributors',
				short_name: 'mdn-vi-top',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/images/appicon.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline',
		'gatsby-transformer-json',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: './data/',
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-4430452-10',
				// Puts tracking script in the head instead of the body
				head: false,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				// exclude: ["/preview/**", "/do-not-track/me/too/"],
			},
		},
	],
};
