import React from "react";
import { Component } from "react";
import {ExportCSV} from './ExportCSV';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
// const url = "https://skycleanerapi.xyz/"


export class ExportCSVpage extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    // async readCustomers() {
    //     let response = await fetch(url + this.props.currentCommand);
    //     let data = await response.json(); // for string
    //     return data
    // }

    // componentDidMount() {
    //     this.readCustomers().then((data) => {
    //         this.setState({
    //             customers: data
    //         })
    //     })
    // }


render() {
    // title of the file
    // const fileName = 'תורים'
    // book will hold all the bookings
    let book = []
    this.props.customers.map(
    (rowData, index) => (
        // creating the data that will be inside the excel file
        book.push({'#': index + 1,
                "שם מלא": rowData[1],
                "מייל": rowData[2],
                "טלפון": rowData[3],
                "כתובת": rowData[4],
                "שירות": rowData[5],
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
            <ExportCSV numClients={this.props.numClients} buttonName={this.props.buttonName} csvData={book} fileName={this.props.csvTitle} /> 
            </div>
        </div>
        {/* <div>
            <div className="loginContainer">
            <ExportCSV csvData={book} fileName={fileName} /> 
            </div>
        </div> */}
        </>
    )}
}

export default ExportCSVpage