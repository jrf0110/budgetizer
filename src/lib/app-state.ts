import { defaults } from './utils'
import { Immutable } from './immutable'

export interface IApplicationStateAttrs {
  
}

export class ApplicationState extends Immutable {
  public static defaults: Partial<IApplicationStateAttrs> = {
    
  }
  
  public attrs: IApplicationStateAttrs

  constructor(attrs?: IApplicationStateAttrs) {
    super()
    this.attrs = <IApplicationStateAttrs> defaults(attrs || {}, ApplicationState.defaults)
  }

  clone(): this {
    return ApplicationState.create(this.attrs)
  }
}