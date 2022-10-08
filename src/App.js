import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Details from './components/Details';
import Team from './components/Team';
import './App.css';

import LeagueDashboard from './components/LeagueDashboard/LeagueDashboard';
import LastFixtures from './components/Fixtures/LastFixtures/LastFixtures';

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
                        <div>
                            <Link to={`/match-details/${x.fixture.id}`}>
                                {x.fixture.status.elapsed}'

            <main>
                {data.map(x => (
                        <div className={styles['match__row']}>
                            <div className="match__row__date">
                                {/* {data.fixture.date} */}
                                <Date date={x.fixture.date} />
                            </div>

                            <div className={styles['match__row__teams']}>
                                <div className={styles['match__row__teams--home']}>
                                    <div className={styles['match__row__home__team--name']}>
                                        <div className={styles['match__row__home__team--logo']}>
                                            <img src={x.teams.home.logo} alt={x.teams.home.name} />
                                        </div>
                                        {x.teams.home.name}
                                    </div>
                                    <div className="match__row--home--result">
                                        {x.goals.home}
                                    </div>
                                </div>

                                {/* <div className={styles['match__separator']}>:</div> */}

                                <div className={styles['match__row__teams--away']}>
                                    <div className={styles['match__row__away__team--name']}>
                                        <div className={styles['match__row__away__team--logo']}>
                                            <img src={x.teams.away.logo} alt={x.teams.away.name} />
                                        </div>
                                        {x.teams.away.name}
                                    </div>
                                    <div className="match__row--away--result">
                                        {x.goals.away}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) &&
                <Routes>
                    <Route path='/country/:countryName/leagues/:leagueId' element={<Fixtures />} />
                </Routes>
            
                }
            </main>

            <aside className={styles['aside-soccer-news']}>
                <h2>News</h2>
                {/* world soccer news */}
            </aside>
        </section>
    );
}

export default App;
