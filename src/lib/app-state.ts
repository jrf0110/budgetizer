import { ComponentConstructor } from 'preact'
import { defaults, extend } from './utils'
import { Immutable } from './immutable'
import { TPage } from '../components/pages/base'
import { User } from './user'
import { Budget, IBudgetAttrs } from './budget'

export interface IApplicationStateAttrs {
  page: TPage<any>
  user: User
  budgets: Budget[]
  pathname: string
}

export class ApplicationState extends Immutable {
  public static defaults: Partial<IApplicationStateAttrs> = {
    pathname: '/'
  }

  public attrs: IApplicationStateAttrs

  constructor(attrs?: IApplicationStateAttrs) {
    super()
    this.attrs = <IApplicationStateAttrs> defaults(attrs || {}, ApplicationState.defaults)
    this.attrs.user = this.attrs.user || new User()
    this.attrs.budgets = this.attrs.budgets || []
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

  createBudget() {
    const this_ = this.instance()
    this_.attrs.budgets.push(new Budget())
    return this_
  }

  editUser(handler: (user: User) => User) {
    const this_ = this.instance()
    this_.attrs.user = handler(this_.attrs.user)
    return this_
  }

  addBudget(attrs: Partial<IBudgetAttrs> = {}) {
    const this_ = this.instance()
    this_.attrs.budgets = this_.attrs.budgets.slice(0)
    this_.attrs.budgets.push(new Budget(attrs))
    return this_
  }

  clone(): this {
    return ApplicationState.create(extend({}, this.attrs))
  }
}

export type TStateChanger = (state: ApplicationState) => ApplicationState
export type TChangeState = (handler: TStateChanger) => any