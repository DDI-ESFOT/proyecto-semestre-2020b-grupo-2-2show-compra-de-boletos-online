import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';
import Showlogo from "../images/showlogo-blanco.png";

const { Link } = Anchor;

function ShowHeader() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div className="container-fluid">
            <div className="header">
                <div className="logo">
                    <a href="http://google.com"><img src={Showlogo} alt="logo" className="imagenlogo"/> </a>
                </div>
                <div className="mobileHidden">
                    <Anchor targetOffset="65">
                        <Link href="#home" title="Home" />
                        <Link href="#about" title="Nosotros" />
                        <Link href="#event" title="Eventos" />
                        <Link href="#singin" title="Ingresar" />
                        <Link href="#callus" title="Contactos" />
                    </Anchor>
                </div>
                <div className="mobileVisible">
                    <Button type="primary" onClick={showDrawer}>
                        <i className="fas fa-bars"></i>
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Anchor targetOffset="65">
                            <Link href="#home" title="Home" />
                            <Link href="#about" title="Nosotros" />
                            <Link href="#event" title="Eventos" />
                            <Link href="#singin" title="Ingresar" />
                            <Link href="#callus" title="Contactos" />
                        </Anchor>
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

export default ShowHeader;