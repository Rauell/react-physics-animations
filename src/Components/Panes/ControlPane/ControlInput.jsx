import React from 'react'; 
import PropTypes from 'prop-types';

const ControlInput = props => {
  const { 
    type, 
    value, 
    isRunning, 
    label,
    onChange,
    step,
  } = props;

  return (
    <div className="control-input__group">
      {label ? (
        <label className="control-input__label">
          {label}
        </label>
      ) : null}

      <input 
        className="control-input__input"
        type={type}
        disabled={isRunning}
        value={value}
        onChange={onChange}
        step={step}
      />
    </div>
  );
}

ControlInput.propTypes = {
  value: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  isRunning: PropTypes.bool,
  label: PropTypes.string,
  step: PropTypes.number,
  onChange: PropTypes.func,
};

ControlInput.defaultProps = {
  isRunning: true,
  step: null,
  onChange: null,
};


export default ControlInput;
