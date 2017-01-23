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

  constructor(user?: User);
  constructor(attrs?: IUserAttrs);
  constructor(attrs?: any) {
    super()
    if (attrs instanceof User) {
      this.attrs = attrs.clone().attrs
    } else {
      this.attrs = <IUserAttrs> defaults(attrs || {}, User.defaults)
    }
  }

  update(attrs: Partial<IUserAttrs>) {
    const this_ = this.instance()
    extend(this_.attrs, attrs)
    return this_
  }

  clone(): this {
    return User.create(extend({}, this.attrs))
  }

  toJSON() {
    return this.attrs
  }
}