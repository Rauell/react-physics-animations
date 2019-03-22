import Shape from './Shape';

class Circle extends Shape {
  constructor(props) {
    super(props);

    const { radius } = props;
    this.radius = radius || 0;
  }

  getRadius = () => this.radius;
}

export default Circle;