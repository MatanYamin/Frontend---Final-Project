import React, { Component } from "react"
import PickService from "./PickService" //Step 1
import PickDate from "./PickDate"  // Step 2
import PersonalDetails from "./PersonalDetails"  // Step 3
import Confirm from "./Confirm"  // Step 4 and final
import Success from "./Success"  // Step 5 completed form



//Main Form Component for the steps. Will hold all the steps. maybe in the future I will add more steps
export class BookForm extends Component {
    constructor(){
        super()
        this.state = {
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
    }

    // increases the step integer and that way we can know where we at
    //with switch case we will check at which step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    // decreases the step integer and that way we can know where we at
    //with switch case we will check at which step
    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    //handleChange will insert the value that the user inserted to the same input
    //'input' is the field that the user insert his value
    handleChange = input => event => {
        this.setState({
            [input]: event.target.value
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
                return (
                    <>
                    <PickService
                    nextStep={this.nextStep}  //increase step by 1
                    handleChange={this.handleChange}  //passing my function inorder to be able insert value to the input name
                    values={values}
                    />
                    </>
                )
            //Second step
            case 2:
                return (
                    <>
                    <PickDate
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                    />
                    </>
                )
                
            //Third step
            case 3:
                return(
                    <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                    />
                )
            //Fourth step
            case 4:
                return(
                    <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                    />
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