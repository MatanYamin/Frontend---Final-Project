import React, { Component } from "react"
//Main Form Component for the steps


export class BookForm extends Component() {
    state = {
        step: 1,
        service: '',
        addons: '',
        firstName: '',
        lastName: '',
        email: '',
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
        const {service, addons,firstName, lastName, email, address, city, comments}
        return(
            <div>

        </div>
    )
}
}
export default BookForm