import React, {useState} from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers, faComment} from "@fortawesome/free-solid-svg-icons";

import BasicModal from '../../components/Modal/BasicModal';
import SignUpForm from '../../components/SignUpForm';
import SignInForm from '../../components/SignInForm';
import headphonescrop from '../../assets/jpeg/headphonescrop.png';
import redheadfin from '../../assets/jpeg/redheadfin.png';
import "./SignInSignUp.scss";

export default function SignInSignUp(props) {
    const { setRefreshCheckLogin} = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState (null);
    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    };

    return (
    <>
        <Container className='signin-signup' fluid>
            <Row>
                <LeftComponent />
                <RightComponent 
                openModal={openModal} 
                setShowModal={setShowModal}
                setRefreshCheckLogin={setRefreshCheckLogin}
                />
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
            {contentModal}
        </BasicModal>
    </>
  )
}

function LeftComponent() {
    return (
        <Col className='signin-signup__left' xs={6}>
            <img src={headphonescrop} alt='Sounds' />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    Sigue tu musica.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers} />
                    Escucha los ultimos hits.
                </h2>
                <h2>
                <FontAwesomeIcon icon={faComment} />
                    Unete a la comunidad Sounds.</h2>
            </div>
        </Col>
    );
}    
function RightComponent(props) {
    const {openModal,setShowModal, setRefreshCheckLogin}= props;
    return (
        <Col    className='signin-signup__right' xs={6}>
            <div>
                <img src={redheadfin} alt="Sounds" />
                <h2>Escucha lo que esta sonando en el mundo en este momento</h2>
                <h3>Unete a Sounds hoy mismo</h3>
                <Button
                    variant='primary'
                    onClick={()=> openModal(<SignUpForm setShowModal={setShowModal} />)}>
                        Registrate
                </Button>
                <Button 
                variant='outline-primary'
                onClick={()=> openModal(
                <SignInForm setRefreshCheckLogin={setRefreshCheckLogin}/>
                )}>
                Iniciar Sesión
                </Button>
            </div>
        </Col>
    );    
}