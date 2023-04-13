import React, {useContext} from 'react';
import MediaItem from '../MediaItem/MediaItem';
import { MediaContext } from '../../Context/MediaStore';

export default function Home() {

  let {trendingMovies, trendingPeople, trendingTv} = useContext(MediaContext);
  
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

  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className='brdr w-25 mb-3'></div>
      <h2 className='h3'>Trending Tv <br /> To Watch Right Now </h2>
      <p className='text-muted py-2'>Watched Tv To watch  Right Now</p>
      <div className='brdr w-100 mt-1'></div>
      </div>
    </div>

    {trendingTv.slice(0, 16).map((item, index)=> <MediaItem item={item} key={index}/>)}
  </div>

  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className='brdr w-25 mb-3'></div>
      <h2 className='h3'>Trending People <br /> To Watch Right Now </h2>
      <p className='text-muted py-2'>Watched People To watch  Right Now</p>
      <div className='brdr w-100 mt-1'></div>
      </div>
    </div>

    {trendingPeople.filter((person)=> person.profile_path !== null).slice(0, 16).map((item, index)=> <MediaItem item={item} key={index}/>)}
  </div>
</div>

  </>
}
