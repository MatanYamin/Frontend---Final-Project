import React from "react"
import { Component } from "react"
import "./Booking.css"
const url = "http://127.0.0.1:5000/"


export class Bookings extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers: [],
            new_city: "",
            showing: false,
            deleting: false,
            check: false,
            txt1: "",
            txt2: ""
        }
    }

    async readCustomers() {
        // bring all cities allowed
        let response = await fetch(url + 'get/customers', { credentials: 'include' });
        let data = await response.json(); // for string
        return data
    }

    componentDidMount() {
        this.readCustomers().then((data) => {
            this.setState({
                customers: data
            })
        })
    }

    // componentDidUpdate(prevProps, prevState){
    //     // after detecting changes in state, we will bring now all services from the API
    //     if (prevState.txt2 !== this.state.txt2) {
    //         this.readCities().then((data) => {
    //             this.setState({
    //                 cities: data
    //             })
    //         })
    //         }
    // }


render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    const {showing} = this.state;
    const {deleting} = this.state;
    const {check} = this.state;
    return(
        <>
        <div>
        <section className="customers-table">
            <div className="loginContainer">
            <table bordered>
                 <thead>
                 <tr>
                    <th>#</th>
                     <th>שם מלא</th>
                     <th>מייל</th>
                     <th>טלפון</th>
                     <th>כתובת</th>
                     <th>שרות</th>
                     <th>תאריך</th>
                     <th>שעה</th>
                     <th>מחיר</th>
                     <th>הערות</th>
                     <th>ID</th>
                     {/* <th>בטל תור</th> */}
                     {/* <th>בוצע</th> */}
                </tr>
                 </thead>
                 <tbody>
{this.state.customers.map((rowData, index) => (
                 <tr>
                     <th scope="row">{index + 1}</th>
                     {/* שם מלא */}
                     <td>{rowData[1]}</td> 
                     {/* מייל */}
                     <td>{rowData[2]}</td>
                     {/* טלפון */}
                     <td>{rowData[3]}</td>
                     {/* כתובת */}
                     <td>{rowData[4]}</td>
                     {/* שרות */}
                     <td>{rowData[5]}</td>
                     {/* תאריך */}
                     <td>{rowData[6]}</td>
                     {/* שעה */}
                     <td>{rowData[7]}</td>
                     {/* מחיר */}
                     <td>{rowData[8]}</td>
                     {/* הערות */}
                     <td>{rowData[9]}</td>
                     {/* מס' מזהה */}
                     <td>{rowData[0]}</td> 
                     <th>
                     <button 
                    // onInput={}
                    className="del-booking"
                    onClick={() => 
                        {
                            try{
                                fetch(url + "delete/booking", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        id: rowData[0],
                                        day: rowData[6],
                                        hour: rowData[7]

                                    })
                                })
                                .then(this.setState({
                                    // txt2: " העיר" + " " + this.state.new_city + " " + "נמחקה בהצלחה "
                                }),
                                this.state.customers.splice(this.state.customers.indexOf(rowData), 1)
                                );
                            }
                            catch(e) {
                                console.log(e)}
                            }
                            }
                    >מחיקה</button>
                     <button className="confirm-booking">אישור תור</button>
                     </th>
                 </tr>

))}

                </tbody>
             </table>
            </div>
        </section>
        </div>
        </>
    )}
}

export default Bookings