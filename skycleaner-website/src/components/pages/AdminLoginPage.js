import React from "react"
import "./Login.css"
import Admin from "./Admin"


const AdminLoginPage = (props) => {
    //all the props we brought from AdminLogin
    const {email, setEmail, password, setPassword, handleLogin, handleSingup, hasAccount, setHasAccount, emailError, passwordError} = props;
    return(
        <>
        {console.log(setEmail)}
        <section className="login">
            <div className="loginContainer">
                <label>שם משתמש</label>
                <input type="text"
                 autoFocus
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
                 <p className="errorMsg">{emailError}</p>
                 <label>סיסמה</label>
                 <input type="password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                />
                 <p className="errorMsg">{passwordError}</p>
                 <div className="btnContainer">
                     <button onClick={handleLogin}>התחבר</button>
                     {/* {hasAccount ? (
                         <>
                        <p>הוסף מנהל חדש</p>
                        </>
                     )
                     : (
                         <>
                        <button onClick={handleSingup}>הרשמה</button>
                        <p></p>
                        </>
                     )} */}
                 </div>
            </div>
        </section>
        </>
    )
}

export default AdminLoginPage