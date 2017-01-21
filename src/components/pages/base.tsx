import { h, Component, ComponentProps, ComponentConstructor } from 'preact'
import { default as Navigo } from 'navigo'
import { ApplicationState, TChangeState } from '../../lib/app-state'

export interface IBasePageComponentProps extends ComponentProps {
  state: ApplicationState
  changeState: TChangeState
}

export type TPage<T> = ComponentConstructor<IBasePageComponentProps, T>

export class BasePageComponent<T> extends Component<IBasePageComponentProps, T> {
  render() {
    return (
      <div class="page"></div>
    )
  }
}