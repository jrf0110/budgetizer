import { h, render, } from 'preact'
import { default as Navigo } from 'navigo'

import { AppComponent, IAppComponentProps } from './components/app'
import { HomePageComponent } from './components/pages/home'
import { TestPageComponent } from './components/pages/test'
import { UserPageComponent } from './components/pages/user'
import { BudgetPageComponent } from './components/pages/budget'
import { ApplicationState, TStateChanger } from './lib/app-state'
import { defaults, debounce } from './lib/utils'
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
  public debouncedSaveState: any

  constructor(window: Window, options = {}) {
    this.window = window
    this.options = defaults(options, ClientApp.defaults)
    this.state = new ApplicationState()

    this.router = new Navigo()
      .on(() => {
        this.changeState(state => state.clone().mutate(state => {
          state.setPage(UserPageComponent)
          state.setPath('/')
        }))
      })
      .on('/user', () => {
        this.changeState(state => state.clone().mutate(state => {
          state.setPage(UserPageComponent)
          state.setPath('/user')
        }))
      })
      .on('/budgets/:id', params => {
        this.changeState(state => state.clone().mutate(state => {
          state.setPage(BudgetPageComponent)
          state.setPath(this.window.location.pathname)
          state.attrs.routeParams = params
        }))
      })
      .on('/budgets/:id/:date', params => {
        this.changeState(state => state.clone().mutate(state => {
          state.setPage(BudgetPageComponent)
          state.setPath(this.window.location.pathname)
          state.attrs.routeParams = params
        }))
      })
      .on('/test', () => {
        this.state = this.state.setPage(TestPageComponent)
      })

    this.changeState = (handler: TStateChanger) => {
      this.state = handler(this.state)

      if (this.window.location.pathname !== this.state.attrs.pathname) {
        this.router.navigate(this.state.attrs.pathname)
      }

      console.log('state change', this.state)

      this.render()
      this.debouncedSaveState()
    }

    this.debouncedSaveState = debounce(this.saveToLocalStorage, 1000).bind(this)
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
    try {
      const localStateStr = this.window.localStorage.getItem('budgetizer.state')
      const localState = JSON.parse(localStateStr)

      this.changeState(state => {
        return state.merge(new ApplicationState(localState))
      })
    } catch (e) {
      
    }

    domready(this.window, this.onDOMReady)
    this.router.resolve()
  }

  saveToLocalStorage() {
    this.window.localStorage
      .setItem('budgetizer.state', JSON.stringify(this.state.toJSON()))
  }

  stop() {
    
  }

  onDOMReady() {
    this.renderTarget = this.window.document.querySelector(this.options.renderTargetSelector)
    this.window.document.addEventListener('click', this.onDOMClick)
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