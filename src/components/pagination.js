import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

const Pagination = ({ page, nextPath, prevPath, pagesCount }) => {
	const nextDisabledClass = page < pagesCount ? '' : ' disabled';
	const prevDisabledClass = page > 1 ? '' : ' disabled';
	return (
		<nav className="row justify-content-between" aria-label="Page navigation">
			<div className="col-md-auto">
				<ul className="pagination">
					<li className={'page-item' + prevDisabledClass}>
						<Link className="page-link" to={prevPath}>
							Previous
						</Link>
					</li>
					{_.times(pagesCount, index => {
						const pageNum = index + 1;
						const isActive = pageNum === page ? ' active' : '';
						const linkTo = pageNum === 1 ? '/' : '/page/' + pageNum;

						return (
							<li className={'page-item' + isActive}>
								<Link className="page-link" to={linkTo}>
									{pageNum}
								</Link>
							</li>
						);
					})}
					<li className={'page-item' + nextDisabledClass}>
						<Link className="page-link" to={nextPath}>
							Next
						</Link>
					</li>
				</ul>
			</div>
			<p className="col-md-auto mt-2">
				Page {page} of {pagesCount}
			</p>
		</nav>
	);
};

export default Pagination;
