import React from 'react';
import { Link } from 'gatsby';

import mdnWebDocs from '../images/mdn-web-docs.svg';

const Header = ({ siteTitle }) => (
	<nav id="navbar" className="navbar has-shadow is-spaced">
		<div className="container">
			<div className="navbar-brand">
				<a className="navbar-item" href="https://bulma.io">
					<img src={mdnWebDocs} alt="MDN Web Docs" height="28" />
				</a>
				<a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
					<span className="icon" style={{ color: '#333' }}>
						github
					</span>
				</a>
				<div id="navbarBurger" className="navbar-burger burger" data-target="navMenuDocumentation">
					<span />
					<span />
					<span />
				</div>
			</div>
			<div id="navMenuDocumentation" className="navbar-menu">
				<div className="navbar-start">
					<a className="navbar-item bd-navbar-item-documentation  is-active" href="/documentation">
						<span className="icon has-text-primary">
							<i className="fas fa-book" />
						</span>
						<span className="is-hidden-touch is-hidden-widescreen">Docs</span>
						<span className="is-hidden-desktop-only">Documentation</span>
					</a>
					<a className="navbar-item bd-navbar-item-videos " href="https://bulma.io/videos/">
						<span className="icon has-text-success">
							<i className="fas fa-play-circle" />
						</span>
						<span>Videos</span>
					</a>
					<a className="navbar-item bd-navbar-item-blog " href="https://bulma.io/blog/">
						<span className="icon bd-has-text-rss">
							<i className="fas fa-rss" />
						</span>
						<span>Blog</span>
					</a>
					<a className="navbar-item bd-navbar-item-expo " href="https://bulma.io/expo/">
						<span className="icon has-text-star">
							<i className="fas fa-star" />
						</span>
						<span>Expo</span>
					</a>
				</div>

				<div className="navbar-end">
					<a
						className="navbar-item is-hidden-touch is-hidden-desktop-only"
						href="https://github.com/trongthanh"
						target="_blank"
					>
						<span className="icon" style={{ color: '#333' }}>
							<i className="fab fa-lg fa-github-alt" />
						</span>
					</a>
					<a
						className="navbar-item is-hidden-touch is-hidden-desktop-only"
						href="https://twitter.com/trongthanh"
						target="_blank"
					>
						<span className="icon" style={{ color: '#55acee' }}>
							<i className="fab fa-lg fa-twitter" />
						</span>
					</a>
				</div>
			</div>
		</div>
	</nav>
);

export default Header;
