import Vector from './Vector';

class Shape {
  constructor(props) {
    const {x, y, vx, vy} = props;
    this._position = new Vector(x, y);
    this._velocity = new Vector(vx, vy);
  }

  asObject() {
    return {
      x: this._position.getX(),
      y: this._position.getY(),
      vx: this._velocity.getX(),
      vy: this._velocity.getY(),
    };
  }

  getPosition = () => this._position;
  setPosition = (x, y) => {
    this._position.setX(x);
    this._position.setY(y);
    this._onPositionUpdate();
  }

  getVelocity = () => this._velocity;
  setVelocity = (vx, vy) => {
    this._velocity.setX(vx);
    this._velocity.setY(vy);
    this._onVelocityUpdate();
  }

  _onPositionUpdate() {
    this.x = this._position.x;
    this.y = this._position.y; 
  };

  _onVelocityUpdate() {
    this.vx = this._velocity.x;
    this.vy = this._velocity.y; 
  };
};

export default Shape;