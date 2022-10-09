import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

const Details = () => {
	const [data, setData] = useState([]);
	const { matchId } = useParams();

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

	console.log(data);

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
			<section className='#'>
				<h3>line-ups</h3>
			</section>
		</>
	)
}

export default Details;