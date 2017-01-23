import { defaults, extend, uuid } from './utils'
import { Immutable } from './immutable'
import { BudgetExpense, IBudgetExpenseAttrs } from './budget-expense'

export interface IBudgetAttrs {
  id: string
  name: string
  amount: number
  expenses: BudgetExpense[]
}

export class Budget extends Immutable {
  public static defaults: Partial<IBudgetAttrs> = {
    name: 'New Monthly Budget',
    amount: 0,
  }

  public attrs: IBudgetAttrs

  constructor(attrs?: Partial<IBudgetAttrs>) {
    super()
    this.attrs = <IBudgetAttrs> defaults(attrs || {}, Budget.defaults)
    this.attrs.id = this.attrs.id || uuid()
    this.attrs.expenses = (this.attrs.expenses || [])
      .map(expense => {
        if (expense instanceof BudgetExpense) {
          return expense.clone()
        }

        return new BudgetExpense(<any> expense)
      })
  }

  getUrl() {
    return `/budgets/${this.attrs.id}`
  }

  getTotalExpendituresForMonth(month: number) {
    return this.attrs.expenses
      .filter(expense => {
        return expense.attrs.date.getMonth() === month
      })
      .reduce<number>((total, expense) => {
        return total + expense.attrs.amount
      }, 0)
  }

  addExpenditure(attrs: Partial<IBudgetExpenseAttrs>) {
    const this_ = this.instance()
    this_.attrs.expenses.push(new BudgetExpense(attrs))
    return this_
  }

  clone(): this {
    return Budget.create(extend({}, this.attrs, {
      expenses: this.attrs.expenses.map(expense => expense.clone())
    }))
  }

  toJSON() {
    return extend({}, this.attrs)
  }
}