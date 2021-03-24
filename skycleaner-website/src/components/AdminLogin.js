import React from 'react';
import "../App.css"
import { useEffect, useState } from "react";
import fire from './Fire';
import AdminLoginPage from "./pages/AdminLoginPage"
import Admin from "./pages/Admin"
//Admin login page


const AdminLogin = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const clearInput = () => {
        //when using cleaInput - setEmail and password will be empty
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        //when using cleaErrors - setEmailError and password will be empty
        setEmailError('');
        setPasswordError('');
    }

    //handleLogin will handle the login part with email, password and user
    // with help of fire component from firebase
    const handleLogin = () => {
        clearErrors()
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
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                clearInput();//every time we loggen in or out we need to clear input
                setUser(user);
            }
            else{
                setUser("");
            }
        })
    }
    //handle singUp will handle the singup part. 
    const handleSingup = () => {
        clearErrors()
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
        {user? (  //if user is True -> means we are logged in. else-> go to admin login page
            <Admin 
        handleLogout={handleLogout}
        handleSingup={handleSingup}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        emailError={emailError}
        passwordError={passwordError}
        />) : ( //else
        <AdminLoginPage
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSingup={handleSingup}
        emailError={emailError}
        passwordError={passwordError}
        />
        )}
         </div>
    );
}

export default AdminLogin