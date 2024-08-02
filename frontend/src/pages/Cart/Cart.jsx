import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import coupons from '../../assets/coupon.js';
import { toast } from 'react-toastify'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const [selectedCode, setSelectedCode] = useState(() => {
    return localStorage.getItem('coupon') || '';
  });
  const[discount,setDiscount] = useState(0);

  const handleCodeClick = (code, discount) => {
    if (getTotalCartAmount() === 0) {
      toast.error('Cart is empty');      
      return;
    }

    toast.success('Coupon applied successfully');
    
    setSelectedCode(code);
    setDiscount(discount);
    localStorage.setItem('coupon', code);
    localStorage.setItem('discount', discount);
  };


  const removeDiscount = () => {
    setSelectedCode('');
    setDiscount(0);
    localStorage.removeItem('coupon');
    localStorage.removeItem('discount');

    toast.success('Coupon removed successfully');
  };

  return (
    <div className='p-4 lg:p-0 mt-[100px] '>
      <ToastContainer />
      <div >
        <div class=" grid items-center text-gray-500 text-[max(1vw,12px)]" style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 0.5fr' }}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='my-2.5 text-black grid items-center text-[max(1vw,12px)]' style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 0.5fr' }}>
                  <img className='w-[50px]' src={item.image} alt={item.title} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)}><RxCross2 /></button>
                </div>
                <hr className=' bg-[#e2e2e2]' />
              </div>
            )
          }
        })}
      </div>
      <div className='mt-[80px] md:flex justify-between gap-[max(12vw,20px)]'>
        <div className='flex flex-col gap-5 flex-1'>
          <h2 className='text-xl font-bold'>Cart Total</h2>
          <div>
            <div className='flex justify-between text-[#555]'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className='mt-1' />
            <div className='flex justify-between text-[#555]' >
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className='mt-1' />
            <div className=' mt-1 flex justify-between text-[#555]'>
              <b>Total</b>
              <p className='font-bold'>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <Link to='/order'><button className='bg-orange-500 font-bold p-2 rounded-lg text-white hover:bg-black hover:text-white w-full'>PROCEED TO CHECKOUT</button></Link>
        </div>
        <div className='flex-1'>
          <div className='mt-4 md:mt-0 '>
            <p className='flex-wrap text-black'>If you have a promo code. Enter it here</p>
            <div class="flex ">
              <input
                type="text"
                placeholder="promo code"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                class=" bg-black bg-opacity-15 border border-gray-300 rounded p-2 focus:outline-none w-full"
              />
            <button onClick={removeDiscount} className="bg-black text-white rounded p-2 hover:bg-red-500 hover:text-white">
              Remove
            </button>
            </div>
            <div className='flex gap-3 mt-1 '>
               {coupons.map((coupon,index)=>{
                   return(
                    <div key={index} onClick={() => handleCodeClick(coupon.code,coupon.discount)}>
                      <div className='flex gap-4 p-2  text-[14px] bg-black text-white mt-1 justify-between rounded-md font-semibold hover:bg-orange-400 cursor-pointer'>
                      <p>{coupon.code}</p>
                      <p>{coupon.discount}%</p>
                      </div>
                    </div>
                   )
               })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart