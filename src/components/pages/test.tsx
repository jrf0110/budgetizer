import { h, Component, ComponentProps,  } from 'preact'
import { BasePageComponent } from './base'

export class TestPageComponent extends BasePageComponent<any> {
  render() {
    return (
      <div class="page">
        <h1>Test</h1>
      </div>
    )
  }
}