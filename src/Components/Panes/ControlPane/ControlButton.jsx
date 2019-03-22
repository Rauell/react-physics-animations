import React from 'react'; 
import PropTypes from 'prop-types';

const ControlButton = props => {
  const { onClick } = props;

  return (
    <button className="pane-control-button" onClick={onClick}>
      {props.children}
    </button>
  );
};

ControlButton.propTypes = {
  onClick: PropTypes.func
};

export default ControlButton;