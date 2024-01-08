import React from "react";
import Typed from 'react-typed';
import HomeNavbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";
import KnowledgeBase from "./KnowledgeBase";
import Chat from "../Chat";
import {Link,useNavigate} from "react-router-dom";
function HomeButtons(){
    const tabRoutes={
        'knowledge-base':<KnowledgeBase />,
        'service-2':<Chat />,
        'service-3':<Chat />,
        'service-4':<Chat />,
        
    }
    return(
        <div className="text-black fixed top-[4rem] h-[calc(100vh-7.5rem)] overflow-y-auto">
            {tabRoutes[localStorage.getItem('tab')]}
        </div>
    )
}
export default HomeButtons;