import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   
  const url ='https://gusto-backend.vercel.app/'

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='flex'>
        <Sidebar/>
        <Routes>
          <Route path='/orders' element={<Orders url ={url} />} />
          <Route path='/add' element={<Add url ={url} />} />
          <Route path='/list' element={<List url ={url} />} />
          
        </Routes>
      </div>
    </div>
  )
}

export default App
