//By Matan Yamin
import React, {useState} from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"


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
        axios.post("http://127.0.0.1:5000/addon", postData)
        .then(response => this.setState({
            addon_array: response.data
        }));
    }

    addonPrice = (e) => {
        const priceData = {
            addon: e.target.value
        };
        axios.post("http://127.0.0.1:5000/prices/addon", priceData)
        .then(response => this.setState({
            second_price: response.data
        }));
    }

    render(){
        const {values} = this.props; //values is all the props we passed to the component
        return(
            <div>
            <br/>
            <select 
            class="dropbtn"
            onChange={this.props.handleChange('addons')}
            onInput={(e) => {this.addonPrice(e)}}
            >
            <option value="nothing">בחרו תוספים</option>
            {this.state.addon_array.map(addon => (
            <option value={addon}>{addon}</option>))}
            </select>
            <br/>
            מחיר:
            <br/>
            {this.state.second_price}
            </div>
        );
    }
}

export default Addon