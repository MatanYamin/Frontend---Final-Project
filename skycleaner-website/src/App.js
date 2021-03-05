import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//BrowserRouter is used for doing client side routing
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
