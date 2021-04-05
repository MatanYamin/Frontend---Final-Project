import React from "react"
import { Component } from "react"
import "./ShowBooking.css"
import ExportCSVpage from "./ExportCSVpage"
const url = "http://127.0.0.1:5000/"
// const url = "http://3.138.43.76:8000/"


export class ShowBookings extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers: [],
            new_city: "",
            showing: false,
            deleting: false,
            exportXl: false,
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

render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    const {showing} = this.state;
    const {deleting} = this.state;
    const {exportXl} = this.state;
    const fileName = 'תורים'
    return(
        <>
        <div>
        <section className="customers-table">
            <div className="loginContainer">
         <ExportCSVpage />
         <br/>
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
                </tr>
                 </thead>
                 <tbody>
{this.state.customers.map(
    
    (rowData, index) => (
                
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
                                this.state.customers.splice(this.state.customers.indexOf(rowData), 1).then(
                                    alert("נמחק בהצלחה")
                                )
                                );
                            }
                            catch(e) {
                                console.log(e)}
                            }
                            }
                    >מחיקה <i class="fas fa-trash-alt"></i></button>
                     <button className="confirm-booking"
                     onClick={() => 
                        {
                            try{
                                fetch(url + "post/feedback", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        fullName: rowData[1],
                                        email: rowData[2],
                                        id: rowData[0]
                                    })
                                })
                                .then(this.setState({
                                    // txt2: " העיר" + " " + this.state.new_city + " " + "נמחקה בהצלחה "
                                }),
                                );
                                this.state.customers.splice(this.state.customers.indexOf(rowData), 1).then(
                                    alert("פידבק נשלח אל הלקוח")
                                )
                            }
                            catch(e) {
                                console.log(e)}
                            }
                            }
                     >אישור תור <i class="fas fa-check-circle"></i></button>
                     
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

export default ShowBookings