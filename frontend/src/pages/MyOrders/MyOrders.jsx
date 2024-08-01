import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
     
    const{url,token} = useContext(StoreContext);
    const[data,setData]=useState([]);
    
    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            if (response.data.success) {
                setData(response.data.orders);  // Make sure it's `response.data.orders`
            } else {
                console.error("Error fetching orders:", response.data.message);  // Debug log
            }
        } catch (error) {
            console.error("Error in fetchOrders:", error);  // Debug log
        }
    }
   
    useEffect(() => {
        if(token){
            fetchOrders();
        }
    },[token]);

  return (
    <div className='mx-[50px] my-[0px]'>
       <h2 className='font-bold text-xl'>My Orders</h2>
       <div className='flex flex-col gap-5 mt-5'>
        {data.map((order,index)=>{
            return(
                <div key={index} className='orders'>
                   <img className='w-[50px]' src={assets.parcel_icon} alt=''/>
                   <p>{order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                        return item.name+' x '+item.quantity
                    }else{
                        return item.name+' x '+item.quantity+', '
                    }
                   })}</p>
                    <p>${order.amount}</p>
                    <p>Items:{order.items.length}</p>
                    <p><span className='text-orange-500'>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders} className='border-none p-[10px] text-white rounded-md bg-orange-400 cursor-pointer hover:bg-black '>Track Order</button>
                </div>
            )
        })}
       </div>
    </div>
  )
}

export default MyOrders