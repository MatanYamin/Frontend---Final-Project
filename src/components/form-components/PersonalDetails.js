//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import "./Form.css"
import ReactS3 from "react-s3"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import config from "../../../src/configur"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class PersonalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            cities: [],
            loading: false,
            mailValue: "",
            firstNameValue: "",
            lastNameValue: "",
            wrongEmail: "",
            goodEmail: "",
            goodPhone: "",
            badPhone: "",
            image: "",
            checkPhone: ""
        };
        this.uploadToS3 = this.uploadToS3.bind(this);
        // this.onlyDigit = this.onlyDigit.bind(this)
     }

     async readCities() {
        // bring all cities allowed
        let response = await fetch(url + 'get/cities');
        let data = await response.json(); // for string
        return data
    }
    // when the component is open, do the following
    componentDidMount() {
        this.setState({
            loading: true
        });
        this.readCities().then((data) => {
            this.setState({
                cities: data,
                loading: false
            })
        })
    }

    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    // go backwards
    backward = event => {
        event.preventDefault();
        this.props.clearStates("");
        this.props.prevStep(); //will increase step by 1
    }
    // this uploads the image to the S3 aws
    uploadToS3(e) {
        this.setState({
            loading: true
        });
        ReactS3.uploadFile(e.target.files[0], config)
        .then(
            (response)=> {
                if(response.location){
                this.setState({
                    image: response.location,
                    loading: false
                    
                });
                this.props.handleImage(response.location);
                alert("התמונה נוספה בהצלחה")
              }
              else{
                  alert("קרתה תקלה בהעלאת התמונה")
              }
            }
          )
        }

    //validate first name (if exists)
    validFirst(e){
        this.setState({firstNameValue: e.target.value});
    }

    //validate last name (if exists)
    validLast(e){
        this.setState({lastNameValue: e.target.value});
    }

    // validate the email address
    validEmail(e){
        this.setState({mailValue: e.target.value});
        if(e.target.value === ""){
            this.setState({goodEmail: ""});
            this.setState({wrongEmail: ""});
        }
        // check if email is valid
        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.mailValue) === true && e.target.value !== ""){
                this.setState({wrongEmail: ""});
                this.setState({goodEmail: "כתובת תקינה"});
            }
        else{
            this.setState({wrongEmail: "כתובת לא תקינה"});
            this.setState({goodEmail: ""});
        }
    }

    // check if the input is only digits
    validPhone(e){
        this.setState({checkPhone: e.target.value});
        if(!/^\d+$/.test(e.target.value)){
            alert("ניתן להקליד ספרות בלבד");
            this.setState({checkPhone: ""});
        }
        if(e.target.value.length < 7){
            this.setState({badPhone: "מספר קצר מידי"});
            this.setState({goodPhone: ""});
        }
        else{
            this.setState({badPhone: ""});
            this.setState({goodPhone: "מספר תקין"});
        }
    }

    render() {
    const {values} = this.props; //values is all the props we passed to the component
    if(values.price==""){
        return(
            <>
            <br/><br/><br/><br/><br/><br/><br/>
            <b>  לא נבחר שרות</b>
            <div className="step-btn-container">
            <button onClick={this.backward} className="step-btn">חזור</button>
            </div>
            </>
        )
    }
    return (
        <div>
            <h6 className="red-text">שדות שמסומנים ב * הינם חובה</h6> 
            <div className="personal-wrapper">
            <h6><a className="red-text">*</a>שם פרטי: </h6>
            <TextField 
            onChange={this.props.handleChange('firstName')}
            onInput={(e) => {this.validFirst(e)}}
            defaultValue={values.firstName}
            />
            <h6><a className="red-text">*</a>שם משפחה:</h6>
            <TextField
            onChange={this.props.handleChange('lastName')}
            onInput={(e) => {this.validLast(e)}}
            defaultValue={values.lastName}
            />
            <h6><a className="red-text">*</a>דוא"ל: </h6>
            <TextField
            type="email"
            onChange={this.props.handleChange('email')}
            onInput={(e) => {this.validEmail(e)}}
            defaultValue={values.email}
            required={true}
            />
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <h6><a className="red-text">{this.state.wrongEmail}</a></h6>
            <h6><a className="green-text">{this.state.goodEmail}</a></h6>
            <h6><a className="red-text">*</a>טלפון:</h6>
            <TextField
            onChange={this.props.handleChange("phone")}
            onInput={(e) => {this.validPhone(e)}}
            value={this.state.checkPhone}
            />
            <h6><a className="red-text">{this.state.badPhone}</a></h6>
            <h6><a className="green-text">{this.state.goodPhone}</a></h6>
            <h6><a className="red-text">*</a>עיר:</h6>
            <select 
            class="city-drp-down"
            defaultValue={values.city}
            onChange={this.props.handleChange('city')}>
            <option
            value="">בחרו עיר</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
            <h6><a className="red-text">העיר שלכם לא ברשימה? <a href="https://skycleanerisrael.com/contact">צרו איתנו קשר!</a> </a></h6>
            <h6><a className="red-text">*</a>רחוב: </h6>
            <TextField
            onChange={this.props.handleChange('address')}
            defaultValue={values.address}
            />
            <h6>הערות:</h6>
            <TextField
            onChange={this.props.handleChange('comments')}
            defaultValue={values.comments}
            />
            <h6>אנא העלו תמונה של הפריט כדי שניצור איתכם קשר במידת הצורך</h6>
            <input type="file" onChange={this.uploadToS3} />
            <div className="show-image">
            <img className="img-customer-upload" src={this.state.image} />
            </div>
            {/*  */}<br/><br/>
            </div>
            <br/> 
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div className="step-btn-container">
            <button onClick={this.continue} className="step-btn">המשך</button>
            <button onClick={this.backward} className="step-btn">חזור</button>
            </div>
                </div>
    );
        }
            }
    
export default PersonalDetails