import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import WebcamChooser from './components/WebcamChooser'
import MainPage from './components/MainPage'

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
      <Router>
        <Switch>
          <Route path="/" exact component={WebcamChooser} />
          <Route path="/capture/:deviceId" component={MainPage} />

          <Route component={BadRouteComponent} />
          <WebcamChooser />
        </Switch>
      </Router>
    </div>
  );
}

function BadRouteComponent() {
  return (<div>Wrong URL!</div>)
}

export default App;
