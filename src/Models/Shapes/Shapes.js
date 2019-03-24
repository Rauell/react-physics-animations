function getShapeModel({
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  fill = 'blue',
}) {
  return {
    x,
    y,
    vx,
    vy,
    left,
    right,
    top,
    bottom,
    fill,
  };
};

export function calculateCircleProps( x, y, radius ) {
  return {
    radius: radius,
    left: x - radius,
    right: x + radius,
    top: y - radius,
    bottom: y + radius,
  };
}

export function getCircleModel({ x, y, radius, ...props }) {
  const circleModel = getShapeModel({ x, y, ...props });
  const circleProps = calculateCircleProps(x, y, radius);
  
  Object.assign(circleModel, circleProps);

  return circleModel;
}

export function calculateRectangleProps( x, y, width, height ) {
  const left = x - width*0.5;
  const right = left + width;
  const top = y - height*0.5;
  const bottom = top + height;

  return { left, right, top, bottom, width, height };
}

export function getRectangleModel({ x, y, width, height, ...props }) {
  const rectangleModel = getShapeModel( {x, y, ...props });
  const rectangleProps = calculateRectangleProps(x, y, width, height);

  Object.assign(rectangleModel, rectangleProps);

  return rectangleModel;
}

