import { pythagoras } from "../utils/maths";

export default class Vector2 {
  // #region static properties

  public static get ZERO(): Vector2 {
    return new Vector2(0, 0);
  }
  public static get TOP(): Vector2 {
    return new Vector2(0, -1);
  }
  public static get BOTTOM(): Vector2 {
    return new Vector2(0, 1);
  }
  public static get LEFT(): Vector2 {
    return new Vector2(-1, 0);
  }
  public static get RIGHT(): Vector2 {
    return new Vector2(1, 0);
  }
  public static get TOP_LEFT(): Vector2 {
    return new Vector2(-1, -1).normalized;
  }
  public static get TOP_RIGHT(): Vector2 {
    return new Vector2(1, -1).normalized;
  }
  public static get BOTTOM_LEFT(): Vector2 {
    return new Vector2(-1, 1).normalized;
  }
  public static get BOTTOM_RIGHT(): Vector2 {
    return new Vector2(1, 1).normalized;
  }

  // #endregion
  // #region static methods

  public static add(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  public static equals(a: Vector2, b: Vector2): boolean {
    return a.x === b.x && a.y === b.y;
  }

  public static random(): Vector2 {
    return new Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
  }

  public static distanceBetween(a: Vector2, b: Vector2) {
    return pythagoras(b.x - a.x, b.y - a.y);
  }

  // #endregion
  // #region properties & constructor

  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  // #endregion
  // #region getters setters

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get norm(): number {
    return pythagoras(this.x, this.y);
  }

  public get normalized(): Vector2 {
    if (this.norm === 0) {
      return Vector2.ZERO;
    }
    return this.divide(this.norm);
  }

  // #endregion
  // #region methods

  public add(other: Vector2): Vector2 {
    return Vector2.add(this, other);
  }

  public multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  public divide(scalar: number): Vector2 {
    if (scalar === 0) {
      throw new Error("Division by zero");
    }
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  public opposite(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  public equals(other: Vector2): boolean {
    return Vector2.equals(this, other);
  }

  public rotate(angle: number): Vector2 {
    return new Vector2(
        this.x * Math.cos(angle) - this.y * Math.sin(angle),
        this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }

  // endregion
}
