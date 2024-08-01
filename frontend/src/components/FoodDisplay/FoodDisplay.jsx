import React,{useContext} from 'react'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
    
    const {food_list} = useContext(StoreContext);

  return (
    <div className='mt-7.5 mx-4 ld:mx-7 ' id='food-display'>
        <h2 className='font-bold text-2xl'>Top dishes near you</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] gap-y-[50px]">
            {food_list.map((item, index) => {
                if(category==='all' || category===item.category){
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price} />
                } 
            })}
        </div>
    </div>
  )
}

export default FoodDisplay