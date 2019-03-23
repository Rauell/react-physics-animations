import React, { Component } from 'react';
import Animation, { Circle as AnimationCircle } from '../../Animations'; 
import { ControlPane, AnimationPane } from '../../Components/Panes';
import { Circle, Rectangle } from '../../Services/Shapes';
import { ControlPosition, ControlVelocity } from '../../Components/Panes/ControlPane';

function getCollision(x, bound1, bound2) {
  let bound = null;
  let didCollisionOccur = false;

  if (x < bound1) {
    bound = bound1;
    didCollisionOccur = true;
  } else if (x > bound2) {
    bound = bound2;
    didCollisionOccur = true;
  }

  return { didCollisionOccur, bound };
}

function calculatePositionAfterCollision(x0, v0, dt, bound) {
  const x = 2*bound - dt*v0 - x0;
  return x;
}

class BallInBox extends Component {
  constructor(props) {
    super(props);

    const width = 800;
    const height = 550;
    const velocityMagnitudeTransform = 1000;

    const isRunning = false;
    const isPaused = false;
    const initialConditions = {
      x: 540,
      y: 40,
      vx: 150 / velocityMagnitudeTransform,
      vy: 100 / velocityMagnitudeTransform,
      radius: 40,
    };
    const circle = new Circle(initialConditions);
    const boundingBox = new Rectangle({
      width,
      height,
      x: width/2,
      y: height/2,
    });
    const interiorBox = new Rectangle({
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width - 2 * circle.radius,
      height: boundingBox.height - 2 * circle.radius,
    });
  
    this.state = {
      initialConditions,
      circle,
      isRunning,
      isPaused,
      boundingBox,
      interiorBox,
      velocityMagnitudeTransform,
    };
  }

  foo(frame){
    const { isRunning, isPaused } = this.state;
    const dt = frame.timeDiff;
    if (!isRunning || isPaused) return false;

    const { interiorBox: { left, right, top, bottom } } = this.state;
    let { circle: { x, y, vx, vy } } = this.state;

    x += vx * dt;
    y += vy * dt;

    const xCollision = getCollision(x, left, right);
    if (xCollision.didCollisionOccur) {
      x = calculatePositionAfterCollision(x, vx, dt, xCollision.bound);
      vx *= -1;
    }

    const yCollision = getCollision(y, top, bottom);
    if (yCollision.didCollisionOccur) {
      y = calculatePositionAfterCollision(y, vy, dt, yCollision.bound);
      vy *= -1;
    }

    this.setState({ circle : { ...this.state.circle, x, y, vx, vy } });
  }

  start = () => { 
    const isRunning = true;
    this.setState({ isRunning });
  }

  pause = () => {
    const isPaused = true;
    this.setState({ isPaused });
  }

  unPause = () => {
    const isPaused = false;
    this.setState({ isPaused });
  }

  reset = () => {
    const { initialConditions } = this.state;

    const isPaused = false;
    const isRunning = false;
    const circle = new Circle(initialConditions);

    this.setState({ circle, isPaused, isRunning });
  }

  updateInitialCondition = (value, prop, bound1, bound2) => {
    if (value < bound1) value = bound1;
    else if (value > bound2) value = bound2;
    this.setState({ 
      initialConditions: { ...this.state.initialConditions, [prop]: value}, 
      circle: { ...this.state.circle, [prop]: value}, 
    });
  }

  onInitialPositionChange = (event, prop, bound1, bound2) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;

    this.updateInitialCondition(value, prop, bound1, bound2);
  }

  onIntialVelocityChange = (event, prop) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;

    const bound = 10;
    const { velocityMagnitudeTransform } = this.state;
    this.updateInitialCondition(event.target.value / velocityMagnitudeTransform, prop, -bound, bound);
  }

  onInitialPositionXChange = (event) => {
    const { interiorBox: { left, right }} = this.state;
    this.onInitialPositionChange(event, 'x', left, right);
  }

  onInitialPositionYChange = (event) => {
    const { interiorBox: { top, bottom }} = this.state;
    this.onInitialPositionChange(event, 'y', top, bottom);
  }

  onIntialVelocityXChange = (event) => this.onIntialVelocityChange(event, 'vx'); 
  onIntialVelocityYChange = (event) => this.onIntialVelocityChange(event, 'vy'); 

  onDragMove = (event) => {
    const { x, y } = event.target.absolutePosition();

    this.onInitialPositionXChange({ target: { value: x } });
    this.onInitialPositionYChange({ target: { value: y } });
  }

  onDragMoveBounds = (position) => {
    let { x, y } = position;
    const { interiorBox: {left, right, top, bottom } } = this.state;

    const xCollision = getCollision(x, left, right);
    const yCollision = getCollision(y, top, bottom);

    if (xCollision.didCollisionOccur) x = xCollision.bound;
    if (yCollision.didCollisionOccur) y = yCollision.bound;

    return { x, y };
  }

  render() {
    const { 
      boundingBox, 
      isRunning,
      isPaused, 
      initialConditions, 
      velocityMagnitudeTransform, 
      circle: {x, y, radius} 
    } = this.state;

    return (
      <div className="scenario">
        <ControlPane
          onStartClick={this.start}
          onPauseClick={this.pause}
          onUnpauseClick={this.unPause}
          onResetClick={this.reset}
          isRunning={isRunning}
          isPaused={isPaused}
        >
          <ControlPosition
            isRunning={isRunning}
            x={initialConditions.x}
            y={initialConditions.y}
            onChangeX={this.onInitialPositionXChange}
            onChangeY={this.onInitialPositionYChange}
          />
          <br/>
          <ControlVelocity
            isRunning={isRunning}
            vx={initialConditions.vx * velocityMagnitudeTransform}
            vy={initialConditions.vy * velocityMagnitudeTransform}
            onChangeX={this.onIntialVelocityXChange}
            onChangeY={this.onIntialVelocityYChange}
          />
        </ControlPane>
      
        <AnimationPane>
          <Animation 
            isRunning={isRunning} 
            onFrameUpdate={(frame) => this.foo(frame)}
            width={boundingBox.width}
            height={boundingBox.height}
          >
            <AnimationCircle 
              fill="green" 
              radius={radius}
              x={x}
              y={y}
              draggable={!isRunning}
              onDragMove={this.onDragMove}
              dragBoundFunc={this.onDragMoveBounds}
            />
          </Animation>
        </AnimationPane>
      </div>
    );
  }
}

export default BallInBox;