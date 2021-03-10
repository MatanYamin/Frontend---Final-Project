import React from 'react';
//adding admin component
//will add admin and add it to firebase database


export default function AddAdmin(props) {
    return(
        <div>
         <section className="login">
            <div className="loginContainer">
                <h1>הוסף מנהל חדש</h1>
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
                     <button onClick={props.handleSingup}>הרשמה</button>
                 </div>
            </div>
        </section>
         </div>
    );
}