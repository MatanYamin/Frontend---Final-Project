import React from "react"
import SingleService from "./SingleService"


function ServicesCards() {
    return(
        <div className="cards">
            <h1>ניקוי רכב</h1>
            <div className="cards-container">
                <div className="cards-wrapper">
                    <div className="cards-items">
                        {/* Here I will put the card component */}
                        <SingleService />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesCards