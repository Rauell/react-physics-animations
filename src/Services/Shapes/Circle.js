import Shape from './Shape';

class Circle extends Shape {
  constructor(props) {
    super(props);

    const { radius } = props;
    this.radius = radius || 0;
  }

  getRadius = () => this.radius;

  asObject() {
    const props = super.asObject();
    Object.assign(props, { radius: this.radius });
    return props;
  }
}

export default Circle;