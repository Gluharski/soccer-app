import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import styles from './Leagues.module.css';

const Leagues = () => {
	const [data, setData] = useState([]);
	const { countryName } = useParams();

	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${countryName}`, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
})
			.then(response => response.json())
			.then(response => {
				setData(response.response)
			})
			.catch(err => console.error(err));
	}, []);

	console.log(data);
	
	return (
		<section className={styles['leagues']}>
			{data.map(x => (
				<Link to={`/country/${x.name}/leagues/${x.league.id}`}>
					<img src={x.league.logo} />
					{x.league.name}
				</Link>
			))}
		</section>

		// league image / league name
	)
};

export default Leagues;