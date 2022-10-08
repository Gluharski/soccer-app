import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Details from './components/Details';
import Team from './components/Team';
import './App.css';

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
                        <div className='table'>
                            <Link to={`/match-details/${x.fixture.id}`}>
                                {x.fixture.status.elapsed}'

                                {x.teams.home.name} - {x.teams.away.name}
                            </Link>
                        </div>
                    )
                    : null}
            </main>

            <aside>
                <Routes>
                    <Route path='/match-details/:matchId' element={<Details />} />
                    <Route path='/team-details/:teamId' element={<Team />} />
                </Routes>
            </aside>
        </section>
    );
}

export default App;
