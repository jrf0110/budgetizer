import { h, Component, ComponentProps,  } from 'preact'
import { BasePageComponent, IBasePageComponentProps } from './base'
import { USDValue } from '../../lib/usd-value'

export interface IUserPageComponentState {
  newBudgetName?: string
}

export class UserPageComponent extends BasePageComponent<IUserPageComponentState> {
  public onNewBudgetInput: (event: Event) => void
  
  constructor(props: IBasePageComponentProps) {
    super(props)

    this.state = {}

    this.onMonthlyIncomeChange = this.onMonthlyIncomeChange.bind(this)
    this.onNewBudgetFormSubmit = this.onNewBudgetFormSubmit.bind(this)
    this.onNewBudgetInput = this.linkState('newBudgetName')
  }

  shouldComponentUpdate(nextProps: IBasePageComponentProps) {
    return nextProps.state.attrs.user !== this.props.state.attrs.user
  }

  render() {
    const { user } = this.props.state.attrs
    const { newBudgetName } = this.state

    return (
      <div class="page">
        <div className="container container-with-padding">
          <h1>User</h1>
          <form>
            <div className="form-group">
              <label for="user-monthly-income">Monthly Income $</label>
              <input
                type="number"
                id="user-monthly-income"
                name="monthlyIncome"
                value={new USDValue(user.attrs.monthlyIncome).dollars()}
                onChange={this.onMonthlyIncomeChange}
              />
            </div>
          </form>
          <h2>Budgets</h2>
          <form onSubmit={this.onNewBudgetFormSubmit}>
            <div className="form-group">
              <label for="user-create-new-budget">New Budget</label>
              <input
                type="text"
                id="user-create-new-budget"
                name="newBudgetName"
                value={newBudgetName}
              />
            </div>
            <div className="form-group">
              <button type="submit">Create new budget</button>
            </div>
          </form>
          <ul class="budgets-list">
            <li class="budget-list-item">
              <a href="/budgets/general-savings">General Savings</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  onMonthlyIncomeChange(e: Event) {
    const el = e.target as HTMLInputElement

    this.props.changeState(state => {
      return state.editUser(user => user.update({
        [el.name]: new USDValue().dollars(el.value).toPennies()
      }))
    })
  }

  onNewBudgetFormSubmit(e: Event) {
    e.preventDefault()

    this.props.changeState(state => {
      return state.addBudget({ name: this.state.newBudgetName })
    })

    this.setState({ newBudgetName: '' })
  }
}