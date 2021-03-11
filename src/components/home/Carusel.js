import React from 'react';
import { Button } from 'antd';
import { Carousel } from 'antd';
import {DesktopOutlined } from '@ant-design/icons';

const items = [
    {
        key: '1',
        title: 'Lo mejor de lo mejor',
        content: 'La Toquilla en vivo el mejor conciento del año.',
    },
    {
        key: '2',
        title: 'Lo mas buscado',
        content: 'An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.',
    },
    {
        key: '3',
        title: 'La Toquilla en vivo',
        content: 'An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.',
    },
]

function ShowCarusel() {
    return (
        <div id="home" className="heroBlock">
            <Carousel autoplay>
                {items.map(item => {
                    return (
                        <div key={item.key} className="container-fluid">
                            <div className="content">
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                                <div className="btnHolder">
                                    <Button size="large"><DesktopOutlined /> Ver Eventos</Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default ShowCarusel;