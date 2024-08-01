import React ,{useContext,useEffect,useState}from 'react'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  
  const{getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const[data,setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    phoneNumber:''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }


  const placeFoodOrder = async (event) => {
     event.preventDefault();
     let orderItems = [];
     console.log("cartItems: ", cartItems);
     food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
     })
     console.log(orderItems)
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      
      alert("Something went wrong")
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  }, [token]);

  return (
    <>
    <form onSubmit={placeFoodOrder} className='px-5 flex flex-col items-center mt-10 gap-[50px] md:flex-row md:items-start md:justify-between'>
      <div className='w-full max-w-[max(30%,500px)]'>
        <p className='mb-5 text-3xl font-bold text-black'>Delivery Information</p>
        <div className='flex gap-2'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border flex gap-2.5' type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border flex gap-2.5' type="text" placeholder='Last name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email}  className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border outline-orange-500' type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street}  className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border outline-orange-500' type="text" placeholder='Street'/>
        <div className='flex gap-2'>
          <input required name='city' onChange={onChangeHandler} value={data.city}  className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border flex gap-2.5' type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state}  className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border flex gap-2.5' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-2'>
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode}  className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border flex gap-2.5' type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country}  className='mb-4 w-full p-2.5 border-[#c5c5c5] rounded-lg border flex gap-2.5' type="text" placeholder='Country'/>
        </div>
        <input required name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber}  className='mb-4 w-full p-2.5 border-[#c5c5c5] border rounded-lg  outline-orange-500' type="text" placeholder='Phone number' />
      </div>
      <div className='w-full max-w-[max(40%,500px)]'>
      <div className='flex flex-col gap-5 flex-1'>
          <h2 className='text-xl font-bold'>Cart Total</h2>
          <div>
            <div className='flex justify-between text-[#555]'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className='mt-1'/>
            <div className='flex justify-between text-[#555]' >
              <p>Delivery Fee</p>
              <p >${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr className='mt-1'/>
            <div className=' mt-1 flex justify-between text-[#555]'>
              <b>Total</b>
              <p className='font-bold'>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>          
          </div>
          <button type='submit' className='bg-orange-500 font-bold p-2 rounded-lg text-white hover:bg-black hover:text-white'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default PlaceOrder