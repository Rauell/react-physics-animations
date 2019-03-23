import React from 'react'; 
import PropTypes from 'prop-types';
import ControlInput from './ControlInput';

const ControlPosition = props => {
  const { isRunning, x, y, onChangeX, onChangeY } = props;
  
  return (
    <div className="control-input__position">
      <label className="control-input__position-header">
        Initial Position
      </label>
      <ControlInput 
        type="number"
        step="1"
        isRunning={isRunning}
        value={x}
        label="X"
        onChange={onChangeX}
      />
      <ControlInput 
        type="number"
        step="1"
        isRunning={isRunning}
        value={y}
        label="Y"
        onChange={onChangeY}
      />
    </div>
  );
}

ControlPosition.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onChangeX: PropTypes.func,
  onChnageY: PropTypes.func
};

export default ControlPosition;
