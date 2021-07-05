import React from "react"
import SingleService from "./SingleService"
import './ServicesCards.css'
// import { useState, useEffect } from 'react';
// const url = "http://127.0.0.1:5000/"
// const url = "https://skycleanerapi.xyz/"


function ServicesCards() {
    // will fetch from DB that allow the admin to change the syntax
    // Will be the hole display of services cars (Cars, Rugs...)
    // Each component will get image to display, text for description and path
    // adding an opion to increase dynamicly the number of categories
    // const [text, setText] = useState([])
    // useEffect(() => {
    //     fetch(url + 'get/cities').then(
    //         res => setText(res.json())
    //         )
    //     }
    // )
        
    return(
        <div className="cards">
            <h1>הזמנת ניקוי עד הבית.</h1>
            <br/>
            <h1>אנא בחרו קטגוריה:</h1>
            {/* {text} */}
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/VChPMLY/eco-car-wash.jpg" 
                        name="רכב"
                        text="⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Cars"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/bvFRLRg/sofa.jpg" 
                        name="ספות"
                        text="‎‎⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Furniture"
                        />
                    </ul>
                        <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/VJw3B5b/carpet.jpg" 
                        name="שטיחים"
                        text="⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Rugs"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/PGVYcd6/chair.jpg" 
                        name="כיסאות"
                        text="⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Chairs"
                        />
                        <SingleService 
                        imgurl="https://www.fourstar.com.sg/wp-content/uploads/2019/12/how-to-clean-your-mattress-right-during-spring-cleaning.png" 
                        name="מזרנים"
                        text="⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Mattress"
                        />
                        </ul>
                    {/* <ul className="cards__items">
                    <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="מזרנים"
                        text="תיאור שרות"
                        path="/Mattress"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="מזרנים"
                        text="תיאור שרות"
                        path="/Mattress"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="מזרנים"
                        text="תיאור שרות"
                        path="/Mattress"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="מזרנים"
                        text="תיאור שרות"
                        path="/SOO"
                        />
                    </ul> */}
                </div>
            </div>
        </div>
    )
}

export default ServicesCards