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
                        text="‎‎⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Furniture"
                        />
                    </ul>
                        <ul className="cards__items">
                        <SingleService 
                        imgurl="https://www.cleanipedia.com/images/v2/93ea1df7133bbe3e644ab9be308a6a35-1800w-1200h.jpg" 
                        name="שטיחים"
                        text="⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Rugs"
                        />
                        <SingleService 
                        imgurl="https://www.furniture-work.co.uk/blog/wp-content/uploads/2020/10/image.png" 
                        name="כיסאות"
                        text="⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        path="/Chairs"
                        />
                        <SingleService 
                        imgurl="https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2020/4/1/GettyImages-1206150640.jpg.rend.hgtvcom.1280.853.suffix/1589402879117.jpeg" 
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