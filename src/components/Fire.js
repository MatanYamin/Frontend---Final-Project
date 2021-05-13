//firebase component that allows adming to login
//code from firebase auth
import firebase from "firebase"
import FireBaseConf from "../FireBaseConf"

 
 var firebaseConfig = FireBaseConf;
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire