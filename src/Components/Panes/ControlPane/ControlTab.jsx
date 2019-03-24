import React from 'react'; 
import PropTypes from 'prop-types';
import ControlPosition from './ControlPosition';
import ControlVelocity from './ControlVelocity';

const ControlTab = props => {
  const {
    isRunning,
    x,
    y,
    vx, 
    vy, 
    onChangePositionX,
    onChangePositionY,
    onChangeVelocityX,
    onChangeVelocityY
  } = props;

  return (
    <div className="control-input__tab">
      <ControlPosition
        isRunning={isRunning}
        x={x}
        y={y}
        onChangeX={onChangePositionX}
        onChangeY={onChangePositionY}
      />
      <br/>
      <ControlVelocity
        isRunning={isRunning}
        vx={vx}
        vy={vy}
        onChangeVx={onChangeVelocityX}
        onChangeVy={onChangeVelocityY}
      />
    </div>
  );
}

ControlTab.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  vx: PropTypes.number.isRequired,
  vy: PropTypes.number.isRequired,
  onChangePositionX: PropTypes.func.isRequired,
  onChangePositionY: PropTypes.func.isRequired,
  onChangeVelocityX: PropTypes.func.isRequired,
  onChangeVelocityY: PropTypes.func.isRequired,
};

export default ControlTab;