import React, { useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import './App.css';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Authspage from './components/auths/Authspage';


const httpLink = createHttpLink({
  uri: '/graphql'
})


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ApolloClient client={client}>
      <Router>
        <div className='App'>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/homepage"
              element={<Homepage />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloClient>

    //   <Routes>
    //   <Route path='/' element={<Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Homepage' />
    //   <Route path='/authspage' element={<Authspage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Authspage' />
    //   <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} className='Login' />
    //   <Route path='/signup' element={<Signup />} className='Signup' />
    //   <Route path='/profile' element={<Profile /> } className='Profile' />
    // </Routes>
  )
}

export default App;
