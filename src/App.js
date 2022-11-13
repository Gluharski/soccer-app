import { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
// import Team from './components/Team';
import Details from './components/Details';

import { library } from './utils/lib';

function App() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        library().then(data => setMatches(data));
    }, []);

    return (
        <section className='app'>
            <main className='app-main'>
                <h3>
                    {matches.length} matches live
                </h3>
                {matches.length > 0
                    ? matches.map(x => (
                        <div style={{
                            margin: '20px 0',
                        }}>
                            {x.name}
                            <div>
                                {x.matches.map(x => (
                                    <div>
                                        <div style={{
                                            padding: '10px 0',
                                            margin: '5px 0',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                            color: 'black'
                                        }}>
                                            <Link to={`/match-details/${x.id}`}>
                                                {x.home.name} - {x.away.name}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                    : []
                }
            </main>

            <aside>
                <Routes>
                    <Route path='/match-details/:matchId' element={<Details />} />
                    {/* <Route path='/team-details/:teamId' element={<Team />} /> */}
                    {/* <Route path='/player-details/:playerId' element={<Player />} /> */}
                </Routes>
            </aside>
        </section >
    )
}

export default App;
