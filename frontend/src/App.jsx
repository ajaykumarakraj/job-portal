

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar  from './components/shared/Navbar.jsx'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/pages/Home.jsx'
import "./index.css"
const appRouter=createBrowserRouter([
{
  path:"/",
  element:<Home/>
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/signup",
  element:<Signup/>
},

])


function App() {
 

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
