export const domready = (win: Window, callback: () => void, force?: boolean) => {
  const rs = win.document.readyState
  const doScroll = !!(<any> win.document.documentElement).doScroll

  if (win.parent !== win) force = true

  if (force || (doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(rs)) {
    win.setTimeout(() => callback(), 0)
  } else {
    win.document.addEventListener('DOMContentLoaded', () => callback())
  }
}