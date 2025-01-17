import { createContext ,useState,useEffect}from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{

    const[cartItems, setCartItems] = useState([]);
    const url = 'https://gusto-backend.vercel.app';
    const[token, setToken] = useState("");
    const[food_list, setFoodList] = useState([]);

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
        }
        if(token){
           await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) 
        }    
    }
    
    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    const getTotalCartAmount =()=>{
        
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        // Retrieve discount from localStorage
        const storedDiscount = localStorage.getItem('discount');
        const discount = storedDiscount ? parseFloat(storedDiscount) : 0;

       // Apply discount if totalAmount is greater than 100
       if (totalAmount > 10 && discount > 0) {
       totalAmount -= (totalAmount * discount) / 100;
       }

        return totalAmount;

    }

    console.log(localStorage.getItem('coupon'));

    const fetchFoodList = async()=>{
         const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    useEffect(()=>{
        async function fetchData(){
            await fetchFoodList();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        fetchData();
    },[])

    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return(
       <StoreContext.Provider value = {contextValue}>
            {props.children}
       </StoreContext.Provider>
    )
}

export default StoreContextProvider;
