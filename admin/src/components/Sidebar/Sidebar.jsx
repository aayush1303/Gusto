import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-[100vh] border border-[#a9a9a9] border-t-0 text-md'>
        <div className='pt-[50px] pl-[20%] flex flex-col gap-5'>
            <NavLink to='/add' className='sidebar flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded-tl-3px  cursor-pointer' style={{borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}>
                <img className='w-6' src={assets.add_icon} alt="" />
                <p className='hidden lg:flex'>Add Items</p>
            </NavLink>
            <NavLink to='/list' className='sidebar flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded-tl-3px  cursor-pointer' style={{borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}>
                <img className='w-6'  src={assets.order_icon} alt="" />
                <p className='hidden lg:flex'>List Items</p>
            </NavLink>
            <NavLink to='/orders' className='sidebar flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded-tl-3px  cursor-pointer' style={{borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}>
                <img className='w-6' src={assets.order_icon} alt="" />
                <p className='hidden lg:flex'>Orders Items</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar