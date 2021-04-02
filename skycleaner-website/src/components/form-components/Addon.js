//By Matan Yamin
import React, {useState} from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
const url = "http://127.0.0.1:5000/"


export class Addon extends Component {

    constructor(props){
        super(props)
        this.state = {
            addon_array: [],
            second_price: ''
        }
    }
    componentDidMount() {
        const postData = {
            add: this.props.service
        };
        axios.post(url + "addon", postData)
        .then(response => this.setState({
            addon_array: response.data
        }));
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.second_price !== this.state.second_price) {
            this.props.handlePrice(this.state.second_price)
          }
        // if(prevProps.addons !== this.props.addons){
        //     // console.log("mattaaannn")
        // }
    }

    addonPrice = (e) => {
        const priceData = {
            addon: e.target.value
        };
        axios.post(url + "prices/addon", priceData)
        .then(response => this.setState({
            second_price: "מחיר " + response.data + " ש''ח"
        }));
    }

    handleClick = () => {
        this.props.handlePrice(this.props.firstPrice);
        this.props.handleShow();
    }

    render(){
        const {values} = this.props; //values is all the props we passed to the component
        return(
            <div>
            <select 
            class="addon-btn"
            onChange={this.props.handleChange('addons')}
            onInput={(e) => {this.addonPrice(e)}}
            >
            <option value="nothing">בחרו תוספים</option>
            {this.state.addon_array.map(addon => (
            <option value={addon}>{addon}</option>))}
            </select>
            <br/><br/>
            <b>{this.state.second_price}     </b>
            <button className={"cancelAddon"} onClick={this.handleClick}> הסתר תוספים</button>
            </div>
        );
    }
}

export default Addon