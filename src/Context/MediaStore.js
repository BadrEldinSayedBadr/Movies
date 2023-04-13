import { createContext, useState , useEffect} from "react";
import axios from "axios";



export let MediaContext = createContext('');

export default function MediaContextProvider(props){

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");

  async function getTrendingMovies(mediaType, callback){
    let {data} = await axios.get(`
    https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=ed51b18e61e981ca144231f2423b71a3`);
    callback(data.results);
  }

  async function getSearchMovies(word){
    let {data} = await axios.get(`
    https://api.themoviedb.org/3/search/tv?api_key=ed51b18e61e981ca144231f2423b71a3&query=${word}&language=en`)  
    console.log(data.results);
    if (word === '') {
      return;
    }
    setTrendingMovies(data.results)
    // callback(data.results);
  }


  useEffect(() => {
    getTrendingMovies('movie', setTrendingMovies);
    getTrendingMovies('tv', setTrendingTv);
    getTrendingMovies('person', setTrendingPeople);
  }, [])

  // console.log(trendingMovies.filter((movie) => movie.name.toLowerCase().includes("a")));



    return  <MediaContext.Provider value={{trendingMovies, trendingTv, trendingPeople, getSearchMovies, setSearchMovies, searchMovies}}>
            {props.children}
    </MediaContext.Provider>
}
