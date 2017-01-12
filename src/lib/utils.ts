export function extend(a: any, ...args: any[]): any {
  for (let i = 0, k; i < args.length; i++) {
    for (k in args[i]) a[k] = args[i][k]
  }

  return a
}

export function defaults(a: any, ...args: any[]): any {
  for (let i = 0, k; i < args.length; i++) {
    for (k in args[i]) {
      if (a[k] === undefined) a[k] = args[i][k]
    }
  }

  return a
}