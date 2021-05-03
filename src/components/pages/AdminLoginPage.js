import React from "react"
import "./Login.css"
import "./AdminComponent.css"


const AdminLoginPage = (props) => {
    //all the props we brought from AdminLogin
    const {email, setEmail, password, setPassword, handleLogin, emailError, passwordError} = props;
    return(
        <>
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
                     <button className="button-form" onClick={handleLogin}>התחבר</button>
                 </div>
            </div>
        </section>
        </>
    )
}

export default AdminLoginPage