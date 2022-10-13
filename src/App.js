import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Details from './components/Details';
import Team from './components/Team';
import Player from './components/Player';
import { liveMatches } from './utils/liveMatches';

function App() {
    const [matches, setMatches] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
            headers: {
                'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response => {
                setMatches(response.response);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section className='app'>
            <main className='app-main'>
                <h3>
                    {matches.length} matches live
                </h3>
                {/* {liveMatches(matches)} */}
                {matches.length > 0
                    ? matches.map(x =>
                        <Link className='match-row' to={`/match-details/${x.fixture.id}`}>
                                <div className='match-time'>
                                    {x.fixture.status.elapsed}'
                                </div>
                                <div className='teams'>
                                    <div className='home-team-information'>
                                        <div className='home-team-name'>
                                            {x.teams.home.name}
                                        </div>
                                        <div className='home-team-goals'>
                                            {x.goals.home}
                                        </div>
                                    </div>

                                    <div className='away-team-information'>
                                        <div className='away-team-name'>
                                            {x.teams.away.name}
                                        </div>
                                        <div className='away-team-goals'>
                                            {x.goals.away}
                                        </div>
                                    </div>
                                </div>
                        </Link>
                    )
                    : 'There is no live matches yet.'}
            </main>

            <aside style={{ display: 'block' }}>
                <Routes>
                    <Route path='/match-details/:matchId' element={<Details />} />
                    <Route path='/team-details/:teamId' element={<Team />} />
                    <Route path='/player-details/:playerId' element={<Player />} />
                </Routes>
            </aside>
        </section>
    );
}

export default App;
