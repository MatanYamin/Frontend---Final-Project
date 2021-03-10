import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//BrowserRouter is used for doing client side routing
import './App.css';
import Home from "./components/pages/Home"
import Clean1 from "./components/pages/Clean1"
import Clean2 from "./components/pages/Clean2"
import Clean3 from "./components/pages/Clean3"
import Clean4 from "./components/pages/Clean4"
import Clean5 from "./components/pages/Clean5"
import Admin from "./components/pages/Admin"
import AdminLogin from "./components/pages/AdminLogin"
import Contact from "./components/pages/Contact"

//App will execute the program
//I built a few components that help us route in the website
//The name Clean1 - Clean5 will alter in the future
function App() {
  return (
    <>
      <Router>
      <Navbar />
      <Switch>
        {/* <Home /> */}
        <Route path='/' exact component={Home} /> 
        <Route path='/Clean1' component={Clean1} />
        <Route path='/clean2' component={Clean2} />
        <Route path='/clean3' component={Clean3} />
        <Route path='/clean4' component={Clean4} />
        <Route path='/clean5' component={Clean5} />
        <Route path='/Contact' component={Contact} />
        <Route path='/AdminLogin' component={AdminLogin} />
        <Route path='/Admin' component={Admin} />
      </Switch>
      </Router>
    </>
  );
}

export default App;