import React,{useEffect,useState,useContext} from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {
    
    const {addToCart,removeFromCart,cartItems,url} = useContext(StoreContext)

  return (
    <div className='w-full m-auto border rounded-[15px] shadow-black '>
        <div className='relative'>
            <img className='w-full rounded-tl-custom-tl rounded-tr-custom-tr rounded-bl-custom-bl rounded-br-custom-br' src={url+"/images/"+image} alt="" />
             {
                !cartItems[id]?<img className='w-[40px] absolute bottom-2 right-2 rounded-[50%] cursor-pointer' onClick={()=>addToCart(id)} src = {assets.add_icon_white} alt=""/>
                :<div className='absolute bottom-2 right-2 flex items-center gap-2.5 p-1.5 rounded-[50px] bg-white'>
                    <img className='w-[30px]' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img className='w-[30px]'onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div> 
             }
        </div>
        <div className='p-5'>
            <div className='flex justify-between items-center mb-2.5'>
                <p className='text-md font-semibold'>{name}</p>
                <img className='w-[70px]' src={assets.rating_starts} alt="" />
            </div>
            <p className='text-[#676767] text-lg'>{description}</p>
            <p className='text-orange-500 font-semibold my-2.5'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem