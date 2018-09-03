import React from 'react';
import { Link } from 'gatsby';

// TODO: write up pagination logic
const Pagination = ({ page, limit, nextPath, prevPath }) => (
	<nav className="pagination" role="navigation" aria-label="pagination">
		<Link to={prevPath} className="pagination-previous" title="This is the first page" disabled>
			Previous
		</Link>
		<Link to={nextPath} className="pagination-next">
			Next page
		</Link>
		<ul className="pagination-list">
			<li>
				<Link className="pagination-link is-current" aria-label="Page 1" aria-current="page">
					1
				</Link>
			</li>
			<li>
				<Link className="pagination-link" aria-label="Goto page 2">
					2
				</Link>
			</li>
			<li>
				<Link className="pagination-link" aria-label="Goto page 3">
					3
				</Link>
			</li>
		</ul>
	</nav>
);

export default Pagination;
