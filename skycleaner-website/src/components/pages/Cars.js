import React from 'react';
import "../../App.css"
import BookForm from "../form-components/BookForm"
import axios from "axios"
import {useState} from "react"


export default function Cars() {

    const page = window.location.pathname.substring(1);
    return(
        <div className="form-stpes">
            <BookForm page={page}/>
        </div>
    );
}

