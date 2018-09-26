import React from 'react';

import Layout from '../components/layout';

const HowtoPage = () => (
	<Layout>
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1 className="display-4">Hướng Dẫn</h1>
				<p>Hướng dẫn tham gia dịch MDN và một số liên kết hữu dụng.</p>
			</div>
		</div>
		<article className="container">
			<h2>Các liên kết hữu dụng:</h2>
			<ul>
				<li>Chat group để trao đổi giữa các người dịch: <a href="https://gitter.im/mdn-vi-l10n/Lobby">https://gitter.im/mdn-vi-l10n/Lobby</a> (đăng nhập bằng Github)</li>
				<li>Cách thức tham gia cộng đồng MDN: <a href="https://developer.mozilla.org/vi/docs/MDN/Community">https://developer.mozilla.org/vi/docs/MDN/Community</a></li>
				<li>Trang landing dành cho người tham gia bản địa hóa MDN: <a href="https://developer.mozilla.org/vi/docs/MDN/Contribute/Localize">https://developer.mozilla.org/vi/docs/MDN/Contribute/Localize</a></li>
				<li>Cách dịch một trang tài liệu MDN: <a href="https://developer.mozilla.org/vi/docs/MDN/Contribute/Localize/dich_trang">https://developer.mozilla.org/vi/docs/MDN/Contribute/Localize/dich_trang</a></li>
				<li>Xem toàn bộ chỉnh sửa liên quan đến tiếng Việt trên MDN: <a href="https://developer.mozilla.org/vi/dashboards/revisions?locale=vi">https://developer.mozilla.org/vi/dashboards/revisions?locale=vi</a></li>
				<li>Xem tất cả các dự án l10n: <a href="https://developer.mozilla.org/en-US/docs/MDN/Contribute/Localize/Localization_projects">https://developer.mozilla.org/en-US/docs/MDN/Contribute/Localize/Localization_projects</a></li>
				<li>Top 100 bài viết được xem nhiều nhất trên MDN (để ưu tiên dịch): <a href="https://developer.mozilla.org/en-US/docs/MDN/Contribute/Localize/Top_100_articles">https://developer.mozilla.org/en-US/docs/MDN/Contribute/Localize/Top_100_articles</a></li>
				<li>Các bài viết được gắn thẻ ưu tiên dịch: <a href="https://developer.mozilla.org/en-US/docs/tag/l10n%3Apriority">https://developer.mozilla.org/en-US/docs/tag/l10n%3Apriority</a></li>
			</ul>
		</article>
	</Layout>
);

export default HowtoPage;
