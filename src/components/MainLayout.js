import React from 'react';
import {Layout} from "antd";
import MainMenu from "./MainMenu";
import ShowFooter from "./Footer";

const { Header, Content, Footer } = Layout;

const MainLayout =({children}) => {
    return(
        <Layout className="layout">
            <Header>
                <MainMenu/>
            </Header>
            <Content>
                <div className="site-layout-content">{children}</div>
            </Content>
            <Footer>
                <ShowFooter/>
            </Footer>
        </Layout>
    );
}
export default MainLayout;