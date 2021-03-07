import React from "react"
import SingleService from "./SingleService"
import './ServicesCards.css'


function ServicesCards() {
    return(
        <div className="cards">
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        {/* Here I will put the card component */}
                        <SingleService 
                        imgurl="https://i.ibb.co/VChPMLY/eco-car-wash.jpg" 
                        name="ניקוי רכב"
                        text="תיאור דברים שאפשר לכתוב כאן כמו מילים מילים ועוד מילים אנחנו מתמחים בניקיון הרבה דברים"
                        path="/something"
                        />
                        {/* <ul></ul> */}
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="ניקוי רכב"
                        text="תיאור שרות"
                        path="/something"
                        />
                    </ul>
                        <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="ניקוי רכב"
                        text="תיאור שרות"
                        path="/something"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="ניקוי רכב"
                        text="תיאור שרות"
                        path="/something"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/MCnJ3Mj/2947964-46.png" 
                        name="ניקוי רכב"
                        text="תיאור שרות"
                        path="/something"
                        />
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default ServicesCards