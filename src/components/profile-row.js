import React from 'react';

// "profile": {
// 	"fullName": "",
// 	"location": "",
// 	"org": "",
// 	"avatar": "https://secure.gravatar.com/avatar/8641158f4790fa91988667083bb3f8cf?s=200&r=pg&d=https%3A%2F%2Fdeveloper.mozilla.org%2Fstatic%2Fimg%2Favatar.png",
// 	"joinDate": "2018-08-30T19:05:55.815000-07:00",
// 	"links": [
// 		{
// 			"type": "github",
// 			"url": "https://github.com/tttam0113"
// 		}
// 	]
// }
const ProfileRow = ({ author }) => {
	const profile = author.profile || {};
	return (
		<tr>
			<td className="align-middle">
				<strong>{author.rank}</strong>
			</td>
			<td className="align-middle">
				<a href={'https://developer.mozilla.org' + author.authorProfileURL}>
					<img
						alt={`${author.authorName}'s avatar`}
						src={profile.avatar || 'https://developer.mozilla.org/static/img/avatar.png'}
						height="40"
					/>
				</a>
				&nbsp; <a href={'https://developer.mozilla.org' + author.authorProfileURL}>{author.authorName}</a>
				{profile.fullName && ` (${profile.fullName})`}
			</td>
			<td className="align-middle">{author.articlesCount}</td>
			<td className="align-middle">{formatDate(author.lastestEntryTime)}</td>
		</tr>
	);
};

// TODO: render distance in word with client side update every minute
function formatDate(dateStr) {
	const date = new Date(dateStr);

	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
		2,
		'0'
	)}`;
}

export default ProfileRow;
