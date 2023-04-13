import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function ItemDetails() {

    

    
    let { id, media_type} = useParams();
    console.log(id, media_type);
     
    const [itemDetails, setItemDetails] = useState([])
    const [genres, setGenres] = useState([])

    async function getItemDetails(id, media_type) {
        let { data } = await axios.get(`
        https://api.themoviedb.org/3/${media_type}/${id}?api_key=ed51b18e61e981ca144231f2423b71a3`);
        setItemDetails(data);
        setGenres(data.genres.map(gen => gen.name));
        console.log(data);
    }
    useEffect(() => {
        getItemDetails(id, media_type)
    }, [])

  return <>

  <div className="container">

  <div className="row py-5">
        <div className="col-md-3">
        {itemDetails.poster_path?<img src={`https://image.tmdb.org/t/p/w500`+ itemDetails.poster_path} className="w-100" alt="" />
:        <img src={`https://image.tmdb.org/t/p/w500`+ itemDetails.profile_path} className="w-100" alt="" />

}
        </div>
        <div className="col-md-9">

            
            <h2 className='fw-bolder'>{itemDetails.title}{itemDetails.name}</h2>
            <p className=' text-muted'>{itemDetails.tagline}</p>
            <div className='d-flex py-3 '>
            {genres.map((gen, index)=>(
                    <div className='p-1 px-4 mx-3 genres'>{gen}</div>          
            ))}
            </div>
            {itemDetails.vote_average? <div className='py-2'>Rating : {itemDetails.vote_average && <h6 className=' p-2 text-white d-inline'>{itemDetails.vote_average?.toFixed(1)}</h6>} </div> :''}
            {itemDetails.vote_count? <div className='py-2'>Vote Count : {itemDetails.vote_count && <h6 className=' p-2 text-white d-inline'>{itemDetails.vote_count?.toFixed(0)}</h6>} </div> :''}
            {itemDetails.release_date? <div className='py-2'>Release date : {itemDetails.release_date && <h6 className=' p-2 text-white d-inline'>{itemDetails.release_date}</h6>} </div> :''}
            {itemDetails.original_language? <div className='py-2'>Language : {itemDetails.original_language && <h6 className=' p-2 text-white d-inline'>{itemDetails.original_language}</h6>} </div> :''}
            {itemDetails.runtime? <div className='py-2'>Time : {itemDetails.runtime && <h6 className=' p-2 text-white d-inline'>{itemDetails.runtime}min</h6>} </div> :''}
            {itemDetails.overview? <h3 className='pt-4'>Overview </h3>:''}
            <p className='py-1 text-muted'>{itemDetails.overview}</p>
            {itemDetails.biography? <div><h3 className='pb-3'>Biography</h3> {itemDetails.biography && <h6 className=' p-2 text-white d-inline text-muted'>{itemDetails.biography}</h6>} </div> :''}
            {itemDetails.place_of_birth? <div><h4 className='pt-3 d-inline-block'>place of birth : </h4> {itemDetails.place_of_birth && <h6 className=' p-2 text-muted text-white d-inline'>{itemDetails.place_of_birth}</h6>} </div> :''}            
            {itemDetails.birthday? <div><h4 className='pt-2 d-inline-block'>Birthday : </h4> {itemDetails.birthday && <h6 className=' p-2 text-white d-inline text-muted'>{itemDetails.birthday}</h6>} </div> :''}            
            {itemDetails.homepage? <a target='_blanck' href={itemDetails.homepage}><button className='btn btn-danger my-2'> see more</button></a> :''}

        </div>
    </div>

  </div>

  
  </>
}
