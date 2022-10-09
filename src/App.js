import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Details from './components/Details';
import Team from './components/Team';
import Player from './components/Player';

function App() {
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fixtures, setFixtures] = useState([]);

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

                {matches.length > 0
                    ? matches.map(x =>
                        <Link className='match-row' to={`/match-details/${x.fixture.id}`}>
                            <div className='match-time'>
                                {x.fixture.status.elapsed}'
                            </div>
                            <div className='teams'>
                                {/* home team info */}
                                <div className='home'>
                                    {x.teams.home.name}
                                    {x.goals.home}
                                </div>

                                {/* away team info */}
                                <div className='away'>
                                    {x.teams.away.name}
                                    <div>
                                        {x.goals.away}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                    : null}
            </main>

            <aside>
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
