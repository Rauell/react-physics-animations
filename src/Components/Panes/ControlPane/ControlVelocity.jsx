import React from 'react'; 
import PropTypes from 'prop-types';
import ControlInput from './ControlInput';

const ControlVelocity = props => {
  const { isRunning, vx, vy, onChangeVx, onChangeVy } = props;
  
  const xDot = '\u1E8A';
  const yDot = '\u1E8E';

  return (
    <div className="control-input__position">
      <label className="control-input__velocity-header">
        Initial Velocity
      </label>
      <ControlInput 
        type="number"
        step="1"
        isRunning={isRunning}
        value={vx}
        label={xDot}
        onChange={onChangeVx}
      />
      <ControlInput 
        type="number"
        step="1"
        isRunning={isRunning}
        value={vy}
        label={yDot}
        onChange={onChangeVy}
      />
    </div>
  );
}

ControlVelocity.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onChangeX: PropTypes.func,
  onChnageY: PropTypes.func
};

export default ControlVelocity;
