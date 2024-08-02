import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
   
  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error(response.data.message)
    }
  }

  const removeFoodItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    if(response.data.success){
      toast.success(response.data.message)
      fetchList();
    }else{
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='p-5 '>
      <p className='text-xl font-bold mb-4'>All Foods List</p>
      <div className='list overflow-auto max-h-[80vh]'>
        <div className='list-table-format bg-[#f9f9f9]'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img className='' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button onClick={()=>removeFoodItem(item._id)} className='cursor-pointer '>X</button>
            </div>
          )
        })} 
      </div>
    </div>
  )
}

export default List