import React from "react";
import HomeNavbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";
import {useLocation} from 'react-router-dom'
function Content(){
    const location = useLocation();
    return(
        <div className="text-black fixed top-[4rem] h-[calc(100vh-7.5rem)] overflow-y-auto">
            <HomeNavbar />
            <div className="w-full">
                <h1 className="font-bold uppercase bg-green-300 flex justify-center">{location.state.title}</h1>
                <h3 style={{ whiteSpace: 'pre-line' }} className="px-2 py-2">{location.state.content}</h3>
            </div>
        </div>
    )
}
export default Content;