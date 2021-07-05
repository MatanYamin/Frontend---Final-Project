//By Matan Yamin
import React from "react"
import { Component } from "react"
import axios from "axios"
import "./DropDown.css"
import Addon from "./Addon"
import "./Form.css"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import RoomServiceIcon from '@material-ui/icons/RoomService';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class PickService extends Component {
    constructor(props){
        super(props)
        this.state = {
            service_array: [],
            imagesArray: [],
            servicesImages: [],
            showing: false,
            loading: false,
            showDescription: false,
            openPopUp: false,
            openPopU2: false,
            serviceOrAddon: true,
            first_price: '',
            ser: "",
            service_description: "",
            priceNow: "",
            Shekel: "",
            temp: "",
            imageService: "",
            titleService: "",
            textOnBubble: "ברוכים הבאים לאזור קביעת הפגישה. לחצו על 'בחרו שירות' בשביל להמשיך. לחיצה על 'תרצו להוסיף' תפתח עבורכם עוד אפשרויות ניקוי שונות"
        }
        this.continue = this.continue.bind(this);
    }
    // when component is opening do the following
    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({
            loading: true
        });
        // With this Im getting all services from the category that came from the page title
        const postData = {
            title: this.props.page
        };
        try{
        axios.post(url + "services", postData)
        .then(response => this.setState({
            service_array: response.data,
            // servicesImages: response.data[1],
            loading: false
        }));}
        catch(e) {
            console.log(e)}
    }
    // when firsprice state has changed
    componentDidUpdate(prevProps, prevState){
        if (prevState.first_price !== this.state.first_price) {
            this.props.handlePrice(this.state.first_price);
            // this.state.showing= false;
            this.setState({
                priceNow: " המחיר: ",
                Shekel: "₪",
                showing: false
            })
          }
    }

    // Will get the price from the API and update the state
    setPrice = (e) => {
        this.setState({
            loading: true
        });
        const priceData = {
            service: e
        };
        try{
        axios.post(url + "prices", priceData)
        .then(response => this.setState(
            {
            first_price: response.data[0],
            service_description: response.data[1],
            showDescription: true,
            textOnBubble: response.data[1],
            imagesArray: response.data[2],
            loading: false,
            titleService: ""
        }));}
        catch(e) {
            console.log(e)}
    }

    handleShow = input => {
        this.setState({
            showing: false,
        })
    }

    keepImage = input => {
        this.setState({
            imageService: input
        })
    }

    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        if(!this.props.values.service){
            alert("נא לבחור שירות")
        }
        else{
            event.preventDefault();
            this.props.nextStep(); //will increase step by 1
        }
    }
    render() {
        const {values} = this.props; //values is all the props we passed to the component
        // const {showing} = this.state;
        const {openPopUp} = this.state;
        const {serviceOrAddon} = this.state;
        const services_button_list = [];
        this.state.service_array.map(service_now => (
            services_button_list.push(
            <>
            <img
            alt=""
            onClick={() => {
                this.setPrice(service_now[0]);
                this.props.handleService(service_now[0]);
                this.keepImage(service_now[1]);
                this.setState({
                    serviceOrAddon: !serviceOrAddon
                })
            }} 
            src={service_now[1]} />
            
            <button 
            className="btn-on-image"
            value={service_now[0]}
            onClick={() => {
                this.setPrice(service_now[0]);
                this.props.handleService(service_now[0]);
                this.keepImage(service_now[1]);
                this.setState({
                    serviceOrAddon: !serviceOrAddon
                })
            }}
            >
            {service_now[0]} 
            </button>
            </>
            ) + services_button_list.push(" ")
            )
            );
            
        return (
            <>
            {/* <br/> */}
        <Tabs
          value=""
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<RoomServiceIcon />} label={"שירות שנבחר: " + this.props.values.service + " " + this.props.values.addons} />
          <Tab icon={<LocalOfferIcon />} label={"המחיר: " + this.props.values.price} />
        </Tabs>
            <div className="bubble-man">
            <div className="text-on-bubble">
                <label>{this.state.textOnBubble}</label>
            </div>
                </div>
             <div className="pick-service-containet">
                <div className="pick-service-headline">
                </div>
            <br/>
                <h1>{this.state.titleService}</h1>
            <div className="whole_pick_ser_containet">
            <div className="pick-ser-select-btn">
            {/* <select
            defaultValue={this.props.service}
            className="service-btn"
            onChange={this.props.handleChange("service")}
            onInput={(e) => {this.setPrice(e)}}
            >
            <div className="background-img"></div>
            <option value="nothing">בחרו שירות </option>
            {this.state.service_array.map(service => (
                <option value={service}>{service}</option>))}
            </select> */}
            {serviceOrAddon ? <>
            <div className="service-btn-container">
            {services_button_list}
            </div>
            </> : <>
            <label>{values.service}</label>
            <br/>
            <img className="thisImage" alt="" width="50%"
            src={this.state.imageService} />
             </>}
            <Loader
            type="TailSpin"
            color="black"
            height={100}
            width={50}
            visible={this.state.loading}
            />
            </div>
            {this.state.showDescription ?
            <>
            &nbsp;&nbsp;
            <br/>
            <div className="newAddonCont">
            <Popup 
            className="check-me" 
            trigger={<button className="dit_btn_1">לצפייה בתמונות <i className="fas fa-images"></i></button>}
            on="click"
            open={openPopUp}
            onOpen={() => this.setState({ openPopUp: !openPopUp })}>
                <div className="pop-up-content1">
                    <br/>
                    <div className="top-pop-up-content1">
                     <h6>לא בטוחים במשהו? <a href="https://skycleanerisrael.com/contact">צרו איתנו קשר!</a></h6>
                    <button className="details-btn" onClick={() => this.setState({ openPopUp: !openPopUp })}>סגירה</button>
                     </div>
              {this.state.imagesArray.map(img => (
                <img alt="" className="imgs-to-customer" src={img} />))}
                    </div>
            </Popup>
            {/* <br/><br/>
            <button className="addon-btn" onClick={() => this.setState({ 
                showing: !showing
                 })}>לחצו לצפייה בשירותים לסוג שבחרתם</button> */}
            {/* <br/> */}



            {/* ------------------------ */}


            &nbsp;
            <Popup 
            // className="check-me" 
            open={this.state.openPopUp2}
            trigger={<button className="dit_btn_1">לצפייה בשירותים לסוג שנבחר <i className="fas fa-images"></i></button>}
            on="click"
            onOpen={() => this.setState({ openPopUp2: !this.state.openPopUp2 })}
            >
                <div className="pop-up-content5">
                <Addon 
            addons={this.props.addons}
            service={values.service}
            handleChange={this.props.handleChange}
            firstPrice={this.state.first_price}
            price={this.props.price}
            handlePrice={this.props.handlePrice}
            showing={this.state.showing}
            handleShow={this.handleShow}
            handleAddon={this.props.handleAddon}
            />
            <br/>
            <button 
            className="addon-btn-cancel2"
            onClick={() => this.setState({ 
                openPopUp2: false
                 })}>חזור</button>
              
                    </div>
            </Popup>

            {/* ------------------------ */}
            {/* <br/> */}
                 
            {/* {this.state.showing ?
            <>
            <Addon 
            addons={this.props.addons}
            service={values.service}
            handleChange={this.props.handleChange}
            firstPrice={this.state.first_price}
            price={this.props.price}
            handlePrice={this.props.handlePrice}
            showing={this.state.showing}
            handleShow={this.handleShow}
            handleAddon={this.props.handleAddon}
            />
            <button 
            className="addon-btn-cancel2"
            onClick={() => this.setState({ 
                showing: !showing
                 })}>חזור</button>
            </>
            :<>
            {this.state.priceNow}
            <b>{this.state.first_price} </b>
            {this.state.Shekel}
            </>
            } */}
            <br/>
            <br/>
            <br/>
            <button
                 className="dit_btn_15"
                 onClick={() => this.setState({ 
                    serviceOrAddon: !serviceOrAddon,
                    showDescription: !this.state.showDescription,
                    textOnBubble: "ברוכים הבאים לאזור קביעת הפגישה. לחצו על 'בחרו שירות' בשביל להמשיך. לחיצה על 'תרצו להוסיף' תפתח עבורכם עוד אפשרויות ניקוי שונות"

                     })}
                 >ביטול</button>
                 </div>
                 <br/>
            </>
            :
            null
            }
            
            <br/>
            <br/>
            <br/><br/>
            </div>
            <div className="step-btn-container">
            <button className="step-btn" onClick={this.continue}>המשך</button>
             </div>
             </div>
             {/* </div> */}
            </>
    );
        }
            }
export default PickService