import React from 'react';
import AddAdmin from "../AddAdmin"
import UpdateService from "../UpdateService"
import UpdateAddon from "../UpdateAddon"
import UpdateDate from "../UpdateDate"
import UpdateCity from "../UpdateCity"
import UpdatePrice from "../UpdatePrice"
import ShowBookings from "../ShowBookings"
import UpdateDescription from "../UpdateDescription"
import ExportCSVpage from "../ExportCSVpage"
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
          showCity: false,
          showPrice: false,
          showFuture: false,
          showDescription: false,
        };
      }
      render() {
        //will update if there is a click
        const {showDelete} = this.state;
        const {showUpdateService} = this.state
        const {showUpdateAddon} = this.state
        const {showDisableDate} = this.state
        const {showCity} = this.state
        const {showPrice} = this.state
        const {showFuture} = this.state
        const {showDescription} = this.state
    return(
        <div class="admin-main-container">
        <h1> ברוכים הבאים למסך הניהול
         </h1>
         {/* Will show all future bookings and option to delete (delete will free the booking time to others) */}
         <button className="button-form2" onClick={() => this.setState({ showFuture: !showFuture })}>הצגת תורים עתידיים</button>
        {this.state.showFuture ?
           <ShowBookings
           />
            :
           null
        }
         <div>
        {/* moving to change service: delete or add new one */}
        <button className="button-form" onClick={() => this.setState({ showUpdateService: !showUpdateService })}>עדכון שרות</button>
        {this.state.showUpdateService ?
           <UpdateService
           />
            :
           null
        }
        {/* moving to change addon: delete or add new one */}
        <button className="button-form2" onClick={() => this.setState({ showUpdateAddon: !showUpdateAddon })}>עדכון תוסף</button>
        {this.state.showUpdateAddon ?
           <UpdateAddon
           />
            :
           null
        }
        {/* Admin can block a day/hour or free a day inside UpdateDate */}
        <button className="button-form" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>עדכן זמינות</button>
        {this.state.showDisableDate ?
           <UpdateDate
           />
            :
           null
        }
        {/* Admin can add city to the list or delete one */}
         <button className="button-form2" onClick={() => this.setState({ showCity: !showCity })}>עדכן רשימת ערים</button>
         {this.state.showCity ?
           <UpdateCity
           />
            :
           null
        }
        {/* Admin can change price for a certain product */}
        <button className="button-form" onClick={() => this.setState({ showPrice: !showPrice })}>עדכן מחיר</button>
         {this.state.showPrice ?
           <UpdatePrice
           />
            :
           null
        }
        <button className="button-form2" onClick={() => this.setState({ showDescription: !showDescription })}>עדכן תאור לשרות</button>
         {this.state.showDescription ?
           <UpdateDescription
           />
            :
           null
        }
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
        <button className="button-form2" onClick={this.props.handleLogout}>התנתק</button>
        {/* <button className="button-form2">אישור על סיום תור</button> */}
      </div>
         </div>
    );
}
}

export default Admin