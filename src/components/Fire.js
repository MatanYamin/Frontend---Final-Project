//firebase component that allows adming to login
//code from firebase auth
import firebase from "firebase"
import firebaseconfig from "../FireBaseConfig"

 
 var firebaseConfig = firebaseconfig;
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire