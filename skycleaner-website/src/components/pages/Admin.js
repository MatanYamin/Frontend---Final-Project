import React from 'react';
import AddAdmin from "../AddAdmin"


class Admin extends React.Component {
    
    constructor(props) {
        super(props);
        //"showing state" will help us show or hide a component
        this.state = {
          showing: false,
        };
      }
      render() {
        const { showing } = this.state;
    return(
        <div>
        <h1> ברוכים הבאים למסך הניהול
         </h1>
         {/* This button is handling adding admin component */}
         <button onClick={this.props.handleLogout}>התנתק</button>
         <div>
        <button onClick={() => this.setState({ showing: !showing })}>להוספת מנהל</button>
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
      </div>

         </div>
    );
}

}

export default Admin