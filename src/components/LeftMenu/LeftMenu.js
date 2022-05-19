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
    logoutApi();
    setRefreshCheckLogin(true);
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
      <Link to="/musica">
        <FontAwesomeIcon icon={faMusic} /> Musica
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Salir
      </Link>

      <Button>
          Upload music
      </Button>
      <Button>
          Aleatorio
      </Button>
    </div>
  )
}