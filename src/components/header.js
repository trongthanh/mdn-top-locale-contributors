import React from 'react';
import { Link } from 'gatsby';

import mdnImg from '../images/mdn-mozilla-icon.svg';

const Header = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<div className="container">
			<Link className="navbar-brand p-0" to="/">
				<img src={mdnImg} alt="MDN Top Contrib" height="40" />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/about">
						About
					</Link>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						href="https://developer.mozilla.org/vi/docs/MDN/Community"
						target="_blank"
						rel="noopener noreferrer"
					>
						Hướng dẫn đóng góp cho MDN
					</a>
				</li>
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					<a className="nav-link" href="https://twitter.com/trongthanh" title="Contact me via Twitter">
						<i className="fab fa-twitter" />
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						href="https://github.com/trongthanh/mdn-top-locale-contributors"
						title="View this site source code on Github"
					>
						<i className="fab fa-github" />
					</a>
				</li>
			</ul>
			{/*<form className="form-inline my-2 my-lg-0">
				<input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="search" />
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
					Search
				</button>
			</form>*/}
		</div>
	</nav>
);

export default Header;
