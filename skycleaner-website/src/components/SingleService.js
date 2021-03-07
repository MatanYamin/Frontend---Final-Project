import React from "react"
import {Link} from "react-router-dom"

function SingleService() {
    return(
        <>
        <li className="single-service">
            <Link className="service-link">
                <figure className="figure-class">
                    <img src="/" alt="???" className="service-img" />
                </figure>
            </Link>
        </li>
        </>
    )
}

export default SingleService