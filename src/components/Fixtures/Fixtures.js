import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Fixtures = () => {
	const [data, setData] = useState([]);
	const { leagueId } = useParams();

	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=2022`, {
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


	// check for currect league id
	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${leagueId}`, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));
	}, []);


	return (
		<>
			{data.map(x => (
				<li>
					{x.teams.home.name} - {x.teams.away.name}
				</li>
			))}
		</>
	)
};

export default Fixtures;