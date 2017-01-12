declare module "navigo" {
  export default class Navigo {
    on(route: string, handler: (params?: any, query?: any) => void): this
    resolve(): this
  }
}