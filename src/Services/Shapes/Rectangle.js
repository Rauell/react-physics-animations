import Vector from './Vector';
import Shape from './Shape';

class Rectangle extends Shape {
  constructor(props) {
    super(props);
    
    const { height, width } = props;
    this._height = height || 0;
    this._width = width || 0;

    this._halfHeight = this._height * 0.5;
    this._halfWidth = this._width * 0.5;

    this._calculateBoundaries();
  }

  _calculateBoundaries = () => {
    const { x, y } = this.getPosition();
    const left = x - this._halfWidth;
    const right = x + this._halfWidth;
    const top = y - this._halfHeight;
    const bottom = y + this._halfHeight;

    this._edges = { left, right, top, bottom };
  }

  getHeight = () => this._height;
  setHeight = (height) => {
    this._height = height;
    this._halfHeight = height * 0.5;
    this._calculateBoundaries();
  }

  getWidth = () => this._width;
  setHeight = (width) => { 
    this._width = width;
    this._halfWidth = width * 0.5;
    this._calculateBoundaries();
  }

  getEdges = () => this._edges;

  _onPositionUpdate() {
    super._onPositionUpdate();
    this._calculateBoundaries()
  };

  asObject() {
    const props = super.asObject();
    Object.assign(props, { height: this._height, width: this._width });
    return props;
  }
}

export default Rectangle;