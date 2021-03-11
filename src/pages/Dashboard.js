import React from 'react';
import '../Styles/dashboard.css';
import 'antd/dist/antd.css';
import { Col, Row} from 'antd';
import Navbar from "../components/Navbar";
import Home from '../components/Home';

function Dashboard(props){
    return(
       <>
         <Row>
             <Col xs = {24}>
                 <Navbar></Navbar>
             </Col>
         </Row>

       </>


    );

}
export default Dashboard;