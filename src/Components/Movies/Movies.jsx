import React, { useState , useEffect}  from 'react';
import axios from 'axios';
import MediaItem from '../MediaItem/MediaItem';

export default function Movies() {

  const [trendingMovies, setTrendingMovies] = useState([]);


  async function getTrendingMovies(mediaType, callback){
    let {data} = await axios.get(`
    https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=ed51b18e61e981ca144231f2423b71a3`);
    callback(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getTrendingMovies('movie', setTrendingMovies);
  }, [])

  return <>
  
  <div className="container">
  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className='brdr w-25 mb-3'></div>
      <h2 className='h3'>Trending Movies <br /> To Watch Right Now </h2>
      <p className='text-muted py-2'>Watched Movies To watch  Right Now</p>
      <div className='brdr w-100 mt-1'></div>
      </div>
    </div>

    {trendingMovies.slice(0, 16).map((item, index)=> <MediaItem item={item} key={index}/>)}
  </div>

  </div>

  
  </>
}
