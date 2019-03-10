import React, { Component } from 'react';
import Animation, { Circle } from '../../Animations'; 
import { ControlPane, AnimationPane } from '../../Components/Panes';
 
class BallInBox extends Component {
  constructor(props) {
    super(props);

    const isRunning = false;
    const initialConditions = {
      x: 25,
      y: 40,
      vx: 25,
      vy: 0,
      radius: 40,
    };
    const circle = Object.assign({}, initialConditions);
  
    this.state = {
      initialConditions,
      circle,
      isRunning,
    };
  }

  foo(frame){
    const { isRunning } = this.state
    if (!isRunning) return false;

    // console.log("Calling foo");
    const { circle } = this.state;
    // const { position, velocity } = circle;

    circle.x += frame.timeDiff/1000 * circle.vx;
    circle.y += frame.timeDiff/1000 * circle.vy;

    this.setState({ circle });

    // console.log(frame.time);
  }

  start = () => { 
    const isRunning = true;
    this.setState({ isRunning });
  }

  stop = () => {
    const isRunning = false;
    this.setState({ isRunning });
  }

  reset = () => {
    const { initialConditions } = this.state;
    this.setState({ circle: initialConditions });
  }

  render() {
    const { circle, isRunning } = this.state;
    const {x, y, radius} = circle;

    return (
      <div>
        <ControlPane>
          <button onClick={this.start}>
            Start
          </button>
          <button onClick={this.stop}>
            Stop
          </button>
          <button onClick={this.reset}>
            Reset
          </button>
        </ControlPane>
      
        <AnimationPane>
          <Animation isRunning={isRunning} onFrameUpdate={(frame) => this.foo(frame)}>
            <Circle 
              fill="green" 
              radius={radius}
              x={x}
              y={y} 
            />
          </Animation>
        </AnimationPane>
      </div>
    );
  }
}

export default BallInBox;