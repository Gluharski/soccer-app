import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import * as team from '../utils/team';

const Details = () => {
	const [data, setData] = useState([]);
	const [teams, setTeams] = useState([]);
	const [players, setPlayers] = useState([]);

	const { matchId } = useParams();

	// match details
	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${matchId}`, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				// check if the object exist
				if (!response.response) {
					return [];
				}

				setData(response.response)
			})
			.catch(err => console.error(err));
	}, [matchId]);

	// fomration, starting eleven, subtitututes, coash
	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=${matchId}`, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				setTeams(response.response);
				setPlayers(response.response)
			})
			.catch(err => console.error(err));
	}, [matchId]);

	// console.log(data);
	// console.log(players)

	return (
		<>
			{/* // TODO: change style to separate file */}
			<div style={typeof data === undefined
				? { display: 'none' }
				: { display: 'block' }
			}>
				{data.length > 0
					? data.map(x =>
						<>
							<h3>
								{x.league.name}
							</h3>

							<div>
								<Link to={`/team-details/${x.teams.home.id}`}>
									{x.teams.home.name}
								</Link>

								<Link to={`/team-details/${x.teams.away.id}`}>
									{x.teams.away.name}
								</Link>
							</div>
						</>
					)
					: null
				}
			</div>

			{/*  */}
			<section className='team-lineups'>
				<h4>fomrations:</h4>
				<div className='team-fomrations'>
					{teams.map(x => (
						<section style={{ display: 'flex' }}>
							{x.formation}
						</section>
					))}
				</div>

				<div>
					{/* {players.length > 0 || typeof players === undefined
						? team.startingXI(players)
						: 'There is no data about the lineups yet.'
					} */}

					{/* {players.map(x => {
						return x.startXI;
					})} */}
				</div>
			</section>
		</>
	)
}

export default Details;