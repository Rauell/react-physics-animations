import React from 'react';
import AnimationCircle from './AnimationCircle';

export const animationTypes = {
  'circle': 'circle'
};

const AnimationShape = props => {
  const { type } = props;

  switch(type) {
    case animationTypes.circle:
      return <AnimationCircle { ...props } />;
    default:
      return null;
  }
};

export default AnimationShape;

