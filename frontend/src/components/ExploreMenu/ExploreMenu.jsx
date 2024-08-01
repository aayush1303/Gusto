import React from 'react'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='flex flex-col gap-[20px] m-[20px]' id='explore-menu'>
        <h1 className='font-bold text-2xl'>Explore Our Menu</h1>
        <p className='max-w-[60%] text-lg text-[#808080]'>Choose from a diverse menu</p>
        <div id='menu-list' className="flex justify-between items-center gap-[30px]  overflow-x-scroll">
            {menu_list.map((item, index) => {
               return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"all":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img  src={item.menu_image} alt="" className={`w-[7.5vw] cursor-pointer min-w-[80px] transition-[0.2s] ${category===item.menu_name?"border-orange-600 border-[4px] p-0.5 rounded-full":""}`} />
                    <p className='mt-2.5 text-[#747474] text-lg text-center'>{item.menu_name}</p>
                </div>
               )
            })}
        </div>
        <hr className='m-2.5 h-0.5 bg-[#e2e2e2] border-none'/>
    </div>
  )
}

export default ExploreMenu