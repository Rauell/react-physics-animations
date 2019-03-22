import Vector from './Vector';

class Shape {
  constructor(props) {
    const {x, y, vx, vy} = props;

    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
  }
};

export default Shape;