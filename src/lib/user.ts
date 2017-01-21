import { defaults, extend } from './utils'
import { Immutable } from './immutable'

export interface IUserAttrs {
  monthlyIncome: number
}

export class User extends Immutable {
  public static defaults: Partial<IUserAttrs> = {
    monthlyIncome: 0
  }

  public attrs: IUserAttrs

  constructor(attrs?: IUserAttrs) {
    super()
    this.attrs = <IUserAttrs> defaults(attrs || {}, User.defaults)
  }

  update(attrs: Partial<IUserAttrs>) {
    console.log('updating user', attrs)
    const this_ = this.instance()
    extend(this_.attrs, attrs)
    return this_
  }

  clone(): this {
    return User.create(extend({}, this.attrs))
  }
}