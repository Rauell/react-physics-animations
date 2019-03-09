import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import BallInBox from './Scenarios/BallInBox/BallInBox.jsx';

const canvasWidth = 300;
const canvasHeight = 300;

class App extends Component {
  render() {
    return (
      <BallInBox />
    );
  }
}

export default App;
