import React from "react";
import { Link } from "react-router-dom";
function HomeFooter(){
    function handleButtons(){
        window.location.reload();
    }
    return(
        <div className="w-full z-10 fixed h-[3.5rem] bottom-0 bg-black">
            <div className=" w-full grid-cols-4 bg-green-600 flex justify-between">
                <button onClick={(e)=>{localStorage.setItem('tab','knowledge-base');handleButtons()}} className="border h-[3.5rem] px-3  border-[black] bg-white hover:bg-blue-300 duration-300">Knowledge Base</button>
                <button onClick={(e)=>{localStorage.setItem('tab','service-2');handleButtons()}} className="border h-[3.5rem] px-3  border-[black] bg-white hover:bg-blue-300 duration-300">service 2</button>
                <button onClick={(e)=>{localStorage.setItem('tab','service-3');handleButtons()}} className="border h-[3.5rem] px-3  border-[black] bg-white hover:bg-blue-300 duration-300">service 3</button>
                <button onClick={(e)=>{localStorage.setItem('tab','service-4');handleButtons()}} className="border h-[3.5rem] px-3  border-[black] bg-white hover:bg-blue-300 duration-300">service 4</button>
            </div>
        </div>
    )
}
export default HomeFooter; 