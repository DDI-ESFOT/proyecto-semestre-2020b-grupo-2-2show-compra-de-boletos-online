import React, {useState} from 'react';

import {Anchor, Button, Col, Drawer,Row} from 'antd';
import {MenuUnfoldOutlined} from '@ant-design/icons';
import Showlogo from "../images/showlogo-blanco.png";
import {NavLink} from "react-router-dom";
import Routes from "../constants/routes";
import { auth } from "../components/firebase";
import { withRouter } from "react-router";



function MainMenu(props) {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const cerrarSesion = () => {
        auth.signOut().then(() => {
            props.history.push("/ingresar");
        });
    };

    return (
        <div className="container-fluid">
            <div className="header">
                <div className="logo">
                    <NavLink to={Routes.HOME}><img src={Showlogo} alt="logo" className="imagenlogo" /> </NavLink>
                </div>
                <div className="mobileHidden">
                    <Anchor targetOffset="65">
                        <NavLink to={Routes.HOME}>Home</NavLink>
                        <NavLink to={Routes.ABOUT}>Nosotros</NavLink>
                        <NavLink to={Routes.EVENT}>Eventos</NavLink>
                        <NavLink to={Routes.CONTACT} >Contactos</NavLink>
                        <NavLink to={Routes.OTHERS} >Otros</NavLink>
                        {props.firebaseUser !== null ? (
                            <NavLink to={Routes.MYPROFILE} >Mi Perfil</NavLink>
                        ):null}
                        {props.firebaseUser !== null ? (
                            <NavLink onClick={() => cerrarSesion()}>Log Out</NavLink>
                        ):(
                            <NavLink to={Routes.LOGIN}>Ingresar</NavLink>
                        )}
                        <NavLink to={Routes.CREATEEVENTS} >Crear Evento</NavLink>
                    </Anchor>

                </div>
                <div className="mobileVisible">
                    <Button type="primary" onClick={showDrawer}>
                        <MenuUnfoldOutlined />
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Anchor targetOffset="65">
                            <NavLink to={Routes.HOME}>Home</NavLink>
                            <NavLink to={Routes.ABOUT}>Nosotros</NavLink>
                            <NavLink to={Routes.EVENT}>Eventos</NavLink>
                            <NavLink to={Routes.CONTACT} >Contactos</NavLink>
                            <NavLink to={Routes.OTHERS} >Otros</NavLink>
                            {props.firebaseUser !== null ? (
                                <NavLink to={Routes.MYPROFILE} >Mi Perfil</NavLink>
                            ):null}
                            {props.firebaseUser !== null ? (
                                <NavLink onClick={() => cerrarSesion()}>Log Out</NavLink>
                            ):(
                                <NavLink to={Routes.LOGIN}>Ingresar</NavLink>
                            )}
                            <NavLink to={Routes.CREATEEVENTS} >Crear Evento</NavLink>
                        </Anchor>
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

export default withRouter(MainMenu);