import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';

class Animation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: null
    };
  }

  componentDidMount() {
    const animation = new Konva.Animation(frame =>{
      this.props.onFrameUpdate(frame);
    }, this.layer);

    this.setState({ animation });
  }

  startAnimation = () => {
    const { animation } = this.state;
    animation.start();
  }

  stopAnimation = () => {
    const { animation } = this.state;
    if (animation) animation.stop();
  }

  toggleAnimation = (isRunning) => {
    isRunning ? this.startAnimation() : this.stopAnimation();
  }

  componentWillUnmount(){
    this.stopAnimation();
  }

  render() {
    const { isRunning, width, height, children} = this.props;
    this.toggleAnimation(isRunning);

    const stageStyles = { width, height };

    return (
      <div className="animation">
        <Stage 
          className="fooBar"
          style={stageStyles}
          width={width} 
          height={height}
        >
          <Layer className="baz" ref="layer">
            {children}
          </Layer>
        </Stage>
      </div>
    );
  }
}

Animation.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

Animation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  onFrameUpdate: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired, 
};

export default Animation;