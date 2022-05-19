import React, {useState} from 'react';
import { Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import { toast } from 'react-toastify';
import {isEmailValid} from "../../utils/validation"
import { useMutation, gql } from "@apollo/client";

import "./SignUpForm.scss";

const REGISTER_USER = gql`
  mutation registerUser($usuario: UserRegister!) {
    createUser(usuario: $usuario) {
      nombre
      apellidos
      email
    }
  }
`;

export default function SignUpForm(props) {
    const { setShowModal }= props;
    const [formData,setFormData] = useState(initialFormValue())
    const [signUpLoading, setsignUpLoading] = useState(false)
    const imageSource = require('../../assets/jpeg/headphonescrop.png');
    const [mutateFunction, { data, loading, error }] = useMutation(REGISTER_USER);





    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);

        let validCount=0;

        values(formData).some(value => {
            value && validCount++;
            return null;
        })

        if(validCount !== size(formData)) {
            toast.warning("Completa todos los campos del formulario");
        } else {
            if(!isEmailValid(formData.email)){
                toast.warning("Email invalido")
            } else if(formData.password!==formData.repeatPassword){
                toast.warning("Las contraseñas deben ser iguales")
            } else if(size(formData.password) < 6 ){
                toast.warning("Las contraseñas deben ser iguales")
            } else{
                setsignUpLoading(loading);
                mutateFunction({variables: {usuario:{nombre:formData.nombre, apellidos:formData.apellidos, email:formData.email, password:formData.password}}});
                toast.success("Formulario hecho")
                setShowModal(false);
                setFormData(initialFormValue());
            }
        }
    };

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

  return (
    <div className='sign-up-form'>
        <h2>Crea tu cuenta</h2>
        <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control 
                        type="text" 
                        placeholder='Nombre'
                        name='nombre'
                        defaultValue={formData.nombre}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                        type="text"
                        placeholder='Apellidos'
                        name='apellidos'
                        defaultValue={formData.apellidos}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="email" 
                placeholder='Correo electronico' 
                name='email'
                defaultValue={formData.email}
                />
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control 
                        type="password" 
                        placeholder='Contraseña' 
                        name='password'
                        defaultValue={formData.password}
                        />
                    </Col>
                    <Col>
                        <Form.Control 
                        type="password" 
                        placeholder='Repetir Contraseña' 
                        name='repeatPassword'
                        defaultValue={formData.repeatPassword}
                        />
                    </Col>
                </Row>
                
            </Form.Group>
        <Button variant="primary" type="submit">
            {!signUpLoading ? "Registrese" : <Spinner animation="border" />}
            
        </Button>
        </Form>
    </div>
  )
}

function initialFormValue(){
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}