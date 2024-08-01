import React, { useState, useEffect,useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { FaBars, FaSearch } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';

import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home");

  const{getTotalCartAmount,token,setToken} = useContext(StoreContext);


  
  const navigate = useNavigate();

  const logout = () =>{
     localStorage.removeItem('token');
     localStorage.clear();
     setToken("");
     navigate('/');
  }

  const [visible, setVisible] = useState(false);

  const showMenu = () => {
    setVisible(!visible);
  }



  return (
    <>
      <div className='p-[15px] md:p-[20px] flex justify-between items-center sticky top-0 z-50 bg-[#F8EDED] rounded-b-xl'>
        <Link to ='/'><img src={assets.logo} alt='logo' className='w-[150px]' /></Link>
        <ul className=" hidden md:flex list-none gap-5 font-xl text-[#49557e]">
          <li onClick={() => setMenu("home")} className={` cursor-pointer ${menu === 'home' ? "active" : ""}`}>Home</li>
          <li onClick={() => setMenu("menu")} className={`cursor-pointer ${menu === 'menu' ? "active" : ""}`}>Menu</li>
          <li onClick={() => setMenu("mobile-app")} className={`cursor-pointer ${menu === 'mobile-app' ? "active" : ""}`}>Mobile-app</li>
          <li onClick={() => setMenu("contact-us")} className={`cursor-pointer ${menu === 'contact-us' ? "active" : ""}`}>Contact Us</li>
        </ul>
        <div className="flex items-center gap-5">
          <FaSearch className=" text-xl" />
          <div className="relative">
            <Link to='/cart'><MdFastfood className="text-xl" /></Link>
            <div className={getTotalCartAmount()===0?"":'absolute min-w-[10px] min-h-[10px] bg-orange-600 border rounded-[5px] top-[-8px] right-[-8px]'}></div>
          </div>
          <IoPerson onClick={()=>setShowLogin(true)} className='md:hidden text-xl cursor-pointer' />
          <div className='cursor-pointer' onClick={showMenu}><FaBars className="md:hidden text-xl " /></div>
          {!token?<button onClick={()=>setShowLogin(true)} className=" hidden md:flex px-6 py-2 border border-[#49557e] rounded-full hover:bg-red-500 hover:text-white hover:border-transparent">Sign In</button>
           :<div className='navbar-profile relative'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown absolute right-0 hidden '>
              <li onClick={()=>navigate('/myorders')} className='flex items-center gap-2.5 cursor-pointer hover:text-orange-600'><img className='w-5' src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout} className='flex items-center gap-2.5 cursor-pointer hover:text-orange-600'><img className='w-5' src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
            </div>
          }
        </div>
      </div>
      {visible && <div className='fixed bg-white w-[50%] h-full z-[100] top-0 right-0'>
        <div className='text-3xl p-4 cursor-pointer' onClick={showMenu}>
          <RxCross2 color='black' />
        </div>
        <div className='flex-col flex p-4'>
          <h>Home</h>
          <h>About Us</h>
          <h>Contact Us</h>
          <h>Mobile-app</h>
        </div>
      </div>}
    </>
  )
}

export default Navbar