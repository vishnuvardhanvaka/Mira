import React,{useState} from "react";
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { FaRegUser } from "react-icons/fa";
function HomeNavbar(){
  const [nav,setnav]=useState(false)
  function handleNav(){
    setnav(!nav);
  }
    return(
      <div className="fixed top-0 w-full flex justify-between z-10 items-center shadow-md h-[4rem] max-w-[1240px] mx-auto px-4 text-black">
        <div onClick={handleNav} className="block md:hidden hover:scale-105 md:cursor-pointer" >
          <AiOutlineMenu size={20}/>
        </div>
        <h1 className='w-full text-3xl font-bold text-[#00df9e] text-center'>MIRA.</h1>
        <ul className="hidden md:flex">
          <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">Company</li>
          <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">Resources</li>
          <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">Home</li>
          <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">About</li>
          <li className="p-4 cursor-pointer hover:scale-105 duration-300">Contact</li>
          <li className="p-4 cursor-pointer hover:scale-105 duration-300">
            {localStorage.getItem('isLoggedIn') ?
              <a href='/chat'>Chat</a>
              :
              <a href='/login'>Chat</a>
            }
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden md:cursor-pointer hover:scale-105" >
          <FaRegUser size={20}/>
        </div>

      
        <div className={nav ? "fixed left-0 top-0 z-10 w-[60%] border-r h-full border-r-gray-900 bg-white ease-in-out duration-500 md:hidden" : 'fixed left-[-100%] top-0 w-[60%] border-r h-full border-r-gray-900 bg-white ease-out duration-500'}>
          <div onClick={handleNav} className="m-4 flex justify-between md:hidden md:cursor-pointer " >
            <h1 className='w-full text-3xl font-bold  text-[#00df9e]'>MIRA.</h1>
            <AiOutlineClose  className='my-auto' size={20}/>
          </div>
          <ul className="p-4 uppercase">
            <li className="mb-4 p-4 border-b border-black md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Home</li>
            <li className="mb-4 p-4 border-b border-black md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Company</li>
            <li className="mb-4 p-4 border-b border-black md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Resources</li>
            <li className="mb-4 p-4 border-b border-black md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">About</li>
            <li className="mb-4 p-4 border-b border-black md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Contact</li>
            {localStorage.getItem('isLoggedIn') ?
                <a href='/chat'><li className="mb-4 p-4 md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Chat</li></a>
                :
                <a href='/login'><li className="mb-4 p-4 md:cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Chat</li></a>
            }
          </ul>
        </div>

      </div>
    )
}
export default HomeNavbar;