import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Login from './components/auths/Login';
import Signup from './components/auths/Signup';
import Authspage from './components/auths/Authspage';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={<Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Homepage' />
          <Route path='/authspage' element={<Authspage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Authspage' />
          <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Login' />
          <Route path='/signup' element={<Signup />} className='Signup' />
          <Route path='/profile' element={<Profile /> } className='Profile' />
        </Routes>
      
    </div>
      
  )
}

export default App;
