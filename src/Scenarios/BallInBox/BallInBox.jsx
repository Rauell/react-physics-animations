import React, { Component } from 'react';
import Animation, { Circle as AnimationCircle } from '../../Animations'; 
import { ControlPane, AnimationPane } from '../../Components/Panes';
import { Circle, Rectangle } from '../../Services/Shapes';
import { didCircleCollideWithBoundingBox } from '../../Services/CollisionDetector/CollisionDetectionService';

class BallInBox extends Component {
  constructor(props) {
    super(props);

    const isRunning = false;
    const initialConditions = {
      x: 800,
      y: 40,
      vx: 250,
      vy: 0,
      radius: 40,
    };
    const circle = new Circle(initialConditions);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const boundingBox = new Rectangle({
      width,
      height,
      x: width/2,
      y: height/2,
    });
  
    this.state = {
      initialConditions,
      circle,
      isRunning,
      boundingBox,
    };
  }

  foo(frame){
    const { isRunning } = this.state
    if (!isRunning) return false;

    // console.log("Calling foo");
    const { circle, boundingBox } = this.state;
    let { x, y, vx, vy } = circle.asObject();
    // const { position, velocity } = circle;

    x += frame.timeDiff/1000 * vx;
    y += frame.timeDiff/1000 * vy;

    circle.setPosition(x, y);

    if (didCircleCollideWithBoundingBox(circle, boundingBox)) {
      console.log("past box")
      vx *= -1;
      circle.setVelocity(vx, vy);
    }

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
    const circle = Object.assign({}, initialConditions);
    this.setState({ circle });
  }

  render() {
    const { circle, boundingBox, isRunning } = this.state;
    const { x, y, radius } = circle;

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
          <Animation 
            isRunning={isRunning} 
            onFrameUpdate={(frame) => this.foo(frame)}
            width={boundingBox.getWidth()}
            height={boundingBox.getHeight()}
          >
            <AnimationCircle 
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