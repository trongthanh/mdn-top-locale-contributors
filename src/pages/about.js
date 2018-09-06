import React from 'react';

import Layout from '../components/layout';

const AboutPage = () => (
	<Layout>
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1 className="display-4">About</h1>
				<p>About Why and How I created this microsite.</p>
			</div>
		</div>
		<article className="container">
			<h2>Why?</h2>
			<p>
				Inspired by <strong>git-awards.com</strong> and <strong>commits.top</strong> websites, I created this
				microsite to honor top contributors to <a href="https://developer.mozilla.org/">MDN</a> for the{' '}
				<a href="https://developer.mozilla.org/en-US/dashboards/revisions?locale=vi">Vietnamese translations</a>
				. The purpose is to encourage more Vietnamese language users esp. web developers will join the effort to
				make MDN the best reference and guide for Web development.
			</p>
			<h2>How?</h2>
			<p>
				This website will scrape{' '}
				<a href="https://developer.mozilla.org/en-US/dashboards/revisions">MDN revisions dashboard</a> (publicly
				available) to get the list of changes to a specific locale (e.g VI - Vietnamese) and generate a list of
				top authors based on their number of contributed articles.
			</p>
			<p>
				Why <strong>rank on number of articles</strong> and not on revisions, you may ask? I have reviewed many
				revisions and noticed that different authors will publish their changes differently. Some will publish
				several minor changes to an article while others only publish an article once they finish the whole
				piece. So, ranking top contributors based on number of articles written / translated is most reliable
				measure for now. If two or more authors has the same number of articles contributed, they are then
				sorted by when latest entry was made.
			</p>
			<p>
				Bear in mind that the ranking is <strong>not real time</strong>. The list of changes will be scraped
				again at intervals and accumulated offsets. This post will be updated when the scraping mechanism is
				more mature and stable.
			</p>
			<h2>Who are you?</h2>
			<p>
				I am just another Front End / JavaScript developer from{' '}
				<a href="https://en.wikipedia.org/wiki/Ho_Chi_Minh_City">Saigon</a>, Vietnam. Visit my home page{' '}
				<a href="https://int3ractive.com">int3ractive.com</a> for more details and contact info.
			</p>
		</article>
	</Layout>
);

export default AboutPage;
