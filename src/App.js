import React, { useState } from "react";
import SignInSignUp from "./page/SignInSignUp";
import { ToastContainer } from "react-toastify"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import "./index.scss"
import "./components/Modal/BasicModal/BasicModal.scss"
import "./components/SignUpForm/SignUpForm.scss"

export default function App() {
  const [user, setUser] = useState({name: "Cristian"});
  
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache()
  });

  
  return (
  <ApolloProvider client={client} >
    <div>{user ? (
    <div>
      <SignInSignUp/>
    </div>
  ) : <h1>No lo estas</h1>}
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
  </div>
  </ApolloProvider>

  );
    
}


