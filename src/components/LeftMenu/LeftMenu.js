import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faUsers, faPowerOff, faMusic } from "@fortawesome/free-solid-svg-icons";
import headphoneswhite from "../../assets/jpeg/headphoneswhite.png"
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth"

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const {setRefreshCheckLogin}= props;
  const user = useAuth();

  const logout = () => {
    setRefreshCheckLogin(true);
    logoutApi();
  }

  return (
    <div className="left-menu">
      <img className="logo" src={headphoneswhite} alt="Sounds" />
      <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Inicio    
        </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="/Music">
        <FontAwesomeIcon icon={faMusic} /> Musica
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Salir
      </Link>

      <Button className="upload">
          Upload music
      </Button>
      <Link to="/PlayMusic">
        <Button className="aleatorio">
            Aleatorio
        </Button>
          
      </Link>
    </div>
  )
}