import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Joi from 'joi';

export default function Login({saveUserData}) {

  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email:'',
    password:''
  })

function getUserData(e){
  let myUser = {...user};
  myUser[e.target.name] = e.target.value;
  setUser(myUser);
}

async function sendLoginDataToApi(){
  let {data} = await axios.post(`https://route-movies-api.vercel.app/signin`, user);
  console.log(data);
  if(data.message === 'success'){
    setIsLoading(false);
    localStorage.setItem('userToken', data.token);
    saveUserData();
    //Home
    navigate('/');
  }
  else {
    setError(data.message);
    setIsLoading(false);
  }
}

function submitLoginForm(e){
  e.preventDefault();
  setIsLoading(true);
  let validation = validateLoginForm();
  if(validation.error){
    setIsLoading(false);
    setErrorList(validation.error.details);
  }
  else{
    sendLoginDataToApi();
  }
}

function validateLoginForm(){
 const schema = Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
  })
  return schema.validate(user,{abortEarly:false});
}


  return <>

  {errorList.map((err,index)=> {
    if(err.context.label === 'password'){
      return <div key={index} className="alert alert-danger my-2">Password invalid</div>
    }
    else {
      return <div key={index} className="alert alert-danger my-2">{err.message}</div>
    }
  } )} 


  {error.length > 0 ? <div className="alert alert-danger my-2">{error}</div>: ''}
  
  <form onSubmit={submitLoginForm} className='shadow-lg px-5'>

    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="text" placeholder='Enter Your Email' className='my-input my-3' name='email' id='email' />

    <label htmlFor="password" className='mt-3'>Password :</label>
    <input onChange={getUserData} type="password" placeholder='Enter Your Password' className='my-input my-3' name='password' id='password' />

    <button type='submit' className='btn btn-info my-4'>
      {isLoading === true? <i className='fas fa-spinner fa-spin'></i>:'Login'}
    </button>

   

  </form>
  
  </>
}
