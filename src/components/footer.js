import React from 'react';

const Footer = () => (
	<footer className="text-muted">
		<div className="container">
			<p className="float-right">
				<a href="#">Back to top</a>
			</p>
			<p>
				<small>
					© 2018 <a href="https://int3ractive.com">Tran Trong Thanh</a>. Made in{' '}
					<a href="https://en.wikipedia.org/wiki/Ho_Chi_Minh_City">Saigon</a>, Vietnam. View source at{' '}
					<a href="https://github.com/trongthanh/mdn-top-locale-contributors">Github</a>.
				</small>
				<br />
				<small>This is personal project and is not affiliated with the MDN project or Mozilla.</small>
			</p>
		</div>
	</footer>
);

export default Footer;
