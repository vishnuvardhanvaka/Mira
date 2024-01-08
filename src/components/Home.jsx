import React, { useEffect } from 'react'
import HomeNavbar from './Home_page_molecules/HomeNavbar';
import HomeFooter from './Home_page_molecules/HomeFooter';
import HomeButtons from './Home_page_molecules/HomeButtons';
function Home(){
    useEffect(()=>{
        localStorage.setItem('tab','knowledge-base')
    },[])
    return(
        <div className="flex w-full flex-col h-screen overflow-x-hidden no-scrollbar">
            <HomeNavbar />
            <HomeButtons />
            <HomeFooter />
        </div>
    )
}
export default Home;