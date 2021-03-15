import React from 'react';
import {FacebookOutlined, InstagramOutlined} from '@ant-design/icons';
import Showlogo from "../images/showlogo.png";


function ShowFooter() {
    return (
        <div className="container-fluid">
            <div className="footer">
                <div className="logo">
                    <img src={Showlogo} alt="logo" className="imagenlogo"/>
                </div>
                <ul className="socials">
                    <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer noopener"><FacebookOutlined /> </a></li>
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer noopener"><InstagramOutlined /></a></li>
                </ul>
                <div className="copyright">Copyright &copy; 2021 2Show</div>

            </div>
        </div>
    );
}

export default ShowFooter;