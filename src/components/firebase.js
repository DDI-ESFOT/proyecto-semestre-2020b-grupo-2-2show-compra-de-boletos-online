import app from 'firebase/app';
import 'firebase/firestore';
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

  export {db,auth}