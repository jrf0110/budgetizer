import { h, Component, ComponentProps } from 'preact'
import { denormalize, linkState, extend } from '../lib/utils'
import { IBudgetExpenseAttrs } from '../lib/budget-expense'
import { USDValue } from '../lib/usd-value'

export interface IExpenseCreatorProps extends ComponentProps {
  onCreateExpenseRequest: (attrs: IBudgetExpenseAttrs) => void
}

export interface IExpenseCreatorState {
  text: string
}

export class ExpenseCreator extends Component<IExpenseCreatorProps, IExpenseCreatorState> {
  public onTextInput: (e: Event) => void

  constructor(props: IExpenseCreatorProps) {
    super(props)

    this.state = { text: '' }

    this.onTextInput = linkState('text', 'text').bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  render(){
    return (
      <form className="expense-creator" onSubmit={this.onSubmit}>
        <div className="expense-creator-element-wrapper expense-creator-element-text">
          <input
            type="text"
            placeholder="20 lunch"
            value={this.state.text}
            onInput={this.onTextInput}
          />
        </div>
        <div className="expense-creator-element-wrapper">
          <button type="submit">Add</button>
        </div>
      </form>
    )
  }

  getAttrsFromState(): IBudgetExpenseAttrs {
    const parts = this.state.text.split(' ')
    const amountStr = parts[0]
    const name = parts.slice(1).join(' ')

    return {
      name,
      amount: new USDValue(0).dollars(amountStr).pennies()
    }
  }

  onSubmit(e: Event) {
    e.preventDefault()
    this.props.onCreateExpenseRequest(this.getAttrsFromState())
    this.setState({ text: '' })
  }
}