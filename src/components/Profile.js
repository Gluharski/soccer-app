import '../App.css';

const Profile = ({ matchesCount }) => {
	console.log(matchesCount);
	return (
		<div>
			{matchesCount.length
				? `${matchesCount.length}`
				: 'No favorite matches'
			}
		</div>
	)
};

export default Profile;