
import './App.css';
// import React from 'react';
import Admin from "./Components/Admin";
import {Main} from "./Components/Main"
import {Switch, Link, Route} from "react-router-dom";

function App() {

 
  return (
    <div>
      <Switch>
        <>
          <Link to = "/">Home</Link>
          <Link to = "/admin">Admin Panel</Link>
        </>
        <Route exact path = "/"><Main /></Route>
        <Route path = "/admin"><Admin /></Route>
      </Switch>
      {/* <Admin></Admin>
      <Main /> */}
    </div>
  );
}

export default App;
