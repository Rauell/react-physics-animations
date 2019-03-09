import React, { Component } from 'react';
import Animation, { Circle } from '../../Animations'; 

 
class BallInBox extends Component {
  foo(){
    return 5;
  }
  render() {
    return (
      <Animation onFrameUpdate={this.foo}>
        <Circle 
          fill="green" 
          radius="40" 
          x="50" 
          y="50" 
        />
      </Animation>
    );
  }
}

export default BallInBox;