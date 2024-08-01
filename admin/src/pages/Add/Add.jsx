import React,{useState,useEffect} from 'react'
import { assets } from '../../assets/assets'
import { food_list } from '../../../../frontend/src/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    
    const[image,setImage] = useState(false);
    const[data,setData] = useState({
        name:'',
        description:'',
        price:'',
        category:'Salad'
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
       event.preventDefault();
       const formData = new FormData();
            formData.append('name',data.name)
            formData.append('description',data.description)
            formData.append('price',Number(data.price))
            formData.append('category',data.category)
            formData.append('image',image)
            const response = await axios.post(`${url}/api/food/add`,formData);
            if(response.data.success){
                setData({
                    name:'',
                    description:'',
                    price:'',
                    category:'Salad'
                })
                setImage(false)
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        
    }

    // const bulkAddItems = async () => {
    //     for (let i = 1; i < food_list.length; i++) {
    //       const item = food_list[i];
    //       const formData = new FormData();
    //       formData.append('name', item.name);
    //       formData.append('description', item.description);
    //       formData.append('price', Number(item.price));
    //       formData.append('category', item.category);
      
    //       // Fetch the image file from the URL
    //       const response = await fetch(item.image);
    //       const blob = await response.blob();
    //       formData.append('image', blob, item.image.split('/').pop());
      
    //       try {
    //         const response = await axios.post(`${url}/api/food/add`, formData);
    //         if (response.data.success) {
    //           toast.success(`Added ${item.name} successfully.`);
    //         } else {
    //           toast.error(`Failed to add ${item.name}: ${response.data.message}`);
    //         }
    //       } catch (error) {
    //         toast.error(`An error occurred while adding ${item.name}.`);
    //       }
      
    //       // Add a slight delay to avoid overwhelming the server
    //       await new Promise(resolve => setTimeout(resolve, 500));
    //     }
    //   };
    
    //   useEffect(() => {
    //     bulkAddItems();
    //   }, []);
    
    

  return (
    <div className='w-[70%] ml-[max(5vw,30px)] mt-[50px] text-[#6d6d6d] text-md '>
        <form className='flex-column gap-5' onSubmit={onSubmitHandler}>
            <div className='flex-column'>
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img className='w-[120px]' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className='flex-column w-[max(40%,280px)]'>
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} className='p-2' type="text" name='name' placeholder='Type here' />
            </div>
            <div className='flex-column w-[max(40%,280px)]'>
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} className='p-2' name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className='flex gap-7'>
                <div className='flex-column'>
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.category} className='max-w-[120px] p-2.5' name="category" >
                    <option value = "Salad">Salad</option>
                    <option value = "Rolls">Rolls</option>
                    <option value = "Deserts">Deserts</option>
                    <option value = "Sandwich">Sandwich</option>
                    <option value = "Cake">Cake</option>
                    <option value = "Pure Veg">Pure Veg</option>
                    <option value = "Pasta">Pasta</option>
                    <option value = "Noodles">Noodles</option>
                    </select>
                </div>
                <div className='flex-column'>
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} className='max-w-[120px] p-2.5' type="Number" name='price' placeholder='$20' />
                </div>
            </div>
            <button className='max-w-[120px] border-none p-2.5 bg-orange-500 text-white hover:bg-black cursor-pointer' type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default Add