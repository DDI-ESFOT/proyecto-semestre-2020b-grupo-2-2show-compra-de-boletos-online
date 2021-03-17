import app from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';


  const firebaseConfig = {
    apiKey: "AIzaSyAhIKJvr6pzCvVAeceaLlP-euRHJjYb3SI",
    authDomain: "show-5b0a0.firebaseapp.com",
    databaseURL: "https://show-5b0a0-default-rtdb.firebaseio.com",
    projectId: "show-5b0a0",
    storageBucket: "show-5b0a0.appspot.com",
    messagingSenderId: "327752753770",
    appId: "1:327752753770:web:27013842e06b9ed2842013",
    measurementId: "G-ZTPEPN8K6V"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);
  app.analytics();

  
  const db = app.firestore();
  //tener todos los metodos para hacer la autenticacion de los usuarios
  const auth = app.auth();
  //esto es para usar el almacenamiento de la aplicación
  const storage = app.storage();
  

  export {db,auth, storage}


  




   

