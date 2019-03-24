import React from 'react';
import PropTypes from 'prop-types';
import AnimationCanvas from '../../Animations'

const AnimationPane = (props) => {
  const { onFrameUpdate, isRunning, width, height } = props;
  
  return (
    <div className="pane pane-animation">
      <AnimationCanvas
        isRunning={isRunning} 
        onFrameUpdate={onFrameUpdate}
        width={width}
        height={height}
      >
        {props.children}
      </AnimationCanvas>
    </div>
  );
};

AnimationPane.propTypes= {
  isRunning: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onFrameUpdate: PropTypes.func,
};

export default AnimationPane;