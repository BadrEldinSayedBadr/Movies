import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function ItemDetails() {
    let {id, media_type} = useParams();
    const [itemDetails, setItemDetails] = useState({})


    async function getItemDetails(id, media_type){
        let {data} = await axios.get(`
        https://api.themoviedb.org/3/${media_type}/${id}?api_key=ed51b18e61e981ca144231f2423b71a3`);
        setItemDetails(data);
        console.log(data);
    }
    useEffect(()=>{
        getItemDetails(id, media_type)
    },[])

  return <>

    <div className="row py-5">
        <div className="col-md-3">
        {itemDetails.poster_path?         <img src={`https://image.tmdb.org/t/p/w500`+ itemDetails.poster_path} className="w-100" alt="" />
:        <img src={`https://image.tmdb.org/t/p/w500`+ itemDetails.profile_path} className="w-100" alt="" />

}
        </div>
        <div className="col-md-9">
            <h2>{itemDetails.title}{itemDetails.name}</h2>
            <p className='py-2 text-muted'>{itemDetails.tagline}</p>
            {itemDetails.vote_average? <div className='py-2 '>vote : {itemDetails.vote_average && <h6 className=' p-2 text-white d-inline'>{itemDetails.vote_average?.toFixed(1)}</h6>} </div> :''}
            {itemDetails.vote_count? <div className='py-2'>vote_count : {itemDetails.vote_count && <h6 className=' p-2 text-white d-inline'>{itemDetails.vote_count?.toFixed(1)}</h6>} </div> :''}
            {itemDetails.popularity? <div className='py-2'>Popularity : {itemDetails.popularity && <h6 className=' p-2 text-white d-inline'>{itemDetails.popularity?.toFixed(1)}</h6>} </div> :''}
            {itemDetails.release_date? <div className='py-2'>release date : {itemDetails.release_date && <h6 className=' p-2 text-white d-inline'>{itemDetails.release_date}</h6>} </div> :''}
            <p className='py-3 text-muted'>{itemDetails.overview}</p>
        </div>
    </div>

  
  </>
}
