//By Matan Yamin
import React, {useState} from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
const url = "http://127.0.0.1:5000/"


export class Addon extends Component {

    constructor(props){
        super(props)
        this.state = {
            addon_array: [],
            loading: false,
            second_price: '',
            shekel: ""
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        });

        const postData = {
            add: this.props.service
        };
        try{
        axios.post(url + "addon", postData)
        .then(response => this.setState({
            addon_array: response.data,
            loading: false
        }));}
        catch(e) {
            console.log(e)}
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.second_price !== this.state.second_price) {
            // alert(this.state.second_price)
            // alert(this.props.firstPrice)
            var number = Number(this.state.second_price) + Number(this.props.firstPrice)
            // alert(number)
            this.props.handlePrice(number)
            this.setState({
                shekel: "₪"
            })
          }
    }

    addonPrice = (e) => {
        this.setState({
            loading: true
        });
        const priceData = {
            addon: e.target.value
        };
        try{
        axios.post(url + "prices/addon", priceData)
        .then(response => this.setState({
            second_price: response.data,
            loading: false
        }));}
        catch(e) {
            console.log(e)}
    }

    handleClick = () => {
        this.props.handlePrice(this.props.firstPrice);
        this.props.handleShow();
    }

    render(){
        const {values} = this.props; //values is all the props we passed to the component
        return(
            <div>
                <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <select 
            class="addon-btn"
            onChange={this.props.handleChange('addons')}
            onInput={(e) => {this.addonPrice(e)}}
            >
            <option value="nothing">בחרו מה להוסיף</option>
            {this.state.addon_array.map(addon => (
            <option value={addon}>{addon}</option>))}
            </select>
            <br/><br/>
            <b>{this.props.firstPrice} ₪+{this.state.second_price} {this.state.shekel}</b>
            <br/>
            <button className={"cancelAddon"} onClick={this.handleClick}> הסתר תוספים</button>
            </div>
        );
    }
}

export default Addon