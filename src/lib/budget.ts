import { defaults, extend } from './utils'
import { Immutable } from './immutable'
import { BudgetExpense } from './budget-expense'

export interface IBudgetAttrs {
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

  clone(): this {
    return Budget.create(extend({}, this.attrs, {
      expenses: this.attrs.expenses.map(expense => expense.clone())
    }))
  }
}