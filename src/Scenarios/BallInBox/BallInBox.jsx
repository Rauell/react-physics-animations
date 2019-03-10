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
      vx: 2500 / 1000,
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
    const { isRunning, circle, boundingBox  } = this.state
    if (!isRunning) return false;

    const circleProps = circle.asObject();
    const { x, y, vx, vy, radius } = circleProps;
    let {left, right, top, bottom } = boundingBox.getEdges();
    left += radius;
    right -= radius;

    let newVx = vx;
    let newVy = vy;

    let newX = x + frame.timeDiff * vx;
    let newY = y + frame.timeDiff * vy;
    let impactTime;

    if (newX < left) {
      impactTime = (left - x) / vx;
      newX = left - (frame.timeDiff - impactTime) * vx;
      newVx *= -1;
    } else if (newX > right) {
      impactTime = (right - x) / vx;
      newX = right - (frame.timeDiff - impactTime) * vx;
      newVx *= -1;
    }

    circle.setVelocity(newVx, newVy);
    circle.setPosition(newX, newY);

    this.setState({ circle });
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