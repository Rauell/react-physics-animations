import React from 'react'; 
import PropTypes from 'prop-types';
import ControlButton from './ControlButton';

const ControlPane = props => {
  const { 
    onStartClick, 
    onResetClick, 
    onPauseClick,
    onUnpauseClick,
    isRunning,
    isPaused,
  } = props;

  let buttonData;
  
  if (isRunning) {
    
    let pauseText;
    let pauseMethod;
    
    if (isPaused) {
      pauseText = 'Resume';
      pauseMethod = onUnpauseClick;
    } else {
      pauseText = 'Pause';
      pauseMethod = onPauseClick;
    }

    buttonData = [
      {text: pauseText, onClick: pauseMethod},
      {text: 'Reset', onClick: onResetClick},
    ] 
  } else {
    buttonData = [
      {text: 'Start', onClick: onStartClick},
    ];
  }

  const buttons = buttonData.map((button) => (
    <ControlButton onClick={button.onClick} key={button.text}>
      {button.text}
    </ControlButton>
  ));

  return (
    <div className="pane pane-control">
      <div className="pane-main-buttons">
        {buttons}
      </div>
      <hr/>
      {props.children}
    </div>
  );
};

ControlPane.propTypes = {
  onStartClick: PropTypes.func.isRequired,
  onUnpauseClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
};

export default ControlPane;