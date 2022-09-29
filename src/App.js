import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Countries from './components/Countries/Countries';
import Leagues from './components/Leagues/Leagues';
import Fixtures from './components/Fixtures/Fixtures';

function App() {
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


    // routes

    return (
        <div className="App">
            {/* two column layout */}
            <Routes>
                <Route path='/' element={<Countries countries={countries} />} />
                <Route path='/country/:countryName/leagues' element={<Leagues />} />
                <Route path='/country/:countryName/leagues/:leagueId' element={<Fixtures />} />
            </Routes>
        </div>
    );
}

export default App;
