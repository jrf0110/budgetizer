import { h, Component, ComponentProps, ComponentConstructor } from 'preact'
import { BasePageComponent, IBasePageComponentProps } from './pages/base'
import { ApplicationState } from '../lib/app-state'

export interface IAppComponentProps extends ComponentProps {
  Page: ComponentConstructor<IBasePageComponentProps, any>
  state: ApplicationState
}

export class AppComponent extends Component<IAppComponentProps, Object> {
  public el: Element
  
  constructor(props: IAppComponentProps) {
    super(props)

    this.onElementAvailable = this.onElementAvailable.bind(this)
  }
  
  render() {
    const { Page } = this.props
    
    return (
      <div class="app-container" ref={this.onElementAvailable}>
        <Page state={this.props.state} />
      </div>
    )
  }

  onElementAvailable(el: Element) {
    this.el = el
  }
}