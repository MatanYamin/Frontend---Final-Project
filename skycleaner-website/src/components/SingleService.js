import React from "react"
import {Link} from "react-router-dom"
import {useState} from "react"
import './ServicesCards.css' 
import axios from "axios"


function SingleService(props) {
   

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