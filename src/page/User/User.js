import React, {useState , useEffect} from 'react';
import {Button, Spinner, Toast} from "react-bootstrap";
import BasicLayout from '../../layout/BasicLayout'
import { withRouter } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import { getUserApi } from "../../api/user";
import { ApolloLink } from '@apollo/client';
import { toast } from "react-toastify"
import Avatar from '../../components/User/Avatar';
import "./User.scss"
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokenApi } from "../../api/auth"

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const VER_PERFIL = gql`
  query verperfil($id: String!, $token: String!) {
    verperfil(id: $id, token: $token){
      nombre
      apellidos
      avatar
      sitioWeb
    }  
  }
`; 

function User(props) {
  const {match} = props;
  const [user, setUser] = useState(null);
  const {params} = match;
  const idd = params.id;
  const token = "Bearer"+getTokenApi()
  console.log(token)
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 1000));
    const  data  = useQuery(VER_PERFIL, {
      variables: { id: idd, token: token }
    });
    if(data.loading){
      return <div>Wait...</div>
    }
    if(data.error){
      toast.error("Error")
      return console.log(data);
    }
  
/*     const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    }); */

/*     const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    }); */
  
   

  /* useEffect(() =>{
     let variableid = params.id;
      

     console.log(params.id)
     getUserApi(params.id).then(response => {
       if (!response) toast.error("El usuario no existe")
       setUser(response);
     }).catch(()=>{
       toast.error("El usuario no existe");
     })
    
   }, [params]); */

  return (
    <BasicLayout>
      <div className="user__title">
        <h2>
          
          {data.data.verperfil ? `${data.data.verperfil.nombre} ${data.data.verperfil.apellidos} ${toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Usuario cargando',
          success: 'Usuario cargado 👌',
          error: 'Usuario no existe 🤯'
        }
        )}` :  "Este usuario no existe" }
        </h2>
      </div>
      {/* <Avatar user={[data.data.verperfil, params.id]}/> */}
      <div>InfoUser</div>
      <div className="user__songs">Lista Playlists</div>
    </BasicLayout>
  )
}

export default withRouter(User);