import { ComponentConstructor } from 'preact'
import { defaults, extend } from './utils'
import { Immutable } from './immutable'
import { TPage } from '../components/pages/base'
import { User, IUserAttrs } from './user'
import { Budgets, IBudgetsAttrs } from './budgets'
import { Budget, IBudgetAttrs } from './budget'

export interface IApplicationStateAttrs {
  page: TPage<any>
  user: User
  budgets: Budgets
  pathname: string
  routeParams: any
}

export class ApplicationState extends Immutable {
  public static defaults: Partial<IApplicationStateAttrs> = {
    pathname: '/'
  }

  public attrs: IApplicationStateAttrs

  constructor(attrs?: IApplicationStateAttrs) {
    super()
    this.attrs = <IApplicationStateAttrs> defaults(attrs || {}, ApplicationState.defaults)

    if (!(this.attrs.user instanceof User)) {
      this.attrs.user = new User(this.attrs.user)
    }

    console.log('got budgets', this.attrs.budgets)
    if (!(this.attrs.budgets instanceof Budgets)) {
      this.attrs.budgets = new Budgets(this.attrs.budgets)
    }
  }

  setPage(page: TPage<any>): this {
    const this_ = this.instance()
    this_.attrs.page = page
    return this_
  }

  setPath(pathname: string): this {
    const this_ = this.instance()
    this_.attrs.pathname = pathname
    return this_
  }

  editUser(handler: (user: User) => User) {
    const this_ = this.instance()
    this_.attrs.user = handler(this_.attrs.user)
    return this_
  }

  budgets(handler: (budgets: Budgets) => Budgets) {
    const this_ = this.instance()
    this_.attrs.budgets = handler(this_.attrs.budgets)
    return this_
  }

  getBudgetFromParams(): Budget {
    return this.attrs.budgets.get(this.attrs.routeParams.id)
  }

  clone(): this {
    return ApplicationState.create(extend({}, this.attrs))
  }

  toJSON() {
    return Object.keys(this.attrs)
      .reduce((result, key: keyof IApplicationStateAttrs) => {
        if (typeof this.attrs[key] === 'object' && typeof (<any> this.attrs[key]).toJSON === 'function') {
          result[key] = (<any> this.attrs[key]).toJSON()
        }

        return result
      }, <any> {})
  }

  merge(b: ApplicationState) {
    const this_ = this.instance()
    extend(this_.attrs, b.clone().attrs)
    return this_
  }
}

export type TStateChanger = (state: ApplicationState) => ApplicationState
export type TChangeState = (handler: TStateChanger) => any