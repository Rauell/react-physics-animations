import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const canvasWidth = 300;
const canvasHeight = 300;

class App extends Component {
  render() {
    return (
      <div className="App">
        <canvas width={canvasWidth} height={canvasHeight}/>
      </div>
    );
  }
}

export default App;
