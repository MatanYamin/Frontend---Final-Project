//firebase component that allows adming to login
//code from firebase auth
import firebase from "firebase"

 
 var firebaseConfig = {
    apiKey: "AIzaSyA6NS7K0FUulq4da5YfaKr4vlnaOumy8OU",
    authDomain: "final-project---admin-login.firebaseapp.com",
    projectId: "final-project---admin-login",
    storageBucket: "final-project---admin-login.appspot.com",
    messagingSenderId: "644017654411",
    appId: "1:644017654411:web:c8ef1541cacc96f9f1a28e"
  };
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire