import React, { useState, useEffect } from "react";
import SignInSignUp from "./page/SignInSignUp";
import { ToastContainer } from "react-toastify"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AuthContext } from "./utils/context";
import { isUserLoguedApi } from "./api/auth"
import Routing from "./routes/Routing"

import "./index.scss"
import "./components/Modal/BasicModal/BasicModal.scss"
import "./components/SignUpForm/SignUpForm.scss"

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLoguedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin])

  if (!loadUser) return null;
  
  const  client= new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache()
  });

  
  return (
    <AuthContext.Provider value={user}>
    <ApolloProvider client={client} >   
    {user ? (
    <Routing setRefreshCheckLogin={setRefreshCheckLogin}/>
    ) : (
    <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} />
    )}
  <ToastContainer 
  position="top-right"
  autoClose={5000}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnVisibilityChange
  draggable
  pauseOnHover
  />
  </ApolloProvider>
  </ AuthContext.Provider>
  );
    
}


