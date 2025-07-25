import Vector2 from "./classes/Vector2";

export var mousePosition: Vector2 | undefined = undefined;

window.addEventListener("mousemove", (event) => {
  mousePosition = new Vector2(event.x, event.y);
});

window.addEventListener("mouseout", () => {
  mousePosition = undefined;
});
