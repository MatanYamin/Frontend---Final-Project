import React from "react"
import { Component } from "react"
import {ExportCSV} from './ExportCSV';
const url = "http://127.0.0.1:5000/"


export class ExportCSVpage extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers: []
        }
    }

    async readCustomers() {
        // bring all cities allowed
        let response = await fetch(url + 'get/customers', { credentials: 'include' });
        let data = await response.json(); // for string
        return data
    }

    componentDidMount() {
        // we read all customers and puting them inside array, than sending to excel generator
        this.readCustomers().then((data) => {
            this.setState({
                customers: data
            })
        })
    }

render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    // title of the file
    const fileName = 'תורים'
    // book will hold all the bookings
    let book = []
    this.state.customers.map(
    (rowData, index) => (
        // creating the data that will be inside the excel file
        book.push({'#': index + 1,
                "שם מלא": rowData[1],
                "מייל": rowData[2],
                "טלפון": rowData[3],
                "כתובת": rowData[4],
                "שרות": rowData[5],
                "תאריך": rowData[6],
                "שעה": rowData[7],
                "מחיר": rowData[8],
                "הערות": rowData[9]}
            )
    ))
    return(
        <>
        <div>
            <div className="loginContainer">
            <ExportCSV csvData={book} fileName={fileName} /> 
            </div>
        </div>
        </>
    )}
}

export default ExportCSVpage