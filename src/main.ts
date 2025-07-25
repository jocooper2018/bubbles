import "./style.css";
import Bubble from "./classes/Bubble";
import Color from "./classes/Color";
import Vector2 from "./classes/Vector2";
import {
  BUBBLES_NUMBER_ON_FULL_HD_SCREEN,
  FRICTION,
  MAX_BUBBLES_SIZE,
  MAX_SPEED,
  MIN_BUBBLES_SIZE,
  PIXELS_NUMBER_ON_FULL_HD_SCREEN,
} from "./constants";
import { randFloat, randomPosition } from "./utils/random";

const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
if (canvas === null) {
  throw new Error("Canvas is null");
}
const context = canvas.getContext("2d");
if (context === null) {
  throw new Error("Canvas context is null");
}

let bubbles: Bubble[];

const init = (): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bubblesNumber: number = Math.round(
    (BUBBLES_NUMBER_ON_FULL_HD_SCREEN / PIXELS_NUMBER_ON_FULL_HD_SCREEN) *
      (window.innerHeight * window.innerWidth)
  );

  Bubble.resetBubbles();
  bubbles = [];
  for (let i = 0; i < bubblesNumber; i++) {
    const radius: number = randFloat(MIN_BUBBLES_SIZE, MAX_BUBBLES_SIZE);
    const bubble: Bubble = new Bubble(
      context,
      Vector2.ZERO,
      radius,
      Color.randomColor(),
      Vector2.random().multiply(MAX_SPEED),
      FRICTION
    );
    let ok: boolean = false;
    do {
      bubble.goTo(randomPosition(radius, radius));
      Bubble.updateCollisions();
      if (!bubble.colliding) {
        ok = true;
      }
    } while (!ok);
    bubbles.push(bubble);
  }
  bubbles.sort((a, b) => b.radius - a.radius);
};

const animate = (): void => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const bubble of bubbles) {
    bubble.update();
    bubble.draw();
  }
  Bubble.updateCollisions();
};

window.addEventListener("resize", init);
window.addEventListener("click", init);

init();
animate();
