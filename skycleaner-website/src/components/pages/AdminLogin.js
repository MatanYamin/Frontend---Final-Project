import React from 'react';
import "../../App.css"
import { useEffect, useState } from "react";
import fire from '../../components/Fire';
//Admin login page


const AdminLogin = () => {
    const {user, setUser} = useState('');
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {emailError, setEmailError} = useState('');
    const {passwordError, setPasswordError} = useState('');
    const {hasAccount, setHasAccount} = useState(false);

    const clearInput = () => {
        setEmail('');
        setPassword('');
    }

    const ClearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    //handleLogin will handle the login part with email, password and user
    // with help of fire component from firebase
    const handleLogin = () => {
        fire.auth()
        .signInWithEmailAndPassword(email, password)  //built in function from firebase
        .catch(err => {  //swithcase for the error messages
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.messsage);  //Error message for wring email/user name
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message); //Error for wrong password
                    break;
            }
        })
    }

    const handleLogout = () => {  //only for logout
        fire.auth().signOut();
    }

    //listener helps us to know where we at and if user is logged in or out (when we call setUser, then it will be blank)
    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user){
                setUser(user);
            }
            else{
                setUser("");
            }
        })
    }

    //handle singUp will handle the singup part. 
    const handleSignup = () => {
        fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.messsage);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message); 
                    break;
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])


    return(
        <div>
        <h1 className="admin"> התחבר
         </h1>
         </div>
    );
}

export default AdminLogin