import React from "react";

import { withRouter } from 'react-router-dom';
import {auth, db} from '../components/Firebase'

import {Form, Input, Button, Checkbox, Radio, Space, DatePicker} from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};







function IngregarPage(props){

    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('initialState');
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(false)
    const [nombre, setNombre] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [ciudad, setCiudad] = React.useState('');
    const [pais, setPais] = React.useState('');
    const [cuenta, setCuenta] = React.useState('')
    const [value, setValue] = React.useState();

    const onChangeRadio = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    function onChange(date, dateString) {
        console.log(date, dateString);
    };

    //funcion para hacer login
    const login = React.useCallback(async()=>{
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('');
            setPass('');
            setError(null);
            //esta funcion me lleva al perfil personal del usuario
            props.history.push('/myprofile');

        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('email incorrecto!')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Usuario no encontrado!')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta!')
            }

        }
    },[email,pass, props.history]) //necesito poner los estados que voy a ocupar en el callback
//no olvidar poner el props.history

    //usamos un callback
    //para llamar a la funcion para crear usuario en firebase
    const registrar = React.useCallback(async ()=>{
        try {
            const res = await auth.createUserWithEmailAndPassword(email,pass)
            console.log(res)
            console.log('Pasó todas las validaciones!')
            //crea una coleccion nueva dentro de Usuarios
            await db.collection('Usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid,

            })
            await db.collection('infoUser').doc(res.user.email).set({
                nombre: nombre,
                apellido: apellido,
                ciudad: ciudad,
                pais: pais,
                cuenta: cuenta,
                uid: res.user.uid,
                foto: 'https://pixabay.com/images/id-973460/',
                email: res.user.email,
                categoria: '',
                numFollowers: 0,
                banner: 'https://image.freepik.com/foto-gratis/hipster-boy-tocando-guitarra-su-novia-encima-estilo-retro_8595-5221.jpg',
                cumple: ''



            })

            //resetea los estados
            setEmail('');
            setPass('');
            setError(null);
            //esta funcion me lleva al perfil personal del usuario
            props.history.push('/myprofile');

        } catch (error) {
            if(error.code === 'auth/invalid-email'){
                setError('email no válido!')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('El email ya está registrado')

            }

        }

    },[email,pass, props.history, nombre,apellido, ciudad, pais, cuenta]) //necesito poner los estados que voy a ocupar en el callback
    //no olvidar poner el props.history

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            console.log('Ingrese Email')
            setError('Ingrese Email')
            return
        }
        if(!pass.trim()){
            console.log('Ingrese Contraseña')
            setError('Ingrese Contraseña')
            return
        }
        if(pass.length < 6){
            console.log('Password mayor a 6 caracteres')
            setError('Password mayor a 6 caracteres')
            return
        }
        setError(null);

        //aqui vamos a registrar al nuevo usuario en firebase
        if(esRegistro){
            registrar()

        } else {
            login()
        }


    }




    return(
        <div className="container-fluid">
            <h1>Disfruta 2Show</h1>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onSubmit={procesarDatos}
            >
                {
                    error && (
                        <div className="alert alert-danger mb-2">
                            {error}
                        </div>
                    )
                }
                <Form.Item
                    label="Usuario"
                    name="user" rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
                >
                    <Input onChange={e => setEmail(e.target.value)} value={email} />
                </Form.Item>

                <Form.Item
                    label="Cotraseña"
                    name="password"
                    rules={[{ required: true, message: 'Ingresa tu contraseña!' }]}
                >
                    <Input.Password onChange ={e => setPass(e.target.value)} value={pass}/>
                </Form.Item>

                <Form.Item {...tailLayout} name="REcuerdame" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {
                    esRegistro ?(
                        <div>
                            <Form.Item label="Nombre">
                                <Input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Escriba su Nombre"
                                    onChange ={e => setNombre(e.target.value)}
                                    value={nombre}
                                />
                            </Form.Item>
                            <Form.Item label="Apellido">
                                <Input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Escriba su Apellido"
                                    onChange ={e => setApellido(e.target.value)}
                                    value={apellido}
                                />
                            </Form.Item>
                            <Form.Item label="Ciudad">
                                <Input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Ciudad de Residencia"
                                    onChange ={e => setCiudad(e.target.value)}
                                    value={ciudad}
                                />
                            </Form.Item>
                            <Form.Item label="País">
                                <Input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Pais de Origen"
                                    onChange ={e => setPais(e.target.value)}
                                    value={pais}
                                />
                            </Form.Item>
                            <h3>Tipo de Cuenta</h3>
                            <Form>
                                <Radio.Group onChange={onChangeRadio} value={value}>
                                    <Radio id='artista'  value={1}
                                           onChange ={e =>
                                           {
                                               setCuenta('ART')
                                               console.log('ART')
                                           }
                                           }
                                    >Artista
                                    </Radio>

                                    <Radio id='usuario'  value={2}
                                           onChange ={e =>
                                           {
                                               setCuenta('USR')
                                               console.log('USR')
                                           }
                                           }

                                    >Usuario
                                    </Radio>
                                </Radio.Group>
                                <h3>Escriba la fecha de su nacimiento</h3>
                                <Space direction="vertical">
                                    <DatePicker onChange={onChange} type='date' />

                                </Space>
                            </Form>
                        </div>

                    ):null
                }

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        {esRegistro ? 'Registrar Usuario' : 'Ingresar'}
                    </Button>
                    <Button htmlType="button" onClick={()=> setEsRegistro(!esRegistro)}>
                        {esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default withRouter(IngregarPage);