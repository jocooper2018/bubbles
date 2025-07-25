import type Vector2 from "../classes/Vector2";

export const drawCircle = (
  context: CanvasRenderingContext2D,
  position: Vector2,
  radius: number,
  fillStyle: string,
  strokeStyle: string
): void => {
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, Math.PI * 2, false);
  if (fillStyle !== "transparent") {
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle !== "transparent") {
    context.strokeStyle = strokeStyle;
    context.lineWidth = 3
    context.stroke();
  }
};
