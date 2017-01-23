import { h, Component, ComponentProps,  } from 'preact'
import { BasePageComponent, IBasePageComponentProps } from './base'
import { BudgetList } from '../budget-list'
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

  shouldComponentUpdate(nextProps: IBasePageComponentProps, nextState: IUserPageComponentState) {
    return nextProps.state.attrs.user !== this.props.state.attrs.user
      || nextProps.state.attrs.budgets !== this.props.state.attrs.budgets
      || nextState !== this.state
  }

  render() {
    const { user, budgets } = this.props.state.attrs
    const { newBudgetName } = this.state

    return (
      <div class="page">
        <div className="container container-with-padding">
          <h1>User</h1>
          <form>
            <div className="form-group">
              <input
                type="number"
                id="user-monthly-income"
                name="monthlyIncome"
                value={new USDValue(user.attrs.monthlyIncome).dollars()}
                onChange={this.onMonthlyIncomeChange}
              />
              <label for="user-monthly-income">Monthly Income $</label>
            </div>
          </form>
          <h2>Budgets</h2>
          <form onSubmit={this.onNewBudgetFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="user-create-new-budget"
                name="newBudgetName"
                value={newBudgetName}
                onInput={this.onNewBudgetInput}
              />
              <label for="user-create-new-budget">New Budget</label>
            </div>
            <div className="form-group">
              <button type="submit">Create new budget</button>
            </div>
          </form>
          <BudgetList budgets={budgets} />
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
    
    const name = this.state.newBudgetName
    const { changeState } = this.props

    changeState(s => s.budgets(b => b.add({ name })))

    this.setState({ newBudgetName: '' })
  }
}