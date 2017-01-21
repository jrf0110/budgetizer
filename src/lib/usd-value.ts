export class USDValue {
  /**
   * Decimal adjustment of a number.
   *
   * @param type  The type of adjustment.
   * @param value The number.
   * @param exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns The adjusted value.
   */
  public static decimalAdjust = function(type: string, value: any, exp?: number) {
    // If the exp is undefined or zero...
    const mathType = (<any> Math)[type]

    if (typeof exp === 'undefined' || +exp === 0) {
      return mathType(value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = mathType(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  public static round10(value: number) {
    return USDValue.decimalAdjust('round', value, -2)
  }

  private _pennies: number

  constructor(pennies?: number) {
    this._pennies = pennies || 0
  }

  pennies(): number
  pennies(val: number): USDValue
  pennies(val?: number): any {
    if (!val) return this.toPennies();
    return new USDValue(val);
  }

  dollars(): string
  dollars(val: string): USDValue
  dollars(val?: string): any {
    if (!val && val != "0") return this.toDollars();

    const result = Math.round(parseFloat(val) * 100);

    if (isNaN(result)){
      throw new Error('Invalid dollars value');
    }

    return this.pennies(result)
  }

  toDollarsNoCents(): string {
    // parse as float incase of partial cents
    var pennies = parseFloat(this._pennies.toString());

    if ( isNaN( pennies ) ){
      return '0';
    }

    return USDValue
      .round10(pennies / 100)
      .toFixed(2)
      .split('.')[0];
  }

  toDollars(): string {
    // parse as float incase of partial cents
    var pennies = parseFloat(this._pennies.toString());

    if (isNaN(pennies)){
      return '0';
    }

    return USDValue.round10(pennies / 100).toFixed(2);
  }

  toPennies(){
    return this._pennies;
  }

  valueOf(){
    return this.toPennies();
  }
}