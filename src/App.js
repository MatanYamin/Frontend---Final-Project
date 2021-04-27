import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
//BrowserRouter is used for doing client side routing
import './App.css';
import Home from "./components/pages/Home"
import Cars from "./components/pages/Cars"
import Furniture from "./components/pages/Furniture"
import Rugs from "./components/pages/Rugs"
import Chairs from "./components/pages/Chairs"
import Mattress from "./components/pages/Mattress"
import AdminLogin from "./components/AdminLogin"
import Contact from "./components/pages/Contact"
import About from "./components/pages/About"
import SOS from "./components/pages/SOS"
import ShowBookings from "./components/ShowBookings"
//App will execute the program. Adding routes for pages in th e website
//I built a few components that help us route in the website
//The name Clean1 - Clean5 will alter in the future
function App() {
  return (
    <>
      <Router>
      <Navbar />
      <Switch>
        {/* Home holds all the main components. "middle section, servicesCards and footer" */}
        <Route path='/' exact component={Home} />
        <Route path='/Cars' component={Cars} />
        <Route path='/Furniture' component={Furniture} />
        <Route path='/Rugs' component={Rugs} />
        <Route path='/Chairs' component={Chairs} />
        <Route path='/Mattress' component={Mattress} />
        <Route path='/Contact' component={Contact} />
        <Route path='/About' component={About} />
        <Route path='/AdminLogin' component={AdminLogin} />
        <Route path='/SOS' component={SOS} />
      </Switch>
      </Router>
        <BrowserRouter>
          <Route path='/AdminLogin/ShowBookings' component={ShowBookings} />
        </BrowserRouter>
    </>
  );
}

export default App;