import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from "../../assets/assets"

const Orders = ({url}) => {
  
  const[orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+'/api/order/list');
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }else{
      toast.error(response.data.message);
    }
  }

  const statusHandler  = async (event,orderId) => {
       const response = await axios.post(url+'/api/order/status',{orderId,status:event.target.value}); 
      if(response.data.success){
        await fetchAllOrders();
      }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='p-5'>
      <h3 className='text-xl font-bold'>Order Page</h3>
      <div className='order overflow-y-auto max-h-[80vh]'>
        {orders.map((order,index)=>(
          <div key={index} className='orders'>
            <img src={assets.parcel_icon}/>
            <div>
              <p className='text-md font-bold'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name +" x "+item.quantity;
                  }else{
                    return item.name +" x "+item.quantity+", ";
                  }
                })}
              </p>
              <p className='text-md bold mt-[30px] mb-[5px]'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className='mb-2.5'>
              <p>{order.address.street+","}</p>
              <p>{order.address.city+", "+order.address.state+", "+order.address.country +", "+ order.address.zipCode}</p>
              </div>
              <p>{order.address.phoneNumber}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p className='font-bold'>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='bg-[#ffe8e4] border-1 border-orange-500  p-2  outline-none '>
              <option value="Food Processing">Food Processing</option>
              <option value ="Out for delivery">Out for delivery</option>
              <option value = "Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders