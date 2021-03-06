//By Matan Yamin
import React from "react";
import { Component } from "react";
import TextField from "../../../node_modules/@material-ui/core/TextField";
import "./Form.css";
import ReactS3 from "react-s3";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import config from "../../../src/configur";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
            checkEmail: false,
            checkPhoneFlag: false,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            flag5: false,
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
        window.scrollTo(0, 0)
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
                missingField: "????????? ??????",
                missFieldText: "?????????? ?????? ?????????????? ?????????? ???????? ???????? ????????."
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
                alert("???????????? ?????????? ????????????")
              }
              else{
                  alert("???????? ???????? ???????????? ????????????")
              }
            }
          )
        }

    //validate first name (if exists)
    validFirst(e){
        this.setState({firstNameValue: e.target.value});
        if(e.target.value.length >= 2){
            this.setState({
                flag1: true
            })
        }
        else{
            this.setState({
                flag1: false
            })
        }
    }

    //validate last name (if exists)
    validLast(e){
        this.setState({lastNameValue: e.target.value});
        if(e.target.value.length >= 2){
            this.setState({
                flag2: true
            })
        }
        else{
            this.setState({
                flag2: false
            })
        }
    }

    // validate the email address
    validEmail(e){
        this.setState({mailValue: e.target.value});
        if(e.target.value === ""){
            this.setState({goodEmail: "", checkEmail: false});
            this.setState({wrongEmail: ""});
        }
        // check if email is valid
        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.mailValue) === true && e.target.value !== ""){
                this.setState({wrongEmail: "", checkEmail: false, flag3: true});
                this.setState({goodEmail: "?????????? ??????????"});
            }
        else{
            this.setState({wrongEmail: "?????????? ???? ??????????", checkEmail: true, flag3: false});
            this.setState({goodEmail: ""});
        }
    }

    // check if the input is only digits
    validPhone(e){
        this.setState({checkPhone: e.target.value});
        if(!/^\d+$/.test(e.target.value) && e.target.value){
            alert("???????? ???????????? ?????????? ????????");
            e.target.value = ""
            this.setState({checkPhone: "",
                           checkPhoneFlag: true,
                           flag4: false
                        });
        }
        if(e.target.value.length < 7){
            this.setState({badPhone: "???????? ?????? ????????"});
            this.setState({goodPhone: "", checkPhoneFlag: true, flag4: false});
        }
        else{
            this.setState({badPhone: ""});
            this.setState({goodPhone: "???????? ????????", checkPhoneFlag: false, flag4: true});
        }
    }

    render() {
    const {values} = this.props; //values is all the props we passed to the component
    
    if(values.price === ""){
        return(
            <>
            <br/><br/><br/><br/><br/><br/><br/>
            <b>  ???? ???????? ??????????</b>
            <div className="step-btn-container">
            <button onClick={this.backward} className="step-btn">????????</button>
            </div>
            </>
        )
    }
    return (
        <>
            <div className="dits_on_side">
                <label>???????????? ??????????: <br/>
                {values.service}
                <br/>
                ????????:
                <br/>
                {values.price} ??"??
                </label>
                </div>
            <div className="right_nav_personal">
            <br/>
            <div className="each_manu">
                <p className="first" onClick={this.backward}>????????</p>
                <br/>
                <a className="second" href="/contact"  >?????? ?????????? ??????!</a>
            </div>
            <br/>
            {/* <div className="each_manu">
                <p href="/contact">???????? ???????? ???? ?????????????<br/> ?????? ?????????? ??????!</p>
            </div> */}
            </div>
            {/* <div className="notes_on_right">
                ??????????
                <h1>??????</h1>
                <h1>??????????</h1>
                <h1>????????</h1>
            </div> */}
            <h6 className="red-text3">???????? ???????????????? ?? * ???????? ????????</h6> 
            <div className="personal-wrapper">
            <img alt="" className="img_on_form" src="https://i.ibb.co/9bS1Xfm/A11.jpg" />
            <h6><label className="red-text3">*</label>???? ????????: </h6>
            <div>
            <TextField 
            placeholder={this.state.missingField}
            onChange={this.props.handleChange('firstName')}
            onInput={(e) => {this.validFirst(e)}}
            defaultValue={values.firstName}
            />
            {this.state.flag1? <><CheckCircleOutlineIcon /></> : null}
            
            </div>
            <h6><label className="red-text3">*</label>???? ??????????:</h6>
            <div>
            <TextField
            placeholder={this.state.missingField}
            onChange={this.props.handleChange('lastName')}
            onInput={(e) => {this.validLast(e)}}
            defaultValue={values.lastName}
            />
            {this.state.flag2? <><CheckCircleOutlineIcon /></> : null}
            </div>
            <h6><label className="red-text3">*</label>??????"??: </h6>
            <div>
            <TextField
            error={this.state.checkEmail}
            placeholder={this.state.missingField}
            type="email"
            onChange={this.props.handleChange('email')}
            onInput={(e) => {this.validEmail(e)}}
            defaultValue={values.email}
            required={true}
            />
            {this.state.flag3? <><CheckCircleOutlineIcon /></> : null}
            </div>
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <p className="red-text3">{this.state.wrongEmail}</p>
           <p className="green-text">{this.state.goodEmail}</p>
            <h6><label className="red-text3">*</label>??????????:</h6>
            <div>
            <TextField
            error={this.state.checkPhoneFlag}
            placeholder={this.state.missingField}
            onChange={this.props.handleChange("phone")}
            onInput={(e) => {this.validPhone(e)}}
            value={this.props.values.phone}
            />
            {this.state.flag4? <><CheckCircleOutlineIcon /></> : null}
            </div>
            <label className="red-text3">{this.state.badPhone}</label>
           <label className="green-text">{this.state.goodPhone}</label>
            <h6><label className="red-text3">*</label>??????:</h6>
            <select 
            className="city-drp-down"
            defaultValue={values.city}
            onChange={this.props.handleChange('city')}>
            <option
            value="">???????? ?????? ??????????????</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
            <br/>
            {/* <h6><label className="red-text3">???????? ???????? ???? ????????????? <label href="https://skycleanerisrael.com/contact">?????? ?????????? ??????!</label> </label></h6> */}
            <h6><label className="red-text3">*</label>???????? ?????????? ??????:  </h6>
            <div>
            <TextField
            placeholder={this.state.missingField}
            onChange={this.props.handleChange('address')}
            defaultValue={values.address}
            onInput={(e) => {
                this.setState({
                    streetCheck: e.target.value,
                    flag5: true
                })
            }}
            />
            {this.state.flag5? <><CheckCircleOutlineIcon /></> : null}
            </div>
            <h6>??????????:</h6>
            <TextField
            onChange={this.props.handleChange('comments')}
            defaultValue={values.comments}
            />
            <h6>?????? ???????? ?????????? ???? ?????????? ?????? ???????????? ?????????? ?????? ?????????? ??????????</h6>
            <label className="image_upload_input">???????? ??????????
            <input className="thisInput" type="file" onChange={this.uploadToS3} />
            </label>
            <div className="show-image">
            <img alt="" className="img-customer-upload" src={this.props.values.image} />
            </div>
                <div className="red-text-error">
                    {this.state.missFieldText}
                </div>
            {/* <br/><br/> */}
            </div>
            <br/> 
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div className="step-btn-container2">
            <button onClick={this.continue} className="step-btn">????????</button>
            <button onClick={this.backward} className="step-btn2">????????</button>
            </div>
                </>
    );
        }
            }
    
export default PersonalDetails