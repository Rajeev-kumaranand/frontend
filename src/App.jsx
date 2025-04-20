import './App.css'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register'
import { createBrowserRouter, Route, RouterProvider, Routes, } from "react-router";
import { Link } from "react-router-dom";
import Profile from './Components/Main/Profile';
import Privateroute from './Components/Privateroute';
import Editpost from './Components/Editpost';
import Profileupdate from './Components/Profileupdate';
import Mainprofile from './Components/Main/Mainprofile';
import SearchedUser from './Components/Main/SearchedUser';
import toast, { Toaster } from 'react-hot-toast';

// Nothing
const router = createBrowserRouter([
  {
    path: "/",
    element:  <Home />
  },

  {
    path: "/login",
    element: <Login />
  },
  // {
  //   path: "/profile",
  //   element: (
  //     <Privateroute>
  //       <Profile />
  //     </Privateroute>
  //   )

  // },
  // {
  //   path: "/editpost/:id",
  //   element: <Editpost />
  // },
  // {
  //   path: "/profileupdate",
  //   element: <Profileupdate />
  // },
  {
    path: "/mainprofile",
    element: (
      <Privateroute>
        <Mainprofile />
      </Privateroute>
    )
  },
  {
    path: '/searchedUser/:id',
    element: (
      <Privateroute>
        <SearchedUser />
      </Privateroute>
    )
  }
]);

function App() {
  return (
    <>
   <Toaster/>
    <RouterProvider router={router} />
    </>
  )
}

export default App
