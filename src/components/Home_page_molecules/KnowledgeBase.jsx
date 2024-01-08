import React, { useEffect, useState } from "react";
import introBaby from '../assets/introBaby.svg';
import Content from "./Content";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
function KnowledgeBase(){
    // const divStyle = {
    //     backgroundImage: `url(${introBaby})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //   };
    const navigate=useNavigate();
    var nModules=3;
    const [contents,setcontents]=useState([])
    const [filteredContents, setFilteredContents] = useState(contents);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(()=>{
        getContent();
    },[]);
    function getContent(){
        console.log(contents,filteredContents)
        var data=[
            {
                'title':'story',
                'content':"Once upon a time in a quaint little village nestled between rolling hills and meandering rivers, there lived a curious young girl named Emma. Emma was known for her insatiable desire to explore the world around her and uncover its hidden mysteries.\nOne sunny day, as Emma strolled through the village, she stumbled upon an ancient-looking book in the dusty corner of the village library. The book seemed to beckon her with whispers of adventure and secrets waiting to be discovered. Without hesitation, Emma opened the book and found herself entranced by its tales of magical realms, mythical creatures, and forgotten treasures.\nAs she delved deeper into the pages, Emma discovered a peculiar map tucked away within the book's worn covers. The map depicted a mysterious path leading to the Whispering Woods—a place rumored to hold the key to unlocking extraordinary powers. Intrigued and fueled by her adventurous spirit, Emma decided to embark on a journey to the Whispering Woods.\nThe journey was filled with challenges and enchanting encounters. Along the way, Emma befriended a mischievous sprite named Sparkle, who guided her through the thickets and shadows of the ancient forest. They encountered mystical creatures like talking trees and playful fairies, all of whom shared tales of the wonders hidden within the Whispering Woods.\nAs Emma ventured deeper into the heart of the forest, the air became charged with magic, and the trees whispered ancient secrets. Finally, they reached the heart of the woods, where a shimmering pool awaited. Legend had it that those who gazed into the pool with pure intentions would be granted a single wish.\n With a mixture of excitement and trepidation, Emma looked into the pool and made her wish—to bring prosperity and joy to her village. As she spoke her heartfelt desire, the water sparkled with iridescent light, and a gentle breeze carried her wish to the farthest corners of the land.\nSatisfied and filled with a newfound sense of purpose, Emma bid farewell to the Whispering Woods, knowing that the magic within would continue to weave its wonders throughout the village. She returned home, not only with tales of her extraordinary journey but also with the wisdom that magic exists not only in distant lands but also within the hearts of those who believe in the power of dreams. \nAnd so, the story of Emma and the Whispering Woods became a cherished legend in the village, passed down from generation to generation, inspiring others to seek the magic within themselves and the world around them."

            },
            {
                'title':'BabyGrowth',
                'content':'A medical expert, like a doctor, is best able to help you find the information and care you need.\nThis information does not constitute medical advice or diagnosis.'
            },
            {
                'title':'BabyDiseases',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'dipering',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'food',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'bath',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'medicine',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'birth',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'milk',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'cloths',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'sleeping',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'diet',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            {
                'title':'breast feeding',
                'content':'Colic, Cold and flu, Ear infections, Baby acne, Bacterial conjunctivitis, Diaper rash, Tonsillitis,\n Jaundice, Respiratory infections, Congenital conditions.'
            },
            
        ]
        setcontents(data);
        setFilteredContents(data)
        nModules=data.length
        console.log(nModules,contents)
    }
    function handleOpenModule(item){
        console.log(item)
        navigate('/home/content',
        {
            state:{
                'title':item.title,
                'content':item.content
            }
        })

    }
    function handleSearch(e){
        const query=e.target.value.toLowerCase();
        setSearchQuery(query);
        const filterdModules=contents.filter((item)=>
            item.title.toLowerCase().includes(query)
        );
        setFilteredContents(filterdModules)
    }
    
    return(
        <div >
            <div className="w-full bg-white text-black fixed top-[4rem] h-[calc(100vh-7.5rem)] overflow-y-auto px-2 py-4">
                <div className="flex justify-center">
                    <div className=" relative flex  items-center text-gray-400 focus-within::text-gray-600">
                    <CiSearch onClick={SubmitEvent} className="w-5 h-5 absolute  ml-3 pointer-events-none" />
                    <input onChange={handleSearch} type='search' placeholder="search for content" className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300  focus:ring-gray-500 focus:ring-2 focus:outline-none"/>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-6">
                {filteredContents.map((item) => (
                    <div onClick={(e)=>{console.log(item);handleOpenModule(item)}} className="w-full rounded-xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 duration-300 transition-all ease-in">
                        <img src={introBaby} alt={item.title} className="rounded-none" />
                        <div className="w-full border-black border text-center rounded-lg py-1">{item.title}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>

    )
}
export default KnowledgeBase;