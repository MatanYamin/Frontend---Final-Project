//By Matan Yamin
import React from "react"
import { Component } from "react"
import axios from "axios"
import "./DropDown.css"
import Addon from "./Addon"
import "./Form.css"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
const url = "http://127.0.0.1:5000/"


export class PickService extends Component {
    constructor(props){
        super(props)
        this.state = {
            service_array: [],
            addon_array: [],
            showing: false,
            showDescription: false,
            selectValue: '',
            first_price: '',
            second_price: '',
            price_title: "המחיר: ",
            ser: "",
            service_description: "",
            priceNow: "",
            Shekel: "",
            textOnBubble: "ברוכים הבאים לאזור קביעת הפגישה. בבקשו בחרו שרות"
        }
    }

    componentDidMount() {
        // With this Im getting all services from the category that came from the page title
        const postData = {
            title: this.props.page
        };
        try{
        axios.post(url + "services", postData)
        .then(response => this.setState({
            service_array: response.data
        }));}
        catch(e) {
            console.log(e)}
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.first_price !== this.state.first_price) {
            this.props.handlePrice(this.state.first_price);
            this.state.showing= false;
            this.setState({
                priceNow: " המחיר ",
                Shekel: "₪"
            })
          }
    }

    setPrice = (e) => {
        // Will get the price from the API and update the state
        const priceData = {
            prices: e.target.value
        };
        try{
        axios.post(url + "prices", priceData)
        .then(response => this.setState(
            // console.log(response.data),
            {
            first_price: response.data[0],
            service_description: response.data[1],
            showDescription: true,
            textOnBubble: response.data[1]
        }));}
        catch(e) {
            console.log(e)}
        
    }

    handleShow = input => {
        this.setState({
            showing: false,
        })
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
        const {showDescription} = this.state;
        return (
            <>
            <div className="bubble-man">
            <div class="text-on-bubble">
                {this.state.textOnBubble}
            </div>
             <div className="pick-service-containet">
            {/* <h1>בחרתם ב {page}</h1> */}
            {/* <h1>מה מנקים?</h1> */}
            <br/>
            <div className="pick-ser-select-btn">
            <select
            defaultValue={this.props.service}
            class="service-btn"
            onChange={this.props.handleChange("service")}
            onInput={(e) => {this.setPrice(e)}}
            >
            {/*Showing all services with "map" inside select */}
            <div className="background-img"></div>
            <option value="nothing">בחרו שירות</option>
            {this.state.service_array.map(service => (
            <option value={service}>{service}</option>))}
            </select>
            </div>
            {this.state.showDescription ?
            <>
            &nbsp;&nbsp;
            <Popup trigger={<button className="details-btn">לחצו לקבל פרטים</button>} >
                <div class="pop-up-content1">
                    {this.state.service_description}
                    </div>
            </Popup>
            <br/><br/>
            <button className="addon-btn" onClick={() => this.setState({ showing: !showing })}>תרצו להוסיף?</button>
            <br/>
            <br/>
            {this.state.showing ?
            // Addon is a compontnet that holds all Addons services and prices
            <Addon 
            addons={this.props.addons}
            service={values.service}
            handleChange={this.props.handleChange}
            firstPrice={this.state.first_price}
            price={this.props.price}
            handlePrice={this.props.handlePrice}
            showing={this.state.showing}
            handleShow={this.handleShow}
            />
            :<>
            {this.state.priceNow}
            <b>{this.state.first_price} </b>
            {this.state.Shekel}
            </>
            }
            </>
            :
            null
            }
            
            <br/>
            <br/>
            <br/><br/>
            
            </div>
            <div className="step-btn-container">
            <button className="step-btn" onClick={this.continue}>להזנת פרטים אישיים</button>
             </div>
             </div>
            </>
    );
        }
            }
export default PickService