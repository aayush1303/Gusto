import React from 'react'

const Header = () => {
  return (
<div className="h-[40vw] lg:h-[34vw] mx-[15px] lg:mx-[22px] my-auto relative bg-[url('/header_img.png')] bg-no-repeat bg-contain ">
        <div className='absolute flex flex-col items-start gap-[1.5vw] lg:max-w-[60%] max-w-[70%] bottom-[10%] left-[4vw] animate-fadeIn z-0'>
            <h2 className='font-bold text-white text-[4vw] lg:text-5xl'>Order your favourite food here</h2>
            <p className='text-white text-[3vw] lg:text-3xl'>Choose from a diverse menu featuring a delectable array of dishes </p>
            <button className="border-none text-[#747474] font-medium p-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-[50px] hover:bg-black hover:text-white">View Menu</button>
        </div>
    </div>
  )
}

export default Header