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
            checkPhone: "",
            notes: "",
            temp: "",
            streetCheck: "",
            firstNameFlag: false,
            missingField: "",
            missFieldText: ""
        };
        this.uploadToS3 = this.uploadToS3.bind(this);
        this.continue = this.continue.bind(this);
        
        // this.onlyDigit = this.onlyDigit.bind(this)
     }

     async readCities() {
        // bring all cities allowed
        let response = await fetch(url + 'get/cities');
        let data = await response.json(); // for string
        return data
    }
    
    //Currenty I decided not to use this function
    // async readnotes() {
    //     // bring all cities allowed
    //     let response = await fetch(url + 'get/notes');
    //     let data = await response.json(); // for string
    //     return data
    // }

    // get_note = (ser) => {
    //     const data = {
    //         service: ser
    //     };
    //     axios.post(url + "post/note", data)
    //     .then(response => this.setState({
    //         notes: response.data,
    //         loading: false
    //     }));
    // }

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

    // componentDidUpdate(prevProps, prevState){
    //     if (prevState.cities !== this.state.cities) {
    //         // this.get_note(this.props.service);
    //       }
    //   }

    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        if(!this.props.values.firstName || !this.props.values.lastName || !this.props.values.email || !this.props.values.phone || !this.props.values.address){
            this.setState({
                missingField: "‎",
                missFieldText: "השדות אשר מוסמנים באדום הינם שדות חובה."
            })
        }
        else{
            this.setState({
                missFieldText: ""
            })
            event.preventDefault();
            this.props.nextStep(); //will increase step by 1
        }
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
    
    if(values.price === ""){
        return(
            <>
            <br/><br/><br/><br/><br/><br/><br/>
            <b>  לא נבחר שירות</b>
            <div className="step-btn-container">
            <button onClick={this.backward} className="step-btn">חזור</button>
            </div>
            </>
        )
    }
    return (
        <>
            <div className="dits_on_side">
                <label>השירות שנבחר: <br/>
                {values.service}
                <br/>
                מחיר:
                <br/>
                {values.price} ש"ח
                </label>
                </div>
            <div className="right_nav_personal">
            <br/>
            <div className="each_manu">
                <p className="first" onClick={this.backward}>חזרה</p>
                <br/>
                <a className="second" href="/contact"  >צרו איתנו קשר!</a>
            </div>
            <br/>
            {/* <div className="each_manu">
                <p href="/contact">העיר שלכם לא ברשימה?<br/> צרו איתנו קשר!</p>
            </div> */}
            </div>
            {/* <div className="notes_on_right">
                מילים
                <h1>אחד</h1>
                <h1>שתיים</h1>
                <h1>שלוש</h1>
            </div> */}
            <h6 className="red-text">שדות שמסומנים ב * הינם חובה</h6> 
            <div className="personal-wrapper">
            <h6><label className="red-text">*</label>שם פרטי: </h6>
            <TextField 
            placeholder={this.state.missingField}
            onChange={this.props.handleChange('firstName')}
            onInput={(e) => {this.validFirst(e)}}
            defaultValue={values.firstName}
            />
            
            <h6><label className="red-text">*</label>שם משפחה:</h6>
            <TextField
            placeholder={this.state.missingField}
            onChange={this.props.handleChange('lastName')}
            onInput={(e) => {this.validLast(e)}}
            defaultValue={values.lastName}
            />
            <h6><label className="red-text">*</label>דוא"ל: </h6>
            <TextField
            placeholder={this.state.missingField}
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
            <h6><label className="red-text">{this.state.wrongEmail}</label></h6>
            <h6><label className="green-text">{this.state.goodEmail}</label></h6>
            <h6><label className="red-text">*</label>טלפון:</h6>
            <TextField
            placeholder={this.state.missingField}
            onChange={this.props.handleChange("phone")}
            onInput={(e) => {this.validPhone(e)}}
            value={this.props.values.phone}
            />
            <h6><label className="red-text">{this.state.badPhone}</label></h6>
            <h6><label className="green-text">{this.state.goodPhone}</label></h6>
            <h6><label className="red-text">*</label>עיר:</h6>
            <select 
            className="city-drp-down"
            defaultValue={values.city}
            onChange={this.props.handleChange('city')}>
            <option
            value="">בחרו עיר מהרשימה</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
            {/* <h6><label className="red-text">העיר שלכם לא ברשימה? <label href="https://skycleanerisrael.com/contact">צרו איתנו קשר!</label> </label></h6> */}
            <h6><label className="red-text">*</label>רחוב: </h6>
            <TextField
            placeholder={this.state.missingField}
            onChange={this.props.handleChange('address')}
            defaultValue={values.address}
            onInput={(e) => {
                this.setState({
                    streetCheck: e.target.value
                })
            }}
            />
            <h6>הערות:</h6>
            <TextField
            onChange={this.props.handleChange('comments')}
            defaultValue={values.comments}
            />
            <h6>אנא העלו תמונה של הפריט כדי שניצור איתכם קשר במידת הצורך</h6>
            <label className="image_upload_input">העלה תמונה
            <input hidden type="file" onChange={this.uploadToS3} />
            </label>
            <div className="show-image">
            <img alt="" className="img-customer-upload" src={this.state.image} />
            </div>
                <div className="red-text-error">
                    {this.state.missFieldText}
                </div>
            {/* <br/><br/> */}
            </div>
            <br/> 
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div className="step-btn-container2">
            <button onClick={this.continue} className="step-btn">המשך</button>
            <button onClick={this.backward} className="step-btn2">חזור</button>
            </div>
                </>
    );
        }
            }
    
export default PersonalDetails