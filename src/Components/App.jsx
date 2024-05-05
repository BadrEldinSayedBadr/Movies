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
import MediaContextProvider from '../Context/MediaStore';
// import SearchComponent from './Search/Search';

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


  // const [data, setData] = useState([...]); // initialize data array here

  // const handleSearch = (searchTerm) => {
  //   // filter data array here based on the search term
  //   const filteredData = data.filter(item => item.includes(searchTerm));
  //   // do something with the filtered data
  // };

 

let routers = createBrowserRouter([
  {path: '/', element: <Layout setUserData={setUserData} userData={userData}/>, children: [
    {index:true, element: <Home/> }, // <ProtectedRoute><Home/> </ProtectedRoute>
    {path: 'about', element: <About/>},
    {path: 'login', element: <Login saveUserData={saveUserData}/>},
    {path: 'register', element: <Register/>},
    {path: 'movies', element: <Movies/>},
    {path: 'people', element: <People/>},
    {path: 'profile', element: <Profile userData={userData}/>},
    {path: 'itemDetails/:id/:media_type', element: <ItemDetails/>},
    {path: 'tv', element: <Tv/>},
    {path: '*', element: <NotFound/>},
  ]}
])
// {/* <div>
//       <SearchComponent data={data} handleSearch={handleSearch} />
//       {/* display filtered data here */}
//     </div> */}


  return              <MediaContextProvider>
    <RouterProvider router={routers} />
              </MediaContextProvider>
}
