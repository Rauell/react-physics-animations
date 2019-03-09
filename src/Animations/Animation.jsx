import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';

class Animation extends Component {
  componentDidMount() {
    const animation = new Konva.Animation(frame =>{
      this.props.onFrameUpdate(frame);
    }, this.layer);

    animation.start();
  }

  render() {
    return (
      <Stage width={this.props.width} height={this.props.height}>
        <Layer ref="layer">
          {this.props.children}
        </Layer>
      </Stage>
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
};

export default Animation;