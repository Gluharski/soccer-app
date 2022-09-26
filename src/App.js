import { useState } from 'react';
import './App.css';

import Item from './components/Item';
import Profile from './components/Profile';

function App() {
  const [favs, setFavs] = useState([]);
  const [items, setItems] = useState([
    { id: 1, title: 'Maritsa Plovdiv - Spartak Plovdiv' },
    { id: 2, title: 'Spartak Plovdiv - Botev Plovdiv' },
    { id: 3, title: 'Botev Plovdiv - Martisa Plovdiv' }
  ]);

  const addToFav = (event) => {
    setFavs(prevState => [...prevState, {
      id: event, title: event
    }]);
  };

    return (
      <div className="App">
        <Profile matchesCount={favs} />

        <ul>
          {items.map(x => (
            <Item
              handleClick={() => addToFav(x.id)}
              title={x.title}
              key={x.id}>
            </Item>
          ))}
        </ul>
      </div>
    );
  }

export default App;
