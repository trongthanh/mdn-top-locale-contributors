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
			<td className="align-middle">{author.rank}</td>
			<td className="align-middle">
				<a href={'https://developer.mozilla.org' + author.authorProfileURL}>{author.authorName}</a>
				{profile.fullName && ` (${profile.fullName})`}
			</td>
			<td className="align-middle">{author.articlesCount}</td>
			<td className="align-middle">
				<a href={'https://developer.mozilla.org' + author.authorProfileURL}>
					<img
						alt={`${author.authorName}'s avatar`}
						src={profile.avatar || 'https://developer.mozilla.org/static/img/avatar.png'}
						height="50"
					/>
				</a>
			</td>
		</tr>
	);
};

export default ProfileRow;
