import React, { Component } from 'react';
import { getCircleModel, getRectangleModel } from '../../Models/Shapes/Shapes';
import Scenario from '../Scenario/Scenario';

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

    const initialConditions = {
      x: 540,
      y: 40,
      vx: 150,
      vy: 100,
      radius: 40,
    };

    const circle = {
      type: 'circle',
      props: getCircleModel(initialConditions),
      initialProps: getCircleModel(initialConditions),
      initialEvents: {
        onChangePositionX: this.onInitialPositionXChange,
        onChangePositionY: this.onInitialPositionYChange,
        onChangeVelocityX: this.onInitialVelocityXChange,
        onChangeVelocityY: this.onInitialVelocityYChange,
      }
    };

    const boundingBox = new getRectangleModel({
      width,
      height,
      x: width/2,
      y: height/2,
    });
  
    this.state = {
      initialConditions,
      circle,
      boundingBox,
    };
  }

  foo = frame => {
    const dt = frame.timeDiff / 1000;

    const { 
      boundingBox: { left, right, top, bottom }, 
      circle,
    } = this.state;
    const { props } = circle; 
    let { x, y, vx, vy } = props;

    x += vx * dt;
    y += vy * dt;

    const xCollision = getCollision(x, left + props.radius, right - props.radius);
    if (xCollision.didCollisionOccur) {
      x = calculatePositionAfterCollision(x, vx, dt, xCollision.bound);
      vx *= -1;
    }

    const yCollision = getCollision(y, top + props.radius, bottom - props.radius);
    if (yCollision.didCollisionOccur) {
      y = calculatePositionAfterCollision(y, vy, dt, yCollision.bound);
      vy *= -1;
    }

    const newProps = getCircleModel({...props, x, y, vx, vy});

    this.setState({ circle: { ...circle, props: newProps } });
  }

  reset = () => {
    const { circle } = this.state;
    const props = { ...circle.initialProps };

    this.setState({ circle: { ...circle, props } });
  }

  updateInitialCondition = (value, prop, bound1, bound2) => {
    if (value < bound1) value = bound1;
    else if (value > bound2) value = bound2;
    this.setState({
      circle: { 
        ...this.state.circle,
        initialProps: { ...this.state.circle.initialProps, [prop]: value}, 
        props: { ...this.state.circle.props, [prop]: value}, 
      },
    });
  }

  onInitialPositionChange = (event, prop, bound1, bound2) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;

    const { radius } = this.state.circle.props;
    this.updateInitialCondition(value, prop, bound1 + radius, bound2 - radius);
  }

  onIntialVelocityChange = (event, prop) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;

    const bound = 1000;
    this.updateInitialCondition(event.target.value, prop, -bound, bound);
  }

  onInitialPositionXChange = (event) => {
    const { boundingBox: { left, right }} = this.state;
    this.onInitialPositionChange(event, 'x', left, right);
  }

  onInitialPositionYChange = (event) => {
    const { boundingBox: { top, bottom }} = this.state;
    this.onInitialPositionChange(event, 'y', top, bottom);
  }

  onInitialVelocityXChange = (event) => this.onIntialVelocityChange(event, 'vx'); 
  onInitialVelocityYChange = (event) => this.onIntialVelocityChange(event, 'vy'); 

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
      circle,
    } = this.state;

    return (
      <Scenario 
        shapes={[circle]}
        height={boundingBox.height}
        width={boundingBox.width}
        onFrameUpdate={this.foo}
        onReset={this.reset}
      />
    );
  }
}

export default BallInBox;