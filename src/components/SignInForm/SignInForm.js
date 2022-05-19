import React, {useState} from 'react'
import {Form, Button, Spinner} from "react-bootstrap";
import { values,size, rest } from 'lodash';
import { toast } from 'react-toastify';
import {isEmailValid} from "../../utils/validation";
import { useMutation, gql } from "@apollo/client";
import { setTokenApi, getTokenApi} from "../../api/auth" 

import "./SignInForm.scss";

const LOGIN_USER = gql`
  mutation loginUser($usuario: UserLogin!) {
    loginUser(usuario: $usuario) {
      token
    }
  }
`;

export default function SignInForm(props) {
    const {setRefreshCheckLogin}= props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoading] = useState(false);
    const [mutateFunction, { data, loading, error }] = useMutation(LOGIN_USER);
 
    const onSubmit = e => {
      e.preventDefault();

      let validCount =0;
      values(formData).some((value) =>{
        value && validCount++;
        return null;
      });

      if(size(formData) !== validCount) {
        toast.warning("Completa los campos");
      }else{
        if(!isEmailValid(formData.email)) {
          toast.warning("Email es invalido");
        } else {
          setSignInLoading(loading);
          mutateFunction({variables: {usuario:{email:formData.email, password:formData.password}}})
          .then(data =>{
            setTokenApi(data.data.loginUser.token);
            setRefreshCheckLogin(true);
            toast.success("Sesion iniciada")
          })
        }
      }
    }
  
  
  const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="sign-in-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Group>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo electronico"
                defaultValue={formData.email} />
          </Form.Group>
          <Form.Group>
          <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña" 
                defaultValue={formData.password} /> 
          </Form.Group>
          <Button variant="primary" type="submit" >
              {!signInLoading ? "Iniciar sesion" : <Spinner animation="border" />}
          </Button>

      </Form>
    </div>
  );
}

function initialFormValue() {
    return {
        email: "",
        password: ""
    }
}