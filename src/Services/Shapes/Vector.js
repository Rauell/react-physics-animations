class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  getX = () => this.x;
  setX = (x) => this.x = x;

  getY = () => this.y;
  setY = (y) => this.y = y;

  static add(a, b) {
    const x = a.x + b.x;
    const y = a.y + b.y;
    return new Vector(x, y);
  }

  static subtract(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return new Vector(x, y);
  }

  static magnitude(a) {
    const x2 = a.x * a.x;
    const y2 = a.y * a.y;
    return Math.sqrt(x2 + y2);
  }
}

export default Vector;