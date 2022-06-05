import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Login from './pages/auths/Login';
import Signup from './pages/auths/Signup';
import Authspage from './pages/auths/Authspage';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Homepage' />
          <Route path='/authspage' element={<Authspage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Authspage' />
          <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Login' />
          <Route path='/signup' element={<Signup />} className='Signup' />
          <Route path='/profile' element={<Profile /> } className='Profile' />
        </Routes>
      
      </div>
    </ApolloProvider>
    
      
  )
}

export default App;
