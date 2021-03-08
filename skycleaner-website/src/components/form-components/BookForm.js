import React, { Component } from "react"
import PickService from "./PickService" //Step 1
import PickDate from "./PickDate"  // Step 2
import PersonalDetails from "./PersonalDetails"  // Step 3
import Confirm from "./Confirm"  // Step 4 and final
import Success from "./Success"  // Step 5 completed form


//Main Form Component for the steps


export class BookForm extends Component() {
    state = {
        step: 1,
        service: '',
        addons: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        comments: ''
    }

    // increases the step integer and that way we can know where we at
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    // decreases the step integer and that way we can know where we at
    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    render() {
        const {step} = this.state
        const {service, addons,firstName, lastName, email, address, city, phone, comments} = this.state;
        //The values that will be entered to the form
        const values = {service, addons,firstName, lastName, email, address, city, phone, comments};
        // switchcase for every step- from the steps in state
        switch(step){
            //First step and initial step
            case 1:
                return(
                    <PickService
                    nextStep={this.nextStep}
                    />
                )
            //Second step
            case 2:
                return(
                    <PickDate />
                )
            //Third step
            case 3:
                return(
                    <PersonalDetails />
                )
            //Fourth step
            case 4:
                return(
                    <Confirm />
                )
            //Fifth step (only will show that the submit worked)
            case 5:
                return(
                    <Success />
                )
        }
}
}
export default BookForm