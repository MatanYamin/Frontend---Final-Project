import React from "react"
import {Link} from "react-router-dom"
import './ServicesCards.css' 


function SingleService(props) {
// This is a single service component (card)
// We will get title, description, path and image to use for each one
    return(
        <>
        <li className="cards__item">
            <Link
            className="cards__item__link" to={props.path}
            >
                <h1>{props.name}</h1>
                <figure className="cards__item__pic-wrap">
                    <img src={props.imgurl} className="cards__item__img" />
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{props.text}</h5>
                </div>
            </Link>
        </li>
        </>
    )
}

export default SingleService