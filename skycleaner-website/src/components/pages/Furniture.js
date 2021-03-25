import React from 'react';
import "../../App.css"
import BookForm from "../form-components/BookForm"
import "../form-components/Form.css"


export default function Furniture() {
    const page = window.location.pathname.substring(1);
    return(
        <div className="form-stpes">
            <BookForm page={page} />
        </div>
    );
}

