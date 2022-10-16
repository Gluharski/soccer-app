import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as momentjs from '../utils/moment';

import '../App.css';

const Team = () => {
	const [details, setDetails] = useState([]);
	const [transfers, setTransfers] = useState([]);
	const [teamInformation, setTeamInformation] = useState([]);
	const [upcomingMatches, setUpcomingMatches] = useState([]);
	const [lastMatches, setLastMatches] = useState([]);
	const { teamId } = useParams();

	// venue
	useEffect(() => {
		fetch('https://api-football-v1.p.rapidapi.com/v3/teams?id=' + teamId, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				setTeamInformation(response.response);
			})
			.catch(err => console.error(err));
	}, []);

	// standing
	useEffect(() => {
		fetch('https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&team=' + teamId, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				setDetails(response.response);
			})
			.catch(err => console.error(err));
	}, []);

	// latest transfers
	useEffect(() => {
		fetch('https://api-football-v1.p.rapidapi.com/v3/transfers?team=' + teamId, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				setTransfers(response.response);
			})
			.catch(err => console.error(err));
	}, []);

	// next matches
	useEffect(() => {
		fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${teamId}&next=1`, {
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		})
			.then(response => response.json())
			.then(response => {
				setUpcomingMatches(response.response)
			})
			.catch(err => console.error(err));
	}, []);

	// console.log(upcomingMatches)

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
				'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
			}
		};

		fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2022&team=${teamId}&last=5`, options)
			.then(response => response.json())
			.then(response => {
				setLastMatches(response.response)
			})
			.catch(err => console.error(err));
	}, []);

	// console.log(upcomingMatches)

	return (
		<section className='team-details'>
			<div className='header'>
				{teamInformation.map(x => (
					<>
						<h3>
							{x.team.name}
						</h3>

						{/* flag / country name */}
						<div className='team-information'>
							<div className='team-logo-container'>
								<img src={x.team.logo} />
							</div>


							{/* venue information */}
							<div className='venue-information'>
								<div className='venue-country'>
									<b>Country:</b> {x.team.country}
								</div>
								<div className='venue-city'>
									<b>City:</b> {x.venue.city}
								</div>
								<div className='venue-name' title={x.venue.name}>
									<b>Stadium:</b>
									{x.venue.name?.length >= 10
										? x.venue.name.substring(0, 10) + '...'
										: x.venue.name
									}
								</div>
								<div className='venue-capacitiy'>
									<b>Capacity:</b> {x.venue.capacity}
								</div>
							</div>
						</div>
					</>
				))}
			</div>

			{/* next matches */}
			<div className='next-match'>
				<h3 className='title-section'>NEXT MATCH</h3>
				{upcomingMatches?.length > 0
					?
					upcomingMatches.map(x => {
						return (
							<>
								{/* header */}
								<h3 className='next-match-league-name'>
									{x.league.name}
								</h3>
								<div className='next-match-league-date'>
									<div className='sub-title'>
										{x.league.round},
										{momentjs.date(x.fixture.date)}
									</div>
								</div>

								<div className='upcoming-match-teams'>
									<div className='upcoming-match-home-team'>
										{x.teams.home.name}
										<div className='upcoming-match-logo-container'>
											<img src={x.teams.home.logo} />
										</div>
									</div>

									<div className='upcoming-match-hour'>
										{/* current hour */}
										{momentjs.time(x.fixture.date)}
									</div>

									<div className='upcoming-match-away-team'>
										{x.teams.away.name}
										<div className='upcoming-match-logo-container'>
											<img src={x.teams.away.logo} />
										</div>
									</div>
								</div>
							</>
						);
					})
					: 'There is no information about upcoming matches.'}
			</div>

			{/* last 5 matches */}
			<div className='last-matches'>
				<h3 className='title-section'>last 5 matches</h3>
				{lastMatches?.length > 0
					? lastMatches.map(x => (
						<li>
							<div className='last-matches-date'>
								{momentjs.date(x.fixture.date)}
							</div>
							<div className='last-matches-teams'>
								<div className={x.teams.home.winner
									? 'winner'
									: null}>
									{x.teams.home.name} {x.goals.home}
								</div>
								-
								<div className={x.teams.away.winner
									? 'winner'
									: null}>

									{x.goals.away}
									{x.teams.away.name}
								</div>
							</div>
						</li>
					))
					: 'There is no data for previous matches.'}
			</div>

			{/* transfer section */}
			{/* <div className='latest-transfers'>
				<h3>latest transfers:</h3>
				{transfers?.length ? transfers.map(x => (
					<div>
						<Link to={`/player-details/${x.player.id}`}>
							{x.player.name}
						</Link>
					</div>
				))
					: 'There is no data for transfers.'
				}
			</div> */}
		</section>
	)
}

export default Team;