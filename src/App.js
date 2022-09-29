import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './App.module.css';
import Countries from './components/Countries/Countries';
import Leagues from './components/Leagues/Leagues';
import Fixtures from './components/Fixtures/Fixtures';
import Date from './components/Match/Date/Date';

function App() {
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://api-football-v1.p.rapidapi.com/v3/countries', {
            headers: {
                'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response => {
                setCountries(response.response);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
            headers: {
                'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response => {
                setData(response.response);
            })
            .catch(err => console.error(err));
    }, []);

    console.log(data);

    return (
        <div className={styles['App']}>
            <aside className={styles['aside-navbar']}>
                <Routes>
                    <Route path='/' element={<Countries countries={countries} />} />
                    <Route path='/country/:countryName/leagues' element={<Leagues />} />
                </Routes>
            </aside>

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
            {/* when you click in navbar => show current news in this league */}
        </div>
    );
}

export default App;
