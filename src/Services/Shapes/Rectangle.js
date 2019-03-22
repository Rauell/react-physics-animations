import Shape from './Shape';

export function calculateEdges(x, y, height, width) {
  const left = x - width * 0.5;
  const right = left + width;
  const top = y - height * 0.5;
  const bottom = top + height;

  return { left, right, top, bottom };
}

class Rectangle extends Shape {
  constructor(props) {
    super(props);
    
    const { height, width } = props;
    this.height = height || 0;
    this.width = width || 0;

    const { left, right, top, bottom } = calculateEdges(this.x, this.y, this.height, this.width);

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
}

export default Rectangle;