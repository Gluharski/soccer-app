import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {
	const [playerInformation, setPlayerInformation] = useState([]);
	const { playerId } = useParams();

	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${playerId}&season=2022`, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				setPlayerInformation(response.response)
			})
			.catch(err => console.error(err));
	}, []);

	return (
		<>
			{playerInformation.length > 0
				? playerInformation.map(x => console.log(x))
				: 'There is no data for this player.'
			}
		</>
	)
}

export default Player;