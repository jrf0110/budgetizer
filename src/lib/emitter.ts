export type TEmitterHandler<T> = ((instance?: T) => void)

export class Emitter<T> {
  public listeners: TEmitterHandler<T>[] = []

  addEventListener(handler: TEmitterHandler<T>): this {
    this.listeners.push(handler)
    return this
  }

  removeEventListener(handler: TEmitterHandler<T>): this {
    this.listeners = this.listeners.filter(fn => fn !== handler)
    return this
  }

  emit(arg: T) {
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i](arg)
    }

    return this
  }
}