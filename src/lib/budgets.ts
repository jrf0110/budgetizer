import { defaults, extend } from './utils'
import { Immutable } from './immutable'
import { Budget, IBudgetAttrs } from './budget'

export interface IBudgetsAttrs {
  budgets: Budget[]
}

export class Budgets extends Immutable {
  public attrs: IBudgetsAttrs

  constructor(attrs?: IBudgetAttrs[])
  constructor(attrs?: IBudgetsAttrs)
  constructor(attrs?: Budgets)
  constructor(attrs?: any) {
    super()
    if (Array.isArray(attrs)) {
      this.attrs = { budgets: attrs }
    } else {
      this.attrs = attrs || { budgets: [] }
    }
    this.attrs.budgets = (attrs instanceof Budgets
      ? attrs.attrs.budgets : this.attrs.budgets || [])
        .map(budget => {
          if (budget instanceof Budget) {
            return budget.clone()
          }

          return new Budget(budget)
        })
    console.log('budgets', this.attrs.budgets)
  }

  add(budget: Partial<IBudgetAttrs>): this {
    const this_ = this.instance()
    this_.attrs.budgets.push(new Budget(budget))
    return this_
  }

  get(id: string): Budget {
    for (let i = 0; i < this.attrs.budgets.length; i++) {
      if (this.attrs.budgets[i].attrs.id === id) {
        return this.attrs.budgets[i]
      }
    }
  }

  update(id: string, handler: (budget: Budget) => Budget): this {
    const this_ = this.instance()
    const budget = this.get(id)
    const budgetI = this.attrs.budgets.indexOf(budget)
    this_.attrs.budgets[budgetI] = handler(budget)
    return this_
  }

  // updateBudget(id: string, attrs: any): this {
  //   const this_ = this.instance()
  //   const budget = this.get(id)
  //   const clone = budget.clone()
  //   const budgetI = this.attrs.budgets.indexOf(budget)
  //   extend(clone.attrs)
  //   this_.attrs.budgets[budgetI] = clone
  //   return this_
  // }

  clone(): this {
    return Budgets.create({
      budgets: this.attrs.budgets.slice(0)
    })
  }

  toJSON() {
    return this.attrs.budgets.map(budget => budget.toJSON())
  }
}