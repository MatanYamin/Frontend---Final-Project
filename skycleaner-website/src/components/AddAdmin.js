import React from 'react';


export default function AddAdmin(props) {
    // When admin is added, the Email and password will add to the Firebase with "setEmail" and "setPassword"
    return(
        <div>
         <section className="login">
            <div className="loginContainer">
                <h1>
                <label>הוסף מנהל חדש</label></h1>
                <label>שם משתמש</label>
                <input type="text"
                 autoFocus required
                 value={props.email}
                 onChange={(e) => props.setEmail(e.target.value)}
                 />
                 <label>סיסמה</label>
                 <input type="password"
                 required
                 value={props.password}
                 onChange={(e) => props.setPassword(e.target.value)}
                />
                 <div className="btnContainer">
                     <button className="step-btn" onClick={props.handleSingup}>הוספת מנהל</button>
                 </div>
            </div>
        </section>
         </div>
    );
}