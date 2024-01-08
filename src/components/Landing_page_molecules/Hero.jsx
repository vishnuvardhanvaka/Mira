import React from "react";
import Typed from 'react-typed'
function Hero(){
    return(
        <div className="text-black">
            <div className="w-full max-w-[800px] mt-[-96px] h-screen mx-auto text-center flex flex-col justify-center">
                <p className="uppercase my-0 font-bold p-2 text-[#00df9e]">Your Trusted Companion on the Journey of Parenthood</p>
                <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">Mira Parent Pal.</h1>
                <div className="flex justify-center items-center">
                    <p className="md:text-5xl sm:text-4xl text-xl font-bold mx-0 p-2"> Mira is</p>
                    <Typed
                        className="md:text-5xl sm:text-4xl text-xl font-bold"
                        strings={[
                            'Precise',
                            'Adapts',
                            
                            ]}
                        typeSpeed={50}
                        backSpeed={50}
                        loop >
                    </Typed>
                </div>
                <button className="bg-[#00df9e] w-[200px] rounded-md mx-auto font-medium my-6 py-3" ><a href="/signup">Get started</a></button>
            </div>
        </div>
    )
}
export default Hero;