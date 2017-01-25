import { h, Component, ComponentProps } from 'preact'
import { ApplicationState, TChangeState } from '../lib/app-state'
import { Budgets } from '../lib/budgets'

export interface IBudgetListProps extends ComponentProps {
  budgets: Budgets
}

export class BudgetList extends Component<IBudgetListProps, Object> {
  render(props: IBudgetListProps) {
    return (
      <ul class="budgets-list table-list">
        {props.budgets.attrs.budgets.map((budget, i) => {
          return (
            <li class="budget-list-item table-list-item" key={budget.attrs.id}>
              <a className="table-list-item-col"
                href={budget.getUrl()}>{budget.attrs.name}</a>
            </li>
          )
        })}
      </ul>
    )
  }
}