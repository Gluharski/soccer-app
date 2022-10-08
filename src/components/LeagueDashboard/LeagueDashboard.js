import { useParams } from "react-router-dom";

import LastFixtures from "../Fixtures/LastFixtures/LastFixtures";
import NextFixtures from "../Fixtures/NextFixtures/NextFixtures";
// import TopScorers from '../LeagueDashboard/'

const LeagueDashboard = () => {
	const { leagueId } = useParams();

	return (
		<>
			<NextFixtures leagueId={leagueId} />
			<LastFixtures leagueId={leagueId} />
			{/* <TopScorers leagueId={leagueId} /> */}
		</>
	)
};

export default LeagueDashboard;