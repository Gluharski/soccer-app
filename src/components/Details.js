import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

// import * as startXI from '../utils/players';

const Details = () => {
	const [data, setData] = useState([]);
	const [players, setPlayers] = useState([]);
	const [coaches, setCoaches] = useState([]);

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
				// console.log(response)
				setCoaches(response.response);
				setPlayers(response.response);
			})
			.catch(err => console.error(err));
	}, [matchId]);

	console.log(players);

	return (
		<>
			{/* // TODO: change style to separate file */}
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

			<section>
				<ul style={{
					display: 'flex',
					margin: '20px 0',
					padding: 0,
					justifyContent: 'space-between',
					listStyle: 'none'
				}}>
					{coaches.map(x => (
						<li>
							{x.formation}
						</li>
					))}
				</ul>
			</section>

			<section>
				<h4>Players:</h4>
				<ul>
					{players.map(x => (
						<li>
							{x.startXI.length > 0 && x.startXI !== undefined
								? x.startXI.map(x => (
									<div>
										{x.player.name}
									</div>
								))
								: 'There is no lineups yet.'
							}
						</li>
					))}
				</ul>
			</section>

			<section style={{
				width: '100%',
				backgroundColor: 'red'
			}}>
				<h4>Coaches:</h4>
				<ul style={{
					listStyle: 'none',
					margin: 0,
					padding: 0,
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					{coaches.length > 0 ?
						coaches.map(x => (
							<li style={{
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column-reverse',
								alignItems: 'center'
							}}>
								{x.coach.name}
								<img src={x.coach.photo} />
							</li>
						))
						: 'There is no data for coaches yet.'
					}
				</ul>
			</section>
		</>
	)
}

export default Details;