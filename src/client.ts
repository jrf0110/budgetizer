import { h, render, } from 'preact'
import { default as Navigo } from 'navigo'

import { AppComponent, IAppComponentProps } from './components/app'
import { HomePageComponent } from './components/pages/home'
import { TestPageComponent } from './components/pages/test'
import { UserPageComponent } from './components/pages/user'
import { ApplicationState, TStateChanger } from './lib/app-state'
import { defaults } from './lib/utils'
import { domready } from './lib/domready'

interface IClientAppOptions {
  renderTargetSelector: string
}

class ClientApp {
  public static defaults: Partial<IClientAppOptions> = {
    renderTargetSelector: 'body'
  }

  public window: Window
  public renderTarget: Element
  public renderedElement: Element
  public rootComponent: AppComponent
  public options: IClientAppOptions
  public state: ApplicationState
  public router: Navigo
  public changeState: (handler: TStateChanger) => void

  constructor(window: Window, options = {}) {
    this.window = window
    this.options = defaults(options, ClientApp.defaults)
    this.state = new ApplicationState()

    this.router = new Navigo()
      .on(() => {
        console.log('/')
        this.changeState(state => state.clone().mutate(state => {
          state.setPage(HomePageComponent)
          state.setPath('/')
        }))
      })
      .on('/user', () => {
        console.log('/user')
        this.changeState(state => state.clone().mutate(state => {
          state.setPage(UserPageComponent)
          state.setPath('/user')
        }))
      })
      .on('/test', () => {
        console.log('/test')
        this.state = this.state.setPage(TestPageComponent)
      })

    this.changeState = (handler: TStateChanger) => {
      this.state = handler(this.state)

      if (this.window.location.pathname !== this.state.attrs.pathname) {
        this.router.navigate(this.state.attrs.pathname)
      }

      console.log('state change', this.state)

      this.render()
    }

    this.onDOMReady = this.onDOMReady.bind(this)
    this.onDOMClick = this.onDOMClick.bind(this)
  }

  navigate(path: string) {
    this.router.navigate(path)
    return this
  }

  render() {
    const props = {
      changeState: this.changeState,
      state: this.state
    }

    this.renderedElement = render(
      h<IAppComponentProps>(AppComponent, props),
      this.renderTarget,
      this.renderedElement
    )
  }

  init() {
    domready(this.window, this.onDOMReady)
    this.router.resolve()
  }

  stop() {

  }

  onDOMReady() {
    this.renderTarget = this.window.document.querySelector(this.options.renderTargetSelector)
    this.render()
  }

  onDOMClick(e: Event) {
    if ((<any> e.target).href) {
      const target = <HTMLAnchorElement> e.target
      if (target.host === this.window.location.host) {
        e.preventDefault()
        this.router.navigate(target.pathname)
      }
    }
  }
}

const app = (<any> window).app = new ClientApp(window)

app.init()