import React from 'react';
import "../../App.css"
import BookForm from "../form-components/BookForm"


export default function General() {
    const page = window.location.pathname.substring(1);
    return(
        <div className="clean1">
            <BookForm page={page} />
        </div>
    );
}
