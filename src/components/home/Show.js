import React from 'react';
import {PlayCircleOutlined, ShoppingCartOutlined, TeamOutlined} from '@ant-design/icons';

import {Col, Row} from 'antd';

const items = [
    {
        key: '1',
        icon: <PlayCircleOutlined/>,
        title: 'Shows en Vivo',
        content: 'cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.',
    },
    {
        key: '2',
        icon: <TeamOutlined />,
        title: 'Conoce a tus artistas preferidos',
        content: 'cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.',
    },
    {
        key: '3',
        icon: <ShoppingCartOutlined/>,
        title: 'Compra y regala entradas para eventos en vivo',
        content: 'cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.',
    },
]

function Show() {
    return (
        <div id="show" className="block aboutBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>Lo que 2Show tiene para ti</h2>
                    <p>dolor sit amet, consectetur adipisicing elit</p>
                </div>
                <div className="contentHolder">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit necessitatibus officiis repudiandae est deserunt delectus dolorem iure porro distinctio fuga, nostrum doloremque. Facilis porro in laborum dolor amet ratione hic? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aut a porro, adipisci quidem sint enim pariatur ducimus, saepe voluptatibus inventore commodi! Quis, explicabo molestias libero tenetur temporibus perspiciatis deserunt.</p>
                </div>
                <Row gutter={[16, 16]}>
                    {items.map(item => {
                        return (
                            <Col md={{ span: 8 }} key={item.key}>
                                <div className="content">
                                    <div className="icon">
                                        {item.icon}
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.content}</p>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}

export default Show;