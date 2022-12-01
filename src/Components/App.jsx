import React from 'react';
import { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import About from './About/About';
import Login from './Login/Login';
import Register from './Register/Register'
import Movies from './Movies/Movies';
import People from './People/People';
import Profile from './Profile/Profile';
import ItemDetails from './ItemDetails/ItemDetails';
import Tv from './Tv/Tv';
import NotFound from './NotFound/NotFound';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import '../index.css';


export default function App() {

  useEffect(() => {

    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }

  }, [])
  

  const [userData, setUserData] = useState(null);

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  
let routers = createBrowserRouter([
  {path: '/', element: <Layout setUserData={setUserData} userData={userData}/>, children: [
    {index:true, element: <ProtectedRoute userData={userData}><Home/></ProtectedRoute> },
    {path: 'about', element: <ProtectedRoute userData={userData}><About/></ProtectedRoute>},
    {path: 'login', element: <Login saveUserData={saveUserData}/>},
    {path: 'register', element: <Register/>},
    {path: 'movies', element: <ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
    {path: 'people', element: <ProtectedRoute userData={userData}><People/></ProtectedRoute>},
    {path: 'profile', element: <ProtectedRoute userData={userData}><Profile/></ProtectedRoute>},
    {path: 'itemdetails/:id/:media_type', element: <ProtectedRoute userData={userData}><ItemDetails/></ProtectedRoute>},
    {path: 'tv', element: <ProtectedRoute userData={userData}><Tv/></ProtectedRoute>},
    {path: '*', element: <NotFound/>},
  ]}
])



  return <RouterProvider router={routers} />
}
