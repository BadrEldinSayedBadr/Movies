import React from 'react';
import {Link} from 'react-router-dom';




export default function Navbar({userData, logOut}) {



  return <>
  <nav className='p-2 d-flex justify-content-between'>
      <div className="left-side d-flex align-items-center">
        <h1 className='m-0 fw-bolder'>noxe</h1>
        {userData? <ul className='d-flex m-0'>
        <li className='px-2'><Link to ='/' className='link'>Home</Link> </li>
        <li className='px-2'><Link to ='movies' className='link'>Movies</Link> </li>
        <li className='px-2'><Link to ='tv' className='link'>Tv show</Link> </li>
        <li className='px-2'><Link to ='people' className='link'>People</Link> </li>
        <li className='px-2'><Link to ='about' className='link'>About</Link> </li>
      </ul> : ''}
      </div>
      <div className="right-side d-flex align-items-center">

        <div className="social-media">
          <i className='fab mx-1 px-2 fa-facebook'></i>
          <i className='fab mx-1 px-2 fa-instagram'></i>
          <i className='fab mx-1 px-2 fa-twitter'></i>
          <i className='fab mx-1 px-2 fa-spotify'></i>
          <i className='fab mx-1 px-2 fa-youtube'></i>
          <i></i>
          <i></i>
        </div>

        <ul className='d-flex m-0'>


          {userData? <>
            <li className='px-2' onClick={logOut}><Link to ='logout' className='link'>LogOut</Link> </li>
          <li className='px-2'><Link to ='profile' className='link'>Profile</Link> </li>


          </>: <>

          <li className='px-2'><Link to ='login' className='link'>Login</Link> </li>
          <li className='px-2'><Link to ='register' className='link'>Register</Link> </li>
          </>
          
          }
          

    
        </ul>
      </div>
  </nav>
  </>
}
