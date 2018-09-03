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
const Profile = ({ author, rank }) => {
	const profile = author.profile || {};
	return (
		<tr>
			<td>{rank}</td>
			<td>
				{author.authorName}
				{profile.fullName && ` (${profile.fullName})`}
			</td>
			<td>{author.articlesCount}</td>
			<td>
				<img src={profile.avatar} width="80" />
			</td>
		</tr>
	);
};

export default Profile;
