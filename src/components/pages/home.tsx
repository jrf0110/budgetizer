import { h, Component, ComponentProps,  } from 'preact'
import { BasePageComponent } from './base'

export class HomePageComponent extends BasePageComponent {
  render() {
    return (
      <div class="page">
        <h1>Welcome home</h1>
      </div>
    )
  }
}