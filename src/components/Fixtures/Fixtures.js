import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Match from "../Match/Match";

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
	}, [leagueId]);

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
	}, [leagueId]);

	return (
		<section className="fixtures">
			{data.map(x => <Match data={x} />)}
		</section>
	)
};

export default Fixtures;