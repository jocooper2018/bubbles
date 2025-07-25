import Vector2 from "./Vector2";
import { drawCircle } from "../utils/drawShapes";
import { GRAVITY, LIGHT_RANGE } from "../constants";
import Color from "./Color";
import { mousePosition } from "../globals";

export default class Bubble {
  // #region static things

  private static bubbles: Bubble[] = [];

  public static resetBubbles(): void {
    Bubble.bubbles = [];
  }

  public static updateCollisions(): void {
    for (const bubble of Bubble.bubbles) {
      bubble.colliding = false;
    }
    for (let i = 0; i < Bubble.bubbles.length; i++) {
      for (let j = i + 1; j < Bubble.bubbles.length; j++) {
        if (Bubble.colliding(Bubble.bubbles[i], Bubble.bubbles[j])) {
          Bubble.bubbles[i].colliding = true;
          Bubble.bubbles[j].colliding = true;
        }
      }
    }
  }

  public static colliding(a: Bubble, b: Bubble): boolean {
    return (
      Vector2.distanceBetween(a.position, b.position) <= a.radius + b.radius
    );
  }

  private static resolveCollisions(a: Bubble, b: Bubble): void {
    const xVelocityDiff = a.velocity.x - b.velocity.x;
    const yVelocityDiff = a.velocity.y - b.velocity.y;

    const xDist = b.position.x - a.position.x;
    const yDist = b.position.y - a.position.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      // Grab angle between the two colliding particles
      const angle = -Math.atan2(
        b.position.y - a.position.y,
        b.position.x - a.position.x
      );

      // Store mass in var for better readability in collision equation
      const m1 = a.mass;
      const m2 = b.mass;

      // Velocity before equation
      const u1 = a.velocity.rotate(angle);
      const u2 = b.velocity.rotate(angle);

      // Velocity after 1d collision equation
      const v1 = new Vector2(
        (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
        u1.y
      );

      const v2 = new Vector2(
        (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
        u2.y
      );

      // Final velocity after rotating axis back to original location
      const vFinal1 = v1.rotate(-angle);
      const vFinal2 = v2.rotate(-angle);

      // Swap a velocities for realistic bounce effect
      a.velocity = vFinal1;
      b.velocity = vFinal2;
    }
  }

  // #endregion
  // #region properties

  private readonly _context: CanvasRenderingContext2D;
  private _position: Vector2;
  private _radius: number;
  private _color: Color;
  private _velocity: Vector2;
  private _friction: number;
  private _colliding: boolean;

  // #endregion
  // #region constructor

  constructor(
    context: CanvasRenderingContext2D,
    position: Vector2,
    radius: number,
    color: Color,
    velocity: Vector2,
    friction: number
  ) {
    this._context = context;
    this._position = position;
    this._radius = radius;
    this._color = color;
    this._velocity = velocity;
    this._friction = friction;
    this._colliding = false;

    Bubble.bubbles.push(this);
  }

  // #endregion
  // #region getters setters

  private get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public get position(): Vector2 {
    return this._position;
  }
  private set position(value: Vector2) {
    this._position = value;
  }

  public get radius(): number {
    return this._radius;
  }

  public get color(): Color {
    return this._color;
  }

  public get velocity(): Vector2 {
    return this._velocity;
  }
  private set velocity(value: Vector2) {
    this._velocity = value;
  }

  public get friction(): number {
    return this._friction;
  }

  public get colliding(): boolean {
    return this._colliding;
  }
  private set colliding(value: boolean) {
    this._colliding = value;
  }

  public get mass(): number {
    return 1;
    // return (4 / 3) * Math.PI * Math.pow(this.radius, 3);
  }

  // #endregion
  // #region methods

  public update(): void {
    this.updatePosition();
    this.handleScreenEdgeCollision();
    this.handleCollisions();
  }

  public goTo(position: Vector2): void {
    this.position = position;
  }

  public draw(): void {
    const alpha: number | undefined = mousePosition
      ? Math.min(
          Math.max(
            (-(1 / LIGHT_RANGE) *
              Vector2.distanceBetween(this.position, mousePosition) +
              1) *
              0.75,
            0
          ),
          1
        )
      : undefined;
    drawCircle(
      this.context,
      this.position,
      this.radius,
      Color.rgba(
        this.color.red,
        this.color.green,
        this.color.blue,
        alpha ?? 0
      ).toString(),
      this.color.toString()
    );
  }

  private updatePosition() {
    this.velocity = Vector2.add(this.velocity, GRAVITY);
    this.position = Vector2.add(this.position, this.velocity);
  }

  private handleScreenEdgeCollision(): void {
    if (this.position.y + this.radius > window.innerHeight) {
      this.position = new Vector2(
        this.position.x,
        window.innerHeight - this.radius
      );
      this.velocity = new Vector2(
        this.velocity.x,
        -Math.abs(this.velocity.y)
      ).multiply(1 - this.friction);
    } else if (this.position.y - this.radius < 0) {
      this.position = new Vector2(this.position.x, this.radius);
      this.velocity = new Vector2(
        this.velocity.x,
        Math.abs(this.velocity.y)
      ).multiply(1 - this.friction);
    }
    if (this.position.x + this.radius > window.innerWidth) {
      this.position = new Vector2(
        window.innerWidth - this.radius,
        this.position.y
      );
      this.velocity = new Vector2(
        -Math.abs(this.velocity.x),
        this.velocity.y
      ).multiply(1 - this.friction);
    } else if (this.position.x - this.radius < 0) {
      this.position = new Vector2(this.radius, this.position.y);
      this.velocity = new Vector2(
        Math.abs(this.velocity.x),
        this.velocity.y
      ).multiply(1 - this.friction);
    }
  }

  private handleCollisions(): void {
    for (const bubble of Bubble.bubbles) {
      if (bubble === this) continue;
      if (Bubble.colliding(bubble, this)) {
        Bubble.resolveCollisions(this, bubble);
      }
    }
  }

  // #endregion
}
