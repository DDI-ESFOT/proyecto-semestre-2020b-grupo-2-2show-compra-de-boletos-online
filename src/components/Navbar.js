import React from 'react';
import {FacebookOutlined,InstagramOutlined} from '@ant-design/icons';
import { Layout} from 'antd';
import Header from "./Header";
import Home from '../components/Home';
import '../Styles/Navbar.css';


const {Content, Footer } = Layout;

function Navbar(props) {
    return(
        <>
            <div>

            </div>
            <Layout className="layout">
                <Header></Header>
                <Content style={{ margin: '10px 0'}}>

                    <div className="site-layout-content">
                        Content
                        <Home></Home>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>2Show <FacebookOutlined /> <InstagramOutlined /></Footer>

            </Layout>

        </>
    );
}
export default Navbar;