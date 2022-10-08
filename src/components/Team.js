import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Team = () => {
	const [details, setDetails] = useState([]);
	const {teamId} = useParams();

	// venue
	useEffect(() => {
		fetch('https://api-football-v1.p.rapidapi.com/v3/teams?id=' + teamId, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));
	}, []);

	// standing
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
		}
	};

	fetch('https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&team=' + teamId, options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
	return (
		<>
			team details
		</>
	)
}

export default Team;