import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlPane, AnimationPane } from '../../Components/Panes';
import { ControlTab } from '../../Components/Panes/ControlPane';
import { AnimationShape } from '../../Animations/Shapes'; 

class Scenario extends Component {
  constructor(props){
    super(props);

    const isRunning = false;
    const isPaused = false;

    this.state = {
      isRunning,
      isPaused,
    }
  }

  onFrameUpdate = frame => {
    const { isRunning, isPaused } = this.state;
    if (!isRunning || isPaused) return false;

    const { onFrameUpdate } = this.props;

    onFrameUpdate(frame);
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
    const { onReset } = this.props;

    onReset();

    const isPaused = false;
    const isRunning = false;

    this.setState({ isPaused, isRunning });
  }

  render() {
    const { isRunning, isPaused } = this.state;
    const { shapes, height, width } = this.props;

    const controlTabs = shapes.map( (shape, index) => {
      const { initialProps, initialEvents } = shape;
      
      return (
        <ControlTab 
          key={index}
          isRunning={isRunning}
          { ...initialProps }
          { ...initialEvents }
        />
      );
    });

    const animations = shapes.map( (shape, index) => {
      const { onDragMove, type } = shape;
      const draggable = !isRunning && onDragMove;
      
      return (
        <AnimationShape 
          key={index}
          type={type}
          draggable={draggable}
          { ...shape.props } 
        />
      );
    });

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
          {controlTabs}
        </ControlPane>

        <AnimationPane
          isRunning={isRunning} 
          onFrameUpdate={this.onFrameUpdate}
          width={width}
          height={height}
        >
          {animations}            
        </AnimationPane>
      </div>
    );
  }
}

Scenario.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  shapes: PropTypes.array,
  onReset: PropTypes.func,
  onFrameUpdate: PropTypes.func,
};

Scenario.defaultProps = {
  shapes: [],
  onReset: () => {},
  onFrameUpdate: () => {},
};

export default Scenario;