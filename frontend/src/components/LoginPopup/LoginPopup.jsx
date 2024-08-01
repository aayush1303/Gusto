import React,{useState,useEffect,useContext} from 'react'
import { assets } from '../../assets/assets'
import { RxCross2 } from 'react-icons/rx'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
  
  const {url,setToken} = useContext(StoreContext)
  const[currState, setCurrState] = useState('Sign Up')
  const[data, setData] = useState({
    name:'',
    email:'',
    password:''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setData(data=>({...data, [name]:value}))
  }

  const onLogin = async(e) => {
    e.preventDefault()
    let newUrl = url;
    if(currState==='Login'){
      newUrl += '/api/user/login'
    }
    else{
      newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl, data);

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message)
    }
  }

  return (
    <div className='fixed z-[100] w-full h-full bg-[#00000090] grid'>
        <form onSubmit={onLogin} className='place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 px-[25px] py-[30px] rounded-lg' >
           <div className='flex justify-between items-center text-black'>
            <h2 className='text-xl font-bold'>{currState}</h2>
            <img className='w-4 cursor-pointer' onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
           </div>
           <div className='flex flex-col gap-5'>
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} className='outline-none border-2 border-[#c9c9c9] p-2.5 rounded-lg' type="text" placeholder='Your name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} className='outline-none border-2 border-[#c9c9c9] p-2.5 rounded-lg' type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} className='outline-none border-2 border-[#c9c9c9] p-2.5 rounded-lg' type="password" placeholder='Password' required />
           </div>
              <button type='submit' className=' p-2.5 text-white bg-orange-500 text-[15px] cursor-pointer rounded-lg'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className='flex items-start gap-2 mt-[-15px]'>
                <input className='mt-[5px]' type="checkbox" required />
                <p>By Continuing,I agree to the terms and conditions & privacy policy.</p>
            </div>
            {currState==='Login'
            ?<p>Create a new account? <span className='text-orange-500 font-bold' onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span className='text-orange-500 font-bold' onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup