import { h, render, } from 'preact'
import { default as Navigo } from 'navigo'

import { AppComponent, IAppComponentProps } from './components/app'
import { HomePageComponent } from './components/pages/home'
import { ApplicationState } from './lib/app-state'
import { defaults } from './lib/utils'
import { domready } from './lib/domready'

interface IClientAppOptions {
  renderTargetSelector: string
}

class ClientApp {
  public static defaults: Partial<IClientAppOptions> = {

  }

  public window: Window
  public renderTarget: Element
  public renderedElement: Element
  public rootComponent: AppComponent
  public options: IClientAppOptions
  public state: ApplicationState

  constructor(window: Window, options = {}) {
    this.window = window
    this.options = defaults(options, ClientApp.defaults)
    this.state = new ApplicationState()
    this.onDOMReady = this.onDOMReady.bind(this)
  }

  render() {
    const props = { state: this.state, Page: HomePageComponent }
    
    this.renderedElement = render(
      h<IAppComponentProps>(AppComponent, props),
      this.renderTarget,
      this.renderedElement
    )
  }

  init() {
    domready(this.window, this.onDOMReady)
  }

  onDOMReady() {
    this.renderTarget = this.window.document.querySelector(this.options.renderTargetSelector)
    this.render()
  }
}

new Navigo()
  .on('/', () => {
    // state.setPage(HomePageComponent)
    console.log('foo')
  })
  .resolve()

const state = new ApplicationState()

domready(window, () => {
  render(h<IAppComponentProps>(AppComponent, { state, Page: HomePageComponent }), document.body)
})