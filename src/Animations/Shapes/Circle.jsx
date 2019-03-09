import React from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Circle as KonvaCircle } from 'react-konva';


const Circle = props => (
  <KonvaCircle {...props} />
);

export default Circle;
