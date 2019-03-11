import React, { Component } from 'react';
import Animation, { Circle as AnimationCircle } from '../../Animations'; 
import { ControlPane, AnimationPane } from '../../Components/Panes';
import { Circle, Rectangle } from '../../Services/Shapes';

function calculatePositionWithBoundaryCollision(x0, v0, dt, bound1, bound2) {
  let x = x0 + v0 * dt;
  let v = v0;
  let didCollisionOccur = false;
  let bound = null;

  if (x < bound1) {
    didCollisionOccur = true;
    bound = bound1;
  } else if (x > bound2) {
    didCollisionOccur = true;
    bound = bound2;
  }

  if (didCollisionOccur) {
    x = 2 * bound - dt * v0 - x0;
    v *= -1;
  }

  return { x, x0, v, v0, didCollisionOccur };
}

class BallInBox extends Component {
  constructor(props) {
    super(props);

    const isRunning = false;
    const initialConditions = {
      x: 800,
      y: 40,
      vx: 250 / 1000,
      vy: 300 / 1000,
      radius: 40,
    };
    const circle = new Circle(initialConditions);

    // const width = window.innerWidth;
    // const height = window.innerHeight;

    const width = 800;
    const height = 600;

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
    top += radius;
    right -= radius;
    bottom -= radius;

    const xUpdate = calculatePositionWithBoundaryCollision(x, vx, frame.timeDiff, left, right);
    const yUpdate = calculatePositionWithBoundaryCollision(y, vy, frame.timeDiff, top, bottom);

    circle.setPosition(xUpdate.x, yUpdate.x);

    if (xUpdate.didCollisionOccur || yUpdate.didCollisionOccur) {
      circle.setVelocity(xUpdate.v, yUpdate.v);
    }

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
    const circle = new Circle(initialConditions);
    this.setState({ circle });
  }

  render() {
    const { circle, boundingBox, isRunning } = this.state;
    const { x, y, radius } = circle;
    const styleProps = {
    };

    const controlButton = isRunning ? (
      <button onClick={this.stop}>
        Stop
      </button>
    ) : (
      <button onClick={this.start}>
        Start
      </button>
    );

    return (
      <div className="scenario">
        <ControlPane>
          { isRunning ? (
            <button onClick={this.stop}>
              Stop
            </button>
          ) : (
            <button onClick={this.start}>
              Start
            </button>
          ) }
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
            styles={styleProps}
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