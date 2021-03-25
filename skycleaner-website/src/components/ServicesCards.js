import React from "react"
import SingleService from "./SingleService"
import './ServicesCards.css'


function ServicesCards() {
    // Will be the hole display of services cars (Cars, Rugs...)
    // Each component will get image to display, text for descrription and path
    return(
        <div className="cards">
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/VChPMLY/eco-car-wash.jpg" 
                        name="ניקוי רכב"
                        text="תיאור דברים שאפשר לכתוב כאן אנחנו מתמחים בניקיון הרבה דברים"
                        path="/Cars"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/bvFRLRg/sofa.jpg" 
                        name="ניקוי רהיטים"
                        text="אנו מנקים את כל סוגי הרהיטים"
                        path="/Furniture"
                        />
                    </ul>
                        <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/VJw3B5b/carpet.jpg" 
                        name="ניקוי שטיחים"
                        text="אנחנו מנקים את כל סוגי השטיחים"
                        path="/Rugs"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/PGVYcd6/chair.jpg" 
                        name="ניקוי כיסאות"
                        text="אנחנו מנקים את כל הכיסאות"
                        path="/Chairs"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="ניקוי כללי"
                        text="תיאור שרות"
                        path="/General"
                        />
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default ServicesCards