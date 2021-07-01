import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AllOutIcon from '@material-ui/icons/AllOut';
import CheckIcon from '@material-ui/icons/Check';


export class Preview extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: [],
            deleting: false,
            loading: false,
            txt1: "",
            txt2: "",
            placeHolder: "",
            region: "",
            regionName: ""
        }
    }

render() {
    return(
        <>
        <br/>
        <div className="bubble-man-preview">
            <div className="imageContainerPreview">
                <div className="textBoxPreview"><div className="textPreviewLittleBox">{this.props.textOnBubble}
                    </div>
                        </div>
            <div className="titlePreview">
                {this.props.title}
            </div>
            <img alt="" src={this.props.image} />
            </div>
        </div>
        <div className="pricePreview">
            המחיר: &nbsp;
             ₪{this.props.price}
        </div>
            
        </>
    )}
}

export default Preview