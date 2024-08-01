import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='m-auto mt-10 text-center text-[max(3vw,20px)] font-bold' id='app-download'>
        <p >For Better Experience Download <br /> <span className='text-orange-500'>Gusto App</span></p>
        <div className='flex justify-center gap-[max(2vw,10px)] mt-10'>
            <img className='w-[130px] md:w-[180px] lg:w-[200px] h-full transform hover:scale-105 cursor-pointer transition duration-500' src={assets.play_store} alt="" />
            <img className='w-[120px] md:w-[170px] lg:w-[190px] h-full transform hover:scale-105 cursor-pointer transition duration-500' src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload