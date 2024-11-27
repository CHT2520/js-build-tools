import { useState, useEffect } from 'react'


function FilmsHeading({decade}){
  return (<h1>Films from the {decade}s</h1>);
}


function FilmLink({title, id}){
  return <div><a href="/films/{id}">{title}</a></div>
}

function FilmList({films}){
  const filmLinks = films.map(film =>
        <FilmLink title={film.title} id={film.id} key={film.id}/>
      );
  return (
    <div> 
      {filmLinks}
    </div>
  )
}

function TabbedFilmNavigation({changeDecade}){
  return (
        <div id="decadeNavHolder">
            <a href={"/films"} onClick={(event) => {
                event.preventDefault();
                changeDecade(2000);
            }}>2000</a>
             <a href={"/films"} onClick={(event) => {
                event.preventDefault();
                changeDecade(2010);
            }}>2010</a>
        </div>
      )
    }

function FilteredFilmList()
{
  const [decade, setDecade] = useState(2000);
  const [films, setFilms] = useState([]);

  const fetchFilms = async (decade) => {
    try {
      const response = await fetch('./data/films/'+decade+'s.json');
      setFilms(await response.json());
      setDecade(decade);
    } catch (error) {
      console.log('Oh no, something went wrong', error);
    }
  };

  useEffect(() => {
    fetchFilms(decade);
  },[]);

  function changeDecade(decade){
    setDecade(decade);
    fetchFilms(decade);
  }

  return(
    <div>
      <TabbedFilmNavigation changeDecade={changeDecade}/>
      <FilmsHeading decade={decade}/>
      <FilmList films={films}/>
    </div>
  )
}

function App() {
  return (
    <div>
      <FilteredFilmList/>
    </div>
  )
}
export default App
