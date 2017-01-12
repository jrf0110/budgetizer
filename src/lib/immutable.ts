/**
 * Creates an object with immutable helper methods. It is
 * expected that implementors of an Immutable class will
 * implement their own `clone()` method as this is usually
 * specific to each object type
 */
export class Immutable {
  /**
   * Create an instance of @Immutable
   * @param  {Object} options Options passed to instance
   * @return {Immutable}       
   */
  static create(...args: any[]) {
    const Ctr = this.bind.apply(this, [this].concat(Array.prototype.slice.call(arguments)))
    return new Ctr();
  }

  protected _isImmutable = true

  /**
   * Gets the current instance. If immutable is on, this returns
   * a clone. Otherwise, it returns `this`
   * @return {Immutable} This or a new instance
   */
  instance() {
    return this._isImmutable ? this.clone() : this;
  }

  /**
   * Clone the current instance. It is expected that consumers
   * of this class override this method
   * @return {Immutable}
   */
  clone() {
    return Immutable.create(this);
  }

  /**
   * Temporarily disables immutability so any changes happen
   * to `this` rather than a new instance
   * @param handler The function that mutates
   */
  mutate(handler: (instance: this) => void) {
    var prev = this._isImmutable;

    this._isImmutable = false;
    handler(this);
    this._isImmutable = prev;

    return this;
  }
}