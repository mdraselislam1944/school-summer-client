import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/layout/Main/Main.jsx';
import Home from './components/sharedPage/Home/Home/Home';
import Login from './components/components/Login/Login';
import Register from './components/components/Login/Register';
import AuthProvider from './components/layout/Providers/AuthProviders';
import Instructors from './components/components/Login/Instructors';
import Classes from './components/components/Login/Classes';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import AdminDashboard from './components/Pages/Dashboard/AdminDashboard';
import InstructorsDashboard from './components/Pages/Dashboard/InstructorsDashboard';
import HomeDashboard from './components/Pages/HomeDashboard';
import StudentsDashboard from './components/Pages/Dashboard/StudentsDashboard';
import Payment from './components/Pages/Payment/Payment';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Home/>,
        loader:()=>fetch('http://localhost:5000/classes'),
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/instructors',
        element:<Instructors/>,
        loader:()=>fetch('http://localhost:5000/instructors'),
      },
      {
        path:'/class',
        element:<Classes/>,
        loader:()=>fetch('http://localhost:5000/classes'),
      }
    ]
  },
  {
    path:"dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'',
        element:<HomeDashboard/>
      },
      {
        path:'admin',
        element:<AdminDashboard/>
      },
      {
        path:'instructor',
        element:<InstructorsDashboard/>
      },
      {
        path:'student',
        element:<StudentsDashboard/>
      },
      {
        path:'payment/:id',
        element:<Payment/>,
        loader:({params})=>fetch(`http://localhost:5000/discountClasses/${params.id}`)
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
  </AuthProvider>
)
