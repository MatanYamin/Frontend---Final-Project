import React from 'react';
import AddAdmin from "../AddAdmin"
import UpdateService from "../UpdateService"
import UpdateAddon from "../UpdateAddon"
import UpdateDate from "../UpdateDate"
import UpdateCity from "../UpdateCity"
//Admin panel will hold all components that are able by the admin


class Admin extends React.Component {
    // Admin main page. will hold all functions to use for the admin
    constructor(props) {
        super(props);
        //"showing state" will help us show or hide a component "add admin" after clicking the button
        this.state = {
          showDelete: false,
          showUpdateService: false,
          showUpdateAddon: false,
          showDisableDate: false,
          showCity: false
        };
      }
      render() {
        //will update if there is a click
        const {showDelete} = this.state;
        const {showUpdateService} = this.state
        const {showUpdateAddon} = this.state
        const {showDisableDate} = this.state
        const {showCity} = this.state
    return(
        <div>
        <h1> ברוכים הבאים למסך הניהול
         </h1>
         {/* This button is handling adding admin component */}
         <button className="button-form" onClick={this.props.handleLogout}>התנתק</button>
         <div>
        {/* Adding new manager component after click */}
        <button className="button-form" onClick={() => this.setState({ showDelete: !showDelete })}>הוספת מנהל</button>
        {/* Using "showing" for clicking a button */}
        {this.state.showDelete ?
        <>
           <AddAdmin
           email={this.props.email}
           setEmail={this.props.setEmail}
           password={this.props.password}
           setPassword={this.props.setPassword}
           handleSingup={this.props.handleSingup}
           />
         </>
            :
            null
         }
        {/* moving to change service: delete or add new one */}
        <button className="button-form" onClick={() => this.setState({ showUpdateService: !showUpdateService })}>עדכון שרות</button>
        {this.state.showUpdateService ?
           <UpdateService
           />
            :
           null
        }
        {/* moving to change addon: delete or add new one */}
        <button className="button-form" onClick={() => this.setState({ showUpdateAddon: !showUpdateAddon })}>עדכון תוסף</button>
        {this.state.showUpdateAddon ?
           <UpdateAddon
           />
            :
           null
        }
        <button className="button-form" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>עדכן זמינות</button>
        {this.state.showDisableDate ?
           <UpdateDate
           />
            :
           null
        }
         <button className="button-form" onClick={() => this.setState({ showCity: !showCity })}>הוסף עיר לרשימה</button>
         {this.state.showCity ?
           <UpdateCity
           />
            :
           null
        }
        <button className="button-form">אישור על סיום תור</button>
        <button className="button-form">הצגת תורים עתידיים</button>
      </div>
         </div>
    );
}
}

export default Admin