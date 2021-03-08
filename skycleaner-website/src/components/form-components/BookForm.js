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

    // Proceed to next step
    nextStep = () => {
        const {step} = this.state.step
        this.state({
            step: step + 1
        });
    }

    // Go back to previous step
    prevStep = () => {
        const {step} = this.state.step
        this.state({
            step: step - 1
        });
    }

    render() {
        const {step} = this.state
        const {service, addons,firstName, lastName, email, address, city, phone, comments} = this.state;
        //I will pass the values to the relevant Component
        const values = {service, addons,firstName, lastName, email, address, city, phone, comments};
        // switchcase for every step- from the steps in state
        switch(step){
            case 1:
                return(
                    <PickService />
                )
            case 2:
                return(
                    <PickDate />
                )
            case 3:
                return(
                    <PersonalDetails />
                )
            case 4:
                return(
                    <Confirm />
                )
            case 5:
                return(
                    <Success />
                )
        }
}
}
export default BookForm