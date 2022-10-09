import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../App.css';

const Team = () => {
	const [details, setDetails] = useState([]);
	const [transfers, setTransfers] = useState([]);
	const [teamInformation, setTeamInformation] = useState([]);
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

	console.log(teamInformation);

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
								<div className='venue-name'>
									{/* TODO: bolded venue name in css */}
									<b>Stadium:</b> {x.venue.name}
								</div>
								<div className='venue-capacitiy'>
									<b>Capacity:</b> {x.venue.capacity}
								</div>
							</div>
						</div>


						{/* TODO: bolded country name in css */}
						{/* league / country league */}

					</>
				))}
			</div>

			{/* transfer section */}
			<div className='latest-transfers'>
				<h3>latest transfers:</h3>
				{transfers.map(x => (
					<div>
						<Link to={`/player-details/${x.player.id}`}>
							{x.player.name}
						</Link>
					</div>
				))}
			</div>
		</section>
	)
}

export default Team;