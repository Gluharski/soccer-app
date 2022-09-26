import styles from './Profile.module.css';

const Profile = ({ matchesCount }) => {
	return (
		<div className={matchesCount.length >= 10
			? styles['hot']
			: styles['normal']
		}>
			{matchesCount.length
				? `${matchesCount.length}`
				: ''
			}
		</div>
	)
};

export default Profile;