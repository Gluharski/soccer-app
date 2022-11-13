const baseURL = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all';

const options = {
    headers: {
        'X-RapidAPI-Key': '16393793dbmsh4d76b449ff481c6p19207bjsn3ae3d8e407ae',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    } 
}

export const library = async () => {
    const res = await fetch(baseURL, options)
    const data = await res.json();

    let leagues = [];

    for(let item of data.response) {
        let findLeague = leagues.find(({ id}) => {
            return item.league.id === id;
        });

        if(!findLeague) {
            findLeague = {
                id: item.league.id,
                name: item.league.name,
                matches: []
            }
            
            leagues.push(findLeague);
        };

        findLeague.matches.push(item.teams)
    }
    console.log(leagues);

    return leagues.sort((a,b) => {
        return a.name.localeCompare(b.name);
    });
}
