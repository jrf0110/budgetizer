import { h, Component, ComponentProps } from 'preact'
import { ApplicationState, TChangeState } from '../lib/app-state'
import { BudgetExpense } from '../lib/budget-expense'
import { USDValue } from '../lib/usd-value'

export interface IBudgetExpenseListProps extends ComponentProps {
  expenses: BudgetExpense[]
}

export class BudgetExpenseList extends Component<IBudgetExpenseListProps, Object> {
  render(props: IBudgetExpenseListProps) {
    return (
      <ul class="budget-expenses-list table-list">
        {props.expenses.map((expense, i) => {
          return (
            <li class="budget-expenses-list-item table-list-item" key={expense.attrs.id}>
              <div className="budget-expenses-list-item-amount table-list-item-col">
                ${new USDValue(expense.attrs.amount).dollars()}
              </div>
              <div className="budget-expenses-list-item-name table-list-item-col">
                {expense.attrs.name}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}