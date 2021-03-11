import React from 'react';
import '../Styles/App.css';
import 'antd/dist/antd.css';

import ShowHeader from './Header';
import ShowFooter from './Footer';
import { Layout } from 'antd';
import ShowHome from "../pages/home";
const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Layout className="mainLayout">
            <Header>
                <ShowHeader/>
            </Header>
            <Content>
                <ShowHome/>
            </Content>
            <Footer>
                <ShowFooter/>
            </Footer>
        </Layout>
    );
}

export default App;
