import React from "react"
import { Component } from "react"
const url = "http://127.0.0.1:5000/"

export class UpdateService extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories_array: [],
            services_array: [],
            cat_name: "",
            service_name: "",
            price: "",
            showing: false,
            deleting: false,
            updateServiceSuccess: "",
            deleteSuccess: "",
            description: ""
        }
    }

    async readCategories() {
        // get all categories inorder to know to whick category we will add a service
        let response = await fetch(url + 'get/categories', { credentials: 'include' });
        let data = await response.json();
        return data
    }

    async readServices() {
        // bringing all service for deleting one
        let response = await fetch(url + 'get/services', { credentials: 'include' });
        let data = await response.json();
        return data
    }
    
    componentDidMount() {
        // when open this component, we will get all categories first
        this.readCategories().then((data) => {
            this.setState({
                categories_array: data
            })
        })
    
    }


    componentDidUpdate(prevProps, prevState){
        // after detecting changes in state, we will bring now all services from the API
        if (prevState.categories_array !== this.state.categories_array) {
            
            this.readServices().then((data) => {
                this.setState({
                    services_array: data
                })
            })
            }
    }

    // for typing new service
    handleService = (input) => {
        this.setState({
            service_name: input.target.value
        })
    }
    // for typing new price
    handlePrice = (input) => {
        this.setState({
            price: input.target.value
        })
    }
    // Adding description for the service
    handleDescription = (input) => {
        this.setState({
            description: input.target.value
        })
    }

    addNewService = () => {
        try{
            fetch(url + "post/service", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    cat_name: this.state.cat_name,
                    service_name: this.state.service_name,
                    price: this.state.price,
                    description: this.state.description
                })
            })
            .then(this.setState({
             updateServiceSuccess: "השרות נוסף בהצלחה"
         }), alert(this.state.service_name + " נוסף בהצלחה"), 
         );;
        }
        catch(e) {
            console.log(e)}
        }
    
    deleteService = () => 
    {
        try{
            fetch(url + "delete/service", {
                method: "DELETE",
                body: JSON.stringify({
                    service_name: this.state.service_name,
                })
            })
            .then(this.setState({
                deleteSuccess: "השרות נמחק בהצלחה"
            }),
            this.state.services_array.splice(this.state.services_array.indexOf(this.state.service_name), 1).then(
                alert(this.state.service_name + " נמחק בהצלחה")
            )
            
            );;
        }
        catch(e) {
            console.log(e)}
        }

render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    const {showing} = this.state;
    const {deleting} = this.state;
    return(
        <>
        <br/>
        <section className="adminComponent">
            <div className="adminComponentContainer">
        <button className="admin-btn-add" onClick={() => this.setState({ showing: !showing })}>הוספת שרות <i class="fas fa-plus"></i></button>
        {/* Using "showing" for clicking a button */}
        {this.state.showing ? //for open an option to choose (add service)
        <>
           <label>בחר קטגוריה להוספה</label>
           <select className="select-srp-down" onChange={(e) => this.setState({ cat_name: e.target.value })}>
               <option value="nothing">בחר קטגוריה</option>
               {this.state.categories_array.map(cat => (
               <option value={cat}>{cat}</option>))}
               </select>
           <label>הקלד שם שרות</label>
           <input autoComplete="off"
           onChange={(e) => {this.handleService(e)}}
            />
            <label>הוסף תיאור</label>
           <input autoComplete="off"
           onChange={(e) => {this.handleDescription(e)}}
            />
            <label>מחיר (בשקלים)</label>
            <input onChange={(e) => {this.handlePrice(e)}}
           />
            <div className="btnContainer">
                <button className="step-btn-admin"
                // Post request for adding service
                onClick={this.addNewService}
                >אישור</button>
            <button className="step-btn-admin" onClick={() => this.setState({ showing: !showing })}>ביטול</button>
            </div>
            <br/>
            <label>{this.state.updateServiceSuccess}</label>
             </>
            :
           null
        }
        <br/><br/>
        <button className="admin-btn-del" onClick={() => this.setState({ deleting: !deleting })}>מחיקת שרות <i class="fas fa-trash"></i></button>
        <br/><br/>
        {this.state.deleting ? //for open an option to choose (delete service)
           <>
            <select class="del-drp-btn" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services_array.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                    <br/><br/>
                    <button
                    className="del-btn"
                    // post request for deleteing service
                    onClick={this.deleteService}
                    >אישור מחיקה<br/> (הדבר ימחק גם את כל התוספים של אותו שרות)</button>
                    <br/>
                    <button className="step-btn-admin" onClick={() => this.setState({ deleting: !deleting })}>ביטול</button>
                    <br/>
                    <label>{this.state.deleteSuccess}</label>

           </>
            :
           null
        }
            </div>
        </section>
        </>
    )}
}

export default UpdateService