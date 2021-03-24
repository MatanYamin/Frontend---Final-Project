//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import axios from "axios"
import "./DropDown.css"
import Addon from "./Addon"
import "./Form.css"



export class PickService extends Component {

    constructor(props){
        super(props)
        this.state = {
            service_array: [],
            addon_array: [],
            showing: false,
            matan: "",
            selectValue: '',
            first_price: '',
            price_title: "המחיר: "
        }
    }

    componentDidMount() {
        const postData = {
            title: this.props.page
        };
        axios.post("http://127.0.0.1:5000/services", postData)
        .then(response => this.setState({
            service_array: response.data
        }));
    }

    setPrice = (e) => {
        const priceData = {
            prices: e.target.value
        };
        axios.post("http://127.0.0.1:5000/prices", priceData)
        .then(response => this.setState({
            first_price: response.data
        }));
    }
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    render() {
        const {values} = this.props; //values is all the props we passed to the component
        const page = window.location.pathname.substring(1); //page name
        const {showing} = this.state;
    return (
        <div>
            <h1>בחרתם ב {page}</h1>
            <h1>מה מנקים?</h1>
            <br/>
            <select 
            class="form-drp-btn"
            onChange={this.props.handleChange("service")}
            onInput={(e) => {this.setPrice(e)}}
            >
            <option value="nothing">בחרו שרות</option>
            {this.state.service_array.map(service => (
            <option value={service}>{service}</option>))}
            </select>
            <br/><br/>
            <br/>
            <button className="form-drp-btn" onClick={() => this.setState({ showing: !showing })}>תרצו להוסיף?</button>
            {this.state.showing ?
            <Addon 
            addons={this.props.addons}
            service={values.service}
            handleChange={this.props.handleChange}
            firstPrice={this.state.first_price}
            price={this.props.price}
            />
            :
            this.state.price_title +
            this.state.first_price //here the price will go
            }
            <br/><br/>
            <div className="step-btn-container">
            <button className="step-btn" onClick={this.continue}>להזנת פרטים אישיים</button>
            </div>
        </div>
    );
        }
            }
export default PickService