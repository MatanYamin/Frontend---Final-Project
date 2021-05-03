//By Matan Yamin
import React from "react"
import { Component } from "react"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class Addon extends Component {

    constructor(props){
        super(props)
        this.state = {
            addon_array: [],
            loading: false,
            second_price: '',
            shekel: "",
            nothingToShow: "נראה שאין כרגע מה להוסיף לשירות זה"
        }
    }
    // when the component is open, do the following
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
    // when there are changes in states
    componentDidUpdate(prevProps, prevState){
        if (prevState.second_price !== this.state.second_price) {
            var number = Number(this.state.second_price) + Number(this.props.firstPrice)
            this.props.handlePrice(number)
            this.setState({
                shekel: "₪"
            })
          }
    }
    // gets price for a certein addon
    addonPrice = (e) => {
        this.setState({
            loading: true
        });
        const priceData = {
            addon: e,
            ser: this.props.service
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
    // when click, add the price to the state
    handleClick = () => {
        this.props.handlePrice(this.props.firstPrice);
        this.props.handleShow();
    }

    render(){
        const addons_button_list = []
        this.state.addon_array.map(addon_now => (
            addons_button_list.push(<><button 
            value={addon_now}
            className="pick-addon-btn"
            onClick={() => {
                this.addonPrice(addon_now);
                this.props.handleAddon(addon_now);
            }}
            // onInput={this.props.handleService(service_now)}
            >
            {addon_now} </button></>)
            // services_button_list.push(" ")
            // services_button_list.push()
            )
            );
           
            
        return(
            <div>
                
            {/* <select 
            class="addon-btn"
            onChange={this.props.handleChange('addons')}
            onInput={(e) => {this.addonPrice(e)}}
            >
            <option value="nothing">בחרו מה להוסיף</option>
            {this.state.addon_array.map(addon => (
            <option value={addon}>{addon}</option>))}
            </select> */}
            <img alt="" src={this.props.imageService} />
            {addons_button_list}
            {/* <br/><br/> */}
            <br/>
            <br/>
            {/* <br/> */}
            {this.state.addon_array.length > 1 ? <>{this.props.firstPrice} ₪ + <b>{this.state.second_price} {this.state.shekel}</b></> : <><b>₪{this.props.firstPrice}</b><br/> <label>{this.state.nothingToShow}</label></>}
            
            {/* <button className={"cancelAddon"} onClick={this.handleClick}> הסתר תוספים</button> */}
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            </div>
        );
    }
}

export default Addon