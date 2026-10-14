export const qs = (selector, root = document) => root.querySelector(selector)

export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)]

export const on = (root, event, selector, handler) => {
  root.addEventListener(event, (eventObject) => {
    const target = eventObject.target.closest(selector)

    if (target && root.contains(target)) {
      handler(eventObject, target)
    }
  })
}
