import React from "react";
import { useEffect, useState } from "react";

import image1 from "../images/imagenA.jpg";
import image2 from "../images/imagenB.jpg";
import image3 from "../images/imagenC.jpg";
import image4 from "../images/imagenD.jpg";
import image5 from "../images/imagenE.jpg";
import image6 from "../images/imagenF.jpg";

import { Row, Col, Button } from "antd";
import { Card } from "antd";
const { Meta } = Card;

function ShowEvents() {
  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Escoge tu evento favorito</h2>
          <p>La mejor música con los mejores artistas en vivo desde tu casa!</p>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image1} />}>
              <Meta title="Easy to customise" />
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <Button type="primary" htmlType="submit">
                Comprar evento
              </Button>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image2} />}>
              <Meta title="Easy to customise" />
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <Button type="primary" htmlType="submit">
                Comprar evento
              </Button>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image3} />}>
              <Meta title="Easy to customise" />
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <Button type="primary" htmlType="submit">
                Comprar evento
              </Button>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image4} />}>
              <Meta title="Easy to customise" />
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <Button type="primary" htmlType="submit">
                Comprar evento
              </Button>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image5} />}>
              <Meta title="Unlimited Features" />
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <Button type="primary" htmlType="submit">
                Comprar evento
              </Button>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image6} />}>
              <Meta title="Advanced Options" />
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <Button type="primary" htmlType="submit">
                Comprar evento
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default ShowEvents;
