import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './components/Home/HomePage.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AllProducts from './components/Product/AllProducts.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Categories from './components/Categories.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/products' element={<AllProducts />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
