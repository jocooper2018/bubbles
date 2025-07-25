export default class Color {
  // #region statics things

  public static get BLACK(): Color {
    return new Color(0, 0, 0);
  }
  public static get WHITE(): Color {
    return new Color(255, 255, 255);
  }
  public static get RED(): Color {
    return new Color(255, 0, 0);
  }
  public static get GREEN(): Color {
    return new Color(0, 255, 0);
  }
  public static get BLUE(): Color {
    return new Color(0, 0, 255);
  }
  public static get YELLOW(): Color {
    return new Color(255, 255, 0);
  }
  public static get CYAN(): Color {
    return new Color(0, 255, 255);
  }
  public static get MAGENTA(): Color {
    return new Color(255, 0, 255);
  }
  public static get ORANGE(): Color {
    return new Color(255, 165, 0);
  }

  public static rgb(red: number, green: number, blue: number): Color {
    return new Color(red, green, blue, 1);
  }

  public static rgba(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): Color {
    return new Color(red, green, blue, alpha);
  }

  public static hsl(hue: number, saturation: number, lightness: number): Color {
    let red, green, blue;
    if (saturation == 0) {
      red = green = blue = lightness; // achromatic
    } else {
      function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }
      let q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation;
      let p = 2 * lightness - q;
      red = hue2rgb(p, q, hue + 1 / 3);
      green = hue2rgb(p, q, hue);
      blue = hue2rgb(p, q, hue - 1 / 3);
    }

    return Color.rgb(red * 255, green * 255, blue * 255);
  }

  public static randomColor(): Color {
    return Color.hsl(Math.random(), 1, 0.5)
  }

  public static equals(a: Color, b: Color): boolean {
    return (
      a.red === b.red &&
      a.green === b.green &&
      a.blue === b.blue &&
      a.alpha === b.alpha
    );
  }

  // #endregion
  // #region constructor

  private _red: number;
  private _green: number;
  private _blue: number;
  private _alpha: number;

  constructor(red: number, green: number, blue: number, alpha?: number) {
    if (alpha === undefined) {
      alpha = 1;
    }
    if (
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255 ||
      alpha < 0 ||
      alpha > 1
    ) {
      throw new Error("Incorrect rgba values");
    }
    this._red = red;
    this._green = green;
    this._blue = blue;
    this._alpha = alpha;
  }

  // #endregion
  // #region getters

  public get red(): number {
    return this._red;
  }

  public get green(): number {
    return this._green;
  }

  public get blue(): number {
    return this._blue;
  }

  public get alpha(): number {
    return this._alpha;
  }

  // #endregion
  // #region methods

  public toString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  // #endregion
}
