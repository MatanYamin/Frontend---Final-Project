import React from 'react';
import AddAdmin from "../AddAdmin"
//Admin panel will hold all components that are able by the admin

class Admin extends React.Component {
    
    constructor(props) {
        super(props);
        //"showing state" will help us show or hide a component "add admin" after clicking the button
        this.state = {
          showing: false,
        };
      }
      render() {
        //will update if there is a click
        const {showing} = this.state;
    return(
        <div>
        <h1> ברוכים הבאים למסך הניהול
         </h1>
         {/* This button is handling adding admin component */}
         <button onClick={this.props.handleLogout}>התנתק</button>
         <div>
        {/* Adding new manager component after click */}
        <button onClick={() => this.setState({ showing: !showing })}>הוספת מנהל</button>
        {this.state.showing ?
           <AddAdmin
           email={this.props.email}
           setEmail={this.props.setEmail}
           password={this.props.password}
           setPassword={this.props.setPassword}
           handleSingup={this.props.handleSingup}
           />
            :
           null
        }
        {/* Will add component for each activity */}
        <button>מחיקת מנהל</button>  
        <button>שינוי שרות</button>
        <button>עדכון זמינות</button>
        <button>אישור על סיום תור</button>
        <button>הצגת תורים עתידיים</button>
      </div>
         </div>
    );
}
}
export default Admin