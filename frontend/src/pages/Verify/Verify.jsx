import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const[searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+'/api/order/verify',{orderId,success});
        if(response.data.success){
            navigate("/myorders")
        }else{
            navigate('/');
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='min-h-[60vh] grid'>
        <div className='verify w-[100px] h-[100px] place-self-center border-[5px] border-[#bdbdbd] rounded-[50%] border-t-orange-500 '>

        </div>
    </div>
  )
}

export default Verify