import { defaults, extend, uuid } from './utils'
import { Immutable } from './immutable'

export interface IBudgetExpenseAttrs {
  name?: string
  amount?: number
  date?: Date
  id?: string
}

export class BudgetExpense extends Immutable {
  public static defaults: Partial<IBudgetExpenseAttrs> = {
    name: 'New Monthly Budget Expense',
    amount: 0,
  }

  public attrs: IBudgetExpenseAttrs

  constructor(attrs?: IBudgetExpenseAttrs) {
    super()
    this.attrs = <IBudgetExpenseAttrs> defaults(attrs || {}, BudgetExpense.defaults)
    this.attrs.date = this.attrs.date ? new Date(this.attrs.date) : new Date()
    this.attrs.id = this.attrs.id || uuid()
  }

  clone(): this {
    return BudgetExpense.create(extend({}, this.attrs))
  }

  toJSON() {
    return extend({}, this.attrs)
  }
}