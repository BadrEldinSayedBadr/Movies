import React from 'react';

export default function Profile({userData}) {

  let {first_name , last_name , age , email } = userData;
  return <>

    <h4 className='py-3 mt-5'>Name : {first_name} {last_name}</h4>
    <h4 className='py-3'>Age : {age}</h4>
    <h4 className='py-3'>Email : {email}</h4>
  
  </>
}
