import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import KnowledgeBase from './components/Home_page_molecules/KnowledgeBase';
import Content from './components/Home_page_molecules/Content';

const URL = 'http://127.0.0.1:8000/';
function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  
  
  function checkLoginStatus(){
    const isLoggedIn=localStorage.getItem('isLoggedIn');
    return isLoggedIn==='true';
  }

  useEffect(()=>{
    const isLoggedIn=checkLoginStatus();
    setLoggedIn(isLoggedIn);
  },[]);

  function handleLogin(){
    setLoggedIn(true)
  }

  return (
      <Router>
        <Routes>
          <Route path="/signin" element={<Login isLogin={handleLogin} URL={URL} />} />
          <Route path="/signup" element={<Signup isLogin={handleLogin} URL={URL} />} />
          <Route path="/" element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/content' element={<Content/>} />
          <Route
            path="/chat"
            element={
              localStorage.getItem('access_token') ? (
                <Chat URL={URL} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Router>
  );
}

export default App;

