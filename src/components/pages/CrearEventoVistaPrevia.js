import React from 'react'
import "../../index.css"
import {Row, Col, Image, Button, Upload, message, Mentions} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function CrearEventoVistaPrevia(props) {
    const state = {
        loading: false,
    };
    const style = {display: "inline-block"};
    const { loading, imageUrl } = state;
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    return (
        <div align="middle">
            <div>
                <h1>
                    {" "}
                    Widinson
                </h1>

                    <Image
                        src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg"
                        width={250}
                        height={250}
                        preview={false}
                    />

                <h2>
                    {" "}
                    Vista Previa
                </h2>
            </div>

            <Row>
                <Col span={8} style={style}>
                    <Row>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Row>
                    <Row>
                        <Button type="primary">
                            Cancelar
                        </Button>
                    </Row>
                </Col>
                <Col span={8} style={style}>
                    <Row>
                        <h3>Coca Cola Zero</h3>
                    </Row>
                    <Row>
                        <Mentions rows={3} disable>
                            Cero calorías tomala sin cargo de conciencia.
                        </Mentions>
                    </Row>
                    <Row>
                        <h3>Alcance: 2000 personas</h3>
                        <h3>Costo: 20 USD</h3>
                    </Row>
                    <Row>
                        <Button type="primary" danger>
                            Publicar
                        </Button>
                    </Row>
                </Col>
                <Col span={8} style={style}>
                    <Row>
                        <iframe width="420" height="245" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
                    </Row>
                    <Row>
                        <h3>Video Promocional</h3>
                    </Row>
                    <Row>
                        <Button type="primary">
                            Editar
                        </Button>
                    </Row>
                </Col>
            </Row>
            </div>
    )
}