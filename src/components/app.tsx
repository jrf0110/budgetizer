import { h, Component, ComponentProps } from 'preact'
import { ApplicationState, TChangeState } from '../lib/app-state'

export interface IAppComponentProps extends ComponentProps {
  state: ApplicationState
  changeState: TChangeState
}

export class AppComponent extends Component<IAppComponentProps, Object> {
  public el: Element

  constructor(props: IAppComponentProps) {
    super(props)

    this.onElementAvailable = this.onElementAvailable.bind(this)
  }

  render() {
    const Page = this.props.state.attrs.page

    return (
      <div class="app-container" ref={this.onElementAvailable}>
        <Page
          changeState={this.props.changeState}
          state={this.props.state}
        />
      </div>
    )
  }

  onElementAvailable(el: Element) {
    this.el = el
  }
}