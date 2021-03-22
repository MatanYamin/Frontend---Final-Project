//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import axios from "axios"
import "./DropDown.css"


export class PickService extends Component {

    constructor(props){
        super(props)
        this.state = {
            service_array: [],
            addon_array: [],
            matan: ""
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

    

    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    render() {
        const {values} = this.props; //values is all the props we passed to the component
        const page = window.location.pathname.substring(1); //page name
    return (
        <div>
            <h1>בחרתם ב {page}</h1>
            <h1>מה מנקים?</h1>
            <br/>
            {/* <br/> */}
            <select 
            class="dropbtn"
            onChange={this.props.handleChange('service')}
            >
            <option value="nothing">בחרו שרות</option>
            {this.state.service_array.map(service => (
            <option value={service}>{service}</option>))}
            </select>
            <br/><br/>
            {values.service}
            <button
            onClick={() => {axios.post("http://127.0.0.1:5000/addon", JSON.stringify(values.service))
            .then(response => this.setState({
                addon_array: response.data
            }));}}
            >
                אישור
            {console.log(this.props.service)}
            </button>
            {this.state.addon_array}
            <h5>בחרו תוספים</h5>

            <br/>
            {/* <TextField
            placeholder="הקלידו את תשובתכם"
            onChange={this.props.handleChange('addons')}
            defaultValue={values.addons}
            /> */}
            <br/>
            <UiButton
            onClick={this.continue}><h1>המשך</h1>
            </UiButton>
        </div>
    );
        }
            }
    
export default PickService