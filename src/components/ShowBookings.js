import React from "react";
import { Component } from "react";
import "./ShowBooking.css";
import ExportCSVpage from "./ExportCSVpage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Loader from "react-loader-spinner";
import UpdateIcon from '@material-ui/icons/Update';
import RefreshIcon from '@material-ui/icons/Refresh';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class ShowBookings extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers: [],
            copy_customers: [],
            filterIndex: 1,
            showAllCustomers: false,
            loading: false,
            numOfBook: 6,
            value: 0,
            currentCommand: '',
            buttonName: "",
            csvTitle: ""
        }
    }

    // bring all customers from DB
    async readFutureCustomers() {
        this.setState({
            currentCommand: 'get/customers',
            loading: true
        });
        let response = await fetch(url + 'get/customers');
        let data = await response.json(); // for string
        return data
    }

    async readAllCustomers() {
        this.setState({
            currentCommand: 'get/all_customers',
            loading: true
        });
        let response = await fetch(url + 'get/all_customers');
        let data = await response.json(); // for string
        return data
    }

    async readPastCustomers() {
        this.setState({
            currentCommand: 'get/past_customers',
            loading: true
        });
        let response = await fetch(url + 'get/past_customers');
        let data = await response.json(); // for string
        return data
    }
    
    // when the component is open, do the following
    componentDidMount() {
        this.setState({
            loading: true
        });
        this.readFutureCustomers().then((data) => {
            this.setState({
                buttonName: "???????? ?????????? ??????????????",
                csvTitle: "?????????? ??????????????",
                customers: data,
                copy_customers: data,
                loading: false
            })
        })
    }

    componentDidUpdate(prevProps, prevState){
        // whenever there is a change in the last state, it will change the current state
        if (prevState.customers !== this.state.customers) {
            this.setState({
              numOfBook: this.state.customers.length
            });
          }
      }
    // this function searches the table according to the chosen filter.
    searchTable = (e) => {
        // when the search box is empty, show all
        if(e.target.value.length === 0){
            this.setState({
                customers: this.state.copy_customers
            })
        }
        else{
            var newArray = []
            this.state.copy_customers.forEach(
                (rowData) => {
                    // check if the string is inside the array, if yes - put it inside the new one.
                    if(rowData[this.state.filterIndex].includes(e.target.value)){
                            newArray.push(rowData)
                    }
                }
            )
            // update the original array to the filtered one.
            this.setState({
                customers: newArray
            })
        }
    }

    handleAllCustomers = () => {
        this.setState({
            showAllCustomers: true,
            loading: !this.state.loading
        })
    }

    handleFilter = (e) => {
        this.setState({
            filterIndex: e.target.value
        })
    }

render() {
    return(
        <>
        <Paper square>
        <Tabs
          value={this.state.value}
          textColor="primary"
          indicatorColor="primary"
          centered
          onChange={(event, newValue) => {
            this.setState({
                value: newValue
            });
          }}
        >
          <Tab icon={<UpdateIcon />} onClick={() => this.readFutureCustomers().then((data) => {
            this.setState({
                showAllCustomers: false,
                customers: data,
                loading: false,
                currentCommand: 'get/customers',
                csvTitle: "?????????? ??????????????",
                buttonName: "???????? ?????????? ??????????????",
            })
        })} label="?????????? ??????????????" />
          <Tab icon={<AllInclusiveIcon />} onClick={() => this.readAllCustomers().then((data) => {
                 this.setState({
                     customers: data,
                     copy_customers: data,
                     loading: false,
                     currentCommand: 'get/all_customers',
                     csvTitle: "?????????? ?????? ????????????",
                     buttonName: "???????? ?????????? ?????? ????????????"
                 })
             })} label="???? ????????????" />
          <Tab icon={<RefreshIcon />} onClick={() => this.readPastCustomers().then((data) => {
            this.setState({
                showAllCustomers: false,
                customers: data,
                copy_customers: data,
                loading: false,
                currentCommand: 'get/past_customers',
                csvTitle: "?????????? ??????????",
                buttonName: "???????? ?????????? ??????????"
            })
        })} label="?????????? ????????" />
        </Tabs>
      </Paper>
        <section >
         <div className="inside-table">
         <ExportCSVpage numClients={this.state.numOfBook} csvTitle={this.state.csvTitle} customers={this.state.customers} buttonName={this.state.buttonName} />
         <div className="search">
             <div className="search_input">
        <Loader
            type="TailSpin"
            color="black"
            height={100}
            width={50}
            visible={this.state.loading}
            />
        <i className="filterSearchAlone">
         <select onChange={(e) => this.handleFilter(e)}>
            <option value={1}>????</option>
            <option value={2}>??????"??</option>
            <option value={3}>??????????</option>
            <option value={4}>??????????</option>
            <option value={5}>??????????</option>
            <option value={6}>??????????</option>
        </select>
        </i>
        &nbsp;
         <input
         placeholder="???????? ??????..."
         onInput={(e) => {this.searchTable(e)}} />
         <label className="searchIcon"><SearchIcon /></label>
         </div>
         </div>
         {/* <p className="num_bookings">
         ???????? ????????????: &nbsp;
         {this.state.numOfBook}
         </p> */}
         {/* <br/> */}
            <table bordered>
                 <thead>
                 <tr>
                    <th>#</th>
                     <th>???? ??????</th>
                     <th>????????</th>
                     <th>??????????</th>
                     <th>??????????</th>
                     <th>??????????</th>
                     <th>??????????</th>
                     <th>??????</th>
                     <th>????????</th>
                     <th>??????????</th>
                     <th>ID</th>
                     <th>?????????? ??????</th>
                     <th>?????????? ??????</th>
                </tr>
                 </thead>
                 <tbody>
{this.state.customers.map(
    (rowData, index) => (
                
                 <tr className={index%2 === 0 ? null : "td1"}>
                     <th scope="row">{index + 1}</th>
                     {/* ???? ?????? */}
                     <td>{rowData[1]}</td> 
                     {/* ???????? */}
                     <td>{rowData[2]}</td>
                     {/* ?????????? */}
                     <td>{rowData[3]}</td>
                     {/* ?????????? */}
                     <td>{rowData[4]}</td>
                     {/* ???????? */}
                     <td>{rowData[5]}</td>
                     {/* ?????????? */}
                     <td>{rowData[6]}</td>
                     {/* ?????? */}
                     <td>{rowData[7]}</td>
                     {/* ???????? */}
                     <td>{rowData[8]}</td>
                     {/* ?????????? */}
                     <td>{rowData[9]}</td>
                     {/* ????' ???????? */}
                     <td>{rowData[0]}</td> 
                     <td>
                     <button 
                    className="delet-btn-show-booking"
                    onClick={() => 
                        {
                            let confirm = window.confirm(
                                "?????? ???????? ?????????????? ?????????? ???? ?????????"
                              )
                            if(confirm){
                                this.setState({
                                    loading: true
                                });
                                try{
                                    fetch(url + "delete/booking", {
                                        method: "DELETE",
                                        body: JSON.stringify({
                                            id: rowData[0],
                                            day: rowData[6],
                                            hour: rowData[7]
    
                                        })
                                    })
                                    .then(
                                        (response) => {
                                            if(response.status === 200){
                                                this.setState({
                                                    // changes when the status is ok and the function worked succesfully
                                                    loading: false,
                                                    customers: this.state.customers.filter((_, i) => i !== this.state.customers.indexOf(rowData))
                                                })
                                            }
                                            else{
                                                alert("???????? ????????. ?????? ???????? ???????? ??????")
                                            }
                                        }
                                    )
                                }
                                catch(e) {
                                    console.log(e)}
                            }
                            }
                            }
                    ><i className="cancelRed"><CancelIcon /></i></button>
                    </td>
                    <td>
                     <button 
                     className="confirm-show-booking"
                     onClick={() => 
                        {
                            let confirm2 = window.confirm(
                                "?????? ???????? ???????? ???????? ???????? ???? ?????????"
                              )
                            if(confirm2){
                                this.setState({
                                    loading: true
                                });
                                try{
                                    fetch(url + "post/feedback", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            fullName: rowData[1],
                                            email: rowData[2],
                                            id: rowData[0]
                                        })
                                    })
                                    .then(
                                        (response) => {
                                            if(response.status === 200){
                                                this.setState({
                                                    loading: false
                                                })
                                                this.state.customers.splice(this.state.customers.indexOf(rowData), 1)                                        }
                                            else{
                                                alert("???????? ????????. ?????? ???????? ???????? ??????")
                                            }
                                        }
                                    )
                                }
                                catch(e) {
                                    console.log(e)}
                            }
                            }
                            }
                     ><i className="checkGreen"><CheckCircleOutlineIcon /></i></button>
                     
                     </td>
                 </tr>
                ))}
                </tbody>
             </table>
             </div>
        </section>
        </>
    )}
}

export default ShowBookings