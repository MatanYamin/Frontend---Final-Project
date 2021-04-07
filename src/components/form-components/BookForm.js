import React, { Component } from "react"
import PickService from "./PickService" //Step 1
import PersonalDetails from "./PersonalDetails"  // Step 3
import Confirm from "./Confirm"  // Step 4 and final
import Success from "./Success"  // Step 5 completed form
import axios from "../../../node_modules/axios"
import PickDateAndConfirm from "./PickDateAndConfirm"
import Footer from "../Footer"
//Will need to add adming page
const url = "http://127.0.0.1:5000/"


//Main Form Component for the steps. Will hold all the steps. maybe in the future I will add more steps
export class BookForm extends Component {
    constructor(){
        super()
        this.state = {
            title: "",
            step: 1,
            service: '',
            price: '',
            addons: '',
            date: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            comments: '',
            hour: '',
            image: ''
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
    // Will update the price value
    handlePrice = input => {
        this.setState({
            price: input
        })
    }

    handleCity = input => {
        this.setState({
            city: input
        })
    }

    handlePhone = input => {
        this.setState({
            phone: input
        })
    }

    handleImage = input => {
        this.setState({
            image: input
        })
    }

    clearStates = input => {
        this.setState({
            price: input,
            service: input,
            addons: input,
        })
    }

    // will send the page name and that way we can get the services that matches the name of the page (category)
    onCreatePost = () => {
        const postData = {
            title: this.props.page
        };
        try{
        axios.post(url + "services", postData)
        .then(response => console.log(response));}
        catch(e) {
            console.log(e)}
    }


    render() {
        const {step} = this.state
        const {service, addons, date, hour, price, firstName, lastName, email, address, city, phone, comments, image} = this.state;
        //The values that will be entered to the form
        const values = {service, addons, date, hour, price, firstName, lastName, email, address, city, phone, comments, image};
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
                    page={this.props.page}
                    handlePrice={this.handlePrice}
                    clearStates={this.clearStates}
                    />
                    </>
                )
            case 2:
                return(
                    <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    clearStates={this.clearStates}
                    values={values}
                    handlePhone={this.handlePhone}
                    handleImage={this.handleImage}
                    />
                )
            //Fourth step
            case 3:
                return(
                    <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                    handlePhone={this.handlePhone}
                    handleCity={this.handleCity}
                    />
                )
            //Fifth step (only will show that the submit worked)
            case 4:
                return(
                    <PickDateAndConfirm 
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 5:
            return(
                <Success />
            )
            
        }
}
}
export default BookForm