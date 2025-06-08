import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Dashboard";
import Post from "../Pages/Post";

export const privateRoutes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  }
  ,
    {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/post",
    element: <Post />,
  },
   {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
    
  }
]);

export const notPrivateRoutes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
    
  } ,{
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/post",
    element: <Post />,
  }
  
]);
