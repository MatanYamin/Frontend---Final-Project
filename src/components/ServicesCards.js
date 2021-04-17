import React from "react"
import SingleService from "./SingleService"
import './ServicesCards.css'


function ServicesCards() {
    // Will be the hole display of services cars (Cars, Rugs...)
    // Each component will get image to display, text for descrription and path
    // will make it here from DB and manager could add 
    return(
        <div className="cards">
            <h1>הזמנת ניקוי עד הבית</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/VChPMLY/eco-car-wash.jpg" 
                        name="רכב"
                        text="טיפול במושבים/ספסלים/כסאות ועוד מגוון רחב של אפשרויות לניקוי. היכנסו לפרטים"
                        path="/Cars"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/bvFRLRg/sofa.jpg" 
                        name="ספות"
                        text="אנו מנקים את כל סוגי הספות"
                        path="/Furniture"
                        />
                    </ul>
                        <ul className="cards__items">
                        <SingleService 
                        imgurl="https://i.ibb.co/VJw3B5b/carpet.jpg" 
                        name="שטיחים"
                        text="אנחנו מנקים את כל סוגי השטיחים. היכנסו לקבלת פרטים נוספים"
                        path="/Rugs"
                        />
                        <SingleService 
                        imgurl="https://i.ibb.co/PGVYcd6/chair.jpg" 
                        name="כיסאות"
                        text="ניקוי רחב של ספות. היכנסו לקבלת פרטים"
                        path="/Chairs"
                        />
                        <SingleService 
                        imgurl="https://www.fourstar.com.sg/wp-content/uploads/2019/12/how-to-clean-your-mattress-right-during-spring-cleaning.png" 
                        name="מזרנים"
                        text="ניקוי רחב של מזרנים ומיטות שונות. היכנסו לקבלת פרטים."
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