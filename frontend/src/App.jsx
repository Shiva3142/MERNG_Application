import React, { createContext, useReducer } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import jwtdecode from 'jwt-decode'
import Home from './Components/Home/HomePage'
import AccountPage from './Components/Account/AccountPage.jsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import Login from './Components/Signup/Login';
import Register from './Components/Signup/Register';
import Post from './Components/Post/PostPage';

import { setContext } from "@apollo/client/link/context";

const setAuthorizationLink = setContext(() => {
  let token = localStorage.getItem('token')
  return ({
    headers: {
      authorization: token ? token : ""
    }
  })
})

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link:setAuthorizationLink.concat(httpLink),
  cache: new InMemoryCache(),
});

let initialState = {
  user: false,
  username: "",
  email:"",
  logout: (dispatch) => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem('token')
  }
}

if (localStorage.getItem('token')) {
  const decodedtoken = jwtdecode(localStorage.getItem('token'))
  if (decodedtoken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
  } else {
    initialState.user = true
    initialState.username = decodedtoken.name
    initialState.email = decodedtoken.email
  }
}

let userContext = createContext()

function reducer(state, action) {
  if (action.type === "LOGIN") {
    return ({
      ...state,
      user: true,
      username: action.username,
      email:action.email
    })
  }
  else if (action.type === "LOGOUT") {
    return ({
      ...state,
      user: false,
      username: "",
      email:""
    })
  }
  return state
}


function App() {
  let [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <ApolloProvider client={client}>
        <userContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/post/:post_id" element={<Post />}></Route>
            <Route exact path="/account" element={<AccountPage/>}></Route>
            <Route path="*" element={<Home/>}>
            </Route>
          </Routes>
        </userContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
export { userContext }