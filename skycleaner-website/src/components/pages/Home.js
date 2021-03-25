import "../../App.css"
import MiddleSection from "../MiddleSection"
import React from "react"
import ServicesCards from "../ServicesCards"
import Footer from "../Footer"


//Home will hold the main components
function Home() {
    return(
        <>
        {/*Middle Section is the first thing the user sees*/}
        <MiddleSection />
        {/* ServicesCards holds all the services the buisness offers
        inside of it, will be every single service */}
        <ServicesCards />
        <Footer />
        </>
    )
}

export default Home