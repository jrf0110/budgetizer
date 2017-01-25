import { h, Component, ComponentProps,  } from 'preact'
import { BasePageComponent, IBasePageComponentProps } from './base'
import { Budget, IBudgetAttrs } from '../../lib/budget'
import { USDValue } from '../../lib/usd-value'
import { ProgressBar, IProgressBarProps } from '../progress-bar'
import { ExpenseCreator, IExpenseCreatorProps } from '../expense-creator'
import { BudgetExpenseList } from '../budget-expense-list'
import { BudgetExpense, IBudgetExpenseAttrs } from '../../lib/budget-expense'

export interface IBudgetPageComponentState {
  
}

export class BudgetPageComponent extends BasePageComponent<IBudgetPageComponentState> {
  public onNewBudgetInput: (event: Event) => void
  public budget: Budget
  
  constructor(props: IBasePageComponentProps) {
    super(props)
    this.budget = this.props.state.getBudgetFromParams()
    this.onBudgetAmountChange = this.onBudgetAmountChange.bind(this)
    this.onCreateExpenseRequest = this.onCreateExpenseRequest.bind(this)
  }

  componentWillReceiveProps(nextProps: IBasePageComponentProps) {
    const { state } = nextProps
  }

  shouldComponentUpdate(nextProps: IBasePageComponentProps, nextState: IBudgetPageComponentState) {
    // TODO: Make this better
    // return nextProps.state.getBudgetFromParams() !== this.props.state.getBudgetFromParams()
  }

  render() {
    const budget = this.budget = this.props.state.getBudgetFromParams()
    const current = budget.getTotalExpendituresForMonth(new Date().getMonth())
    const remaining = budget.attrs.amount - current
    const amountDollars = new USDValue(budget.attrs.amount).dollars()

    return (
      <div class="page">
        <div className="container container-with-padding">
          <h1>{budget.attrs.name}</h1>
        </div>
        <div className="container">
          <div className="form-group">
            <input
              type="number"
              value={amountDollars}
              onInput={this.onBudgetAmountChange}
            />
            <label>Amount $</label>
          </div>
          <div className="form-group">
            <ProgressBar
              total={budget.attrs.amount}
              current={current}
             >${new USDValue(remaining).dollars()} / ${amountDollars}</ProgressBar>
          </div>
        </div>
        <BudgetExpenseList expenses={budget.attrs.expenses} />
        <div className="expense-creator-container">
          <div className="container">
            <ExpenseCreator
              onCreateExpenseRequest={this.onCreateExpenseRequest}
            />
          </div>
        </div>
      </div>
    )
  }

  onBudgetAmountChange(e: Event) {
    const el = e.target as HTMLInputElement

    this.props.changeState(state => {
      return state.budgets(budgets => {
        return budgets.update(this.budget.attrs.id, budget => {
          return budget.mutate(budget => {
            budget.attrs.amount = new USDValue().dollars(el.value).toPennies()
          })
        })
      })
    })
  }

  onCreateExpenseRequest(attrs: IBudgetExpenseAttrs) {
    this.props.changeState(state => {
      return state.budgets(budgets => {
        return budgets.update(this.budget.attrs.id, budget => {
          return budget.addExpenditure(attrs)
        })
      })
    })
  }
}