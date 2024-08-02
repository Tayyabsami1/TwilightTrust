import './App.css'
// import { FormPage, Home, Layout, Service1Detail,Service2Detail, SignUp, Login } from './Pages'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Home,Login,Signup,Layout } from './Pages'

function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
      ]
    },
     {
      path:'/Signup',
      element:<Signup/>,
    },
    {
      path:'/Login',
      element:<Login/>
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
