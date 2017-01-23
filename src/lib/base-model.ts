// import { defaults, extend, uuid } from './utils'
// import { Immutable } from './immutable'
// import { Budget, IBudgetAttrs } from './budget'

// export type TDependencies<D> = { [P in keyof D]: (arg: any) => D[P] }

// export class BaseModel<I, D> {
//   public static defaults = {}
//   public attrs: I | D
//   public dependencies: TDependencies<D>

//   constructor(attrs?: I) {
//     this.attrs = defaults(attrs || {}, this.constructor.defaults)
//   }
// }

// export interface ITestModelAttrs {

// }

// export interface ITestModelDependencies {
//   budgets: Budget[]
// }

// export class TestModel extends BaseModel<ITestModelAttrs, ITestModelDependencies> {
//   public dependencies = {
//     budgets: (items?: any[]) => (items || []).map(item => {
//       if (item instanceof Budget) {
//         return item
//       }

//       return new Budget(item)
//     }),
//   }
// }