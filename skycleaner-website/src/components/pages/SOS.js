import React from 'react';
import "../../App.css"
import BookForm from "../form-components/BookForm"
import "../form-components/Form.css"


export default function SOS() {
    const page = window.location.pathname.substring(1);
    return(
        <div>
           <br/>
           כאן יהיה כתוב משהו על שרות דחוף
        </div>
    );
}
