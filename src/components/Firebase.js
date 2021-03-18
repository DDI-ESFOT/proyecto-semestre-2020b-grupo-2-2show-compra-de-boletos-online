import app from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPI_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
app.initializeApp(firebaseConfig);
app.analytics();


const db = app.firestore();
//tener todos los metodos para hacer la autenticacion de los usuarios
const auth = app.auth();
const storage = app.storage();

export {db, auth, storage}