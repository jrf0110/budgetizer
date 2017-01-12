import { h, Component, ComponentProps } from 'preact'
import { ApplicationState } from '../../lib/app-state'

export interface IBasePageComponentProps extends ComponentProps {
  state: ApplicationState
}

export class BasePageComponent extends Component<IBasePageComponentProps, Object> {
  render() {
    return (
      <div class="page"></div>
    )
  }
}