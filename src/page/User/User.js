import React, {useState , useEffect} from 'react';
import {Button, Spinner} from "react-bootstrap";
import BasicLayout from '../../layout/BasicLayout'
import { withRouter } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";


import "./User.scss"

const VER_PERFIL = gql`
  query verPerfil($id: String!) {
    loginUser(id: $id) {
      nombre
      apellidos
      fechaNacimiento
      email
      avatar
      sitioWeb
    }
  }
`;

function User(props) {
  const {match} = props;
  const [user, setUser] =useState(null);
  //const [queryfunction, { data, loading, error }] = useQuery(VER_PERFIL);
  const variableid = match.params.id;
  //console.log(match.params.id)
  
  

  useEffect(() =>{
    //queryfunction({variables: {id: variableid}}).then(data => {
    //  console.log(data)
    //})
  }, [match.params.id]);

  return (
    <BasicLayout>
      <div className="user__title">
        <h2>Cristian</h2>
      </div>
      <div> Imagen </div>
      <div>InfoUser</div>
      <div className="user__songs">Lista Playlists</div>
    </BasicLayout>
  )
}

export default withRouter(User);