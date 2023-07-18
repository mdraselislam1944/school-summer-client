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
import AddClass from './components/Pages/Dashboard/Instructors/AddClass';
import Update from './components/Pages/Dashboard/Instructors/Update';
import AdminFeedBack from './components/Pages/Dashboard/AdminFeedBack';
import ErrorPage from './components/ErrorPage';
import Practice from '../practice';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/',
        element:<Home/>,
        loader:()=>fetch('https://summer-school-camp-server-mdraselislam1944.vercel.app/popularClass'),
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
        loader:()=>fetch('https://summer-school-camp-server.vercel.app/instructors'),
      },
      {
        path:'/class',
        element:<Classes/>,
        loader:()=>fetch('https://summer-school-camp-server.vercel.app/instructors'),
      },
      {
        path:"/practice",
        element:<Practice/>
      }
    ]
  },
  {
    path:"dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      // {
      //   path:"",
      //   element:<InstructorsDashboard/>
      // },
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
        loader:({params})=>fetch(`https://summer-school-camp-server-mdraselislam1944.vercel.app/paymentStatus/${params.id}`)
      },
      {
        path:"instructor/addClass",
        element:<AddClass/>
      },
      {
        path:"instructor/:id",
        element:<Update/>,
        loader:({params})=>fetch(`https://summer-school-camp-server.vercel.app/instructors/${params.id}`)
      },
      {
        path:"adminFeedback/:id",
        element:<AdminFeedBack/>,
        loader:({params})=>fetch(`https://summer-school-camp-server.vercel.app/instructors/${params.id}`)
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
