import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import WebcamChooser from './components/WebcamChooser'
import WebcamCapture from './components/WebcamCapture'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={WebcamChooser} />
          <Route path="/capture/:deviceId" component={WebcamCapture} />

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
