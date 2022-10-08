import { useState, useEffect } from 'react';

import Date from '../../Match/Date/Date';
import styles from '../Fixtures.module.css';

const LastFixtures = ({ leagueId }) => {
	const [lastFixtures, setLastFixtures] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		};

		fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?last=50', options)
			.then(response => response.json())
			.then(response => {
				setLastFixtures(response.response)
			})
			.catch(err => console.error(err));
	}, []);

	return (
		<section className='last__fixtures'>
			<h3>Last Fixtures</h3>

			{lastFixtures.slice(0, 5).reverse().map(x => (
				<div className={styles['match__row']}>
					<div className="match__row__date">
						<Date date={x.fixture.date} />
					</div>

					<div className={styles['match__row__teams']}>
						<div className={styles['match__row__teams--home']}>
							<div className={styles['match__row__home__team--name']}>
								<div className={styles['match__row__home__team--logo']}>
									<img src={x.teams.home.logo} alt={x.teams.home.name} />
								</div>
								{x.teams.home.name}
							</div>
							<div className="match__row--home--result">
								{x.goals.home}
							</div>
						</div>

						{/* <div className={styles['match__separator']}>:</div> */}

						<div className={styles['match__row__teams--away']}>
							<div className={styles['match__row__away__team--name']}>
								<div className={styles['match__row__away__team--logo']}>
									<img src={x.teams.away.logo} alt={x.teams.away.name} />
								</div>
								{x.teams.away.name}
							</div>
							<div className="match__row--away--result">
								{x.goals.away}
							</div>
						</div>
					</div>
				</div>
			))}
		</section>
	)
};

export default LastFixtures;