// import { Vector, Circle, Rectangle } from '../Shapes';
import Collision from './Collision';

export function didCircleCollideWithBoundingBox(circle, box) {
  const { x, radius} = circle.asObject();
  const boxEdges = box.getEdges();
  // const { left, right, top, bottom } = box;

  const left = x - radius;
  const right = x + radius;

  console.log({right, boxRight: boxEdges.right});

  if (left < boxEdges.left) return true;
  if (right > boxEdges.right) return true;

  return false;
}
