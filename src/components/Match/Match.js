import styles from './Match.module.css';

const Match = ({ data }) => {
	console.log(data);
	return (
		<div className={styles['match__row']}>
			<div className="match__row__date">
				{data.fixture.date}
			</div>

			<div className={styles['match__row__teams']}>
				<div className={styles['match__row__teams--home']}>
					<div className={styles['match__row__home__team--name']}>
						<div className={styles['match__row__home__team--logo']}>
							<img src={data.teams.home.logo} alt={data.teams.home.name} />
						</div>
						{data.teams.home.name}
					</div>
					<div className="match__row--home--result">
						{data.goals.home}
					</div>
				</div>

				<div className={styles['match__separator']}>:</div>

				<div className={styles['match__row__teams--away']}>
					<div className={styles['match__row__away__team--name']}>
						<div className={styles['match__row__away__team--logo']}>
							<img src={data.teams.away.logo} alt={data.teams.away.name} />
						</div>
						{data.teams.away.name}
					</div>
					<div className="match__row--away--result">
						{data.goals.away}
					</div>
				</div>
			</div>
		</div>
	)
};

export default Match;