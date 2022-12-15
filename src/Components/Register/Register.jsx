import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Joi from 'joi';

export default function Register() {

  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email:'',
    password:''
  })

function getUserData(e){
  let myUser = {...user};
  myUser[e.target.name] = e.target.value;
  setUser(myUser);
}

async function sendRegisterDataToApi(){
  let {data} = await axios.post(`https://route-movies-api.vercel.app/signup`, user);
  console.log(data);
  if(data.message == 'success'){
    setIsLoading(false);
    //Login
    navigate('/login');
  }
  else {
    setError(data.message);
    setIsLoading(false);
  }
}
function submitRegisterForm(e){
  e.preventDefault();
  setIsLoading(true);
  let validation = validateRegisterForm();
  if(validation.error){
    setIsLoading(false);
    setErrorList(validation.error.details);
  }
  else{
    sendRegisterDataToApi();
  }
}

function validateRegisterForm(){
 const schema = Joi.object({
    first_name:Joi.string().min(3).max(10).required(),
    last_name:Joi.string().min(3).max(10).required(),
    age:Joi.number().min(16).max(80).required(),
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
  
  <form onSubmit={submitRegisterForm}  className='shadow-lg px-5'>
    <label htmlFor="first_name">First_name :</label>
    <input onChange={getUserData} type="text" placeholder='Enter Your First_name' className='my-input my-3' name='first_name' id='first_name' />

    <label htmlFor="last_name">Last_name :</label>
    <input onChange={getUserData} type="text" placeholder='Enter Your Last_name' className='my-input my-3' name='last_name' id='last_name' />

    <label htmlFor="age">Age :</label>
    <input onChange={getUserData} type="text" placeholder='Enter Your Age' className='my-input my-3' name='age' id='age' />

    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="text" placeholder='Enter Your Email' className='my-input my-3' name='email' id='email' />

    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" placeholder='Enter Your Password' className='my-input my-3' name='password' id='password' />

    <button type='submit' className='btn btn-info my-2'>
      {isLoading == true? <i className='fas fa-spinner fa-spin'></i>:'Register'}
    </button>

  </form>
  
  </>
}
