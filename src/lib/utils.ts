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

const uuidTmpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
export function uuid(){
  return uuidTmpl.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
  })
}

export function debounce(func: any, wait: any, immediate?: any){
  var timeout: any, args: any, context: any, timestamp: any, result: any;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  ;(<any> debounced).clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

/**
 * Given a value `x`, a `min`, and `max`, linearly fit the value
 * against a line going from x = 0 to x = 1
 * @param  {Number} x   The value to fit on the line
 * @param  {Number} MIN The minimum value in the set
 * @param  {Number} MAX The maximum value in the set
 * @return {Number}     The normalized value on the line
 */
export const normalize =
  (x: number, MIN: number, MAX: number): number => (x - MIN) / (MAX - MIN)
// The reverse of normalize
export const denormalize =
  (x: number, MIN: number, MAX: number): number => x * (MAX - MIN) + MIN