declare module "navigo" {
  export default class Navigo {
    on(handler: (params?: any, query?: any) => void): this
    on(route: string, handler: (params?: any, query?: any) => void): this
    resolve(): this
    navigate(path: string): this
  }
}