class Dom {
  constructor(selector) {
    // case 1 - string; case 2 - node selector
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  // базовый getter/setter
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this // возвращается для того, чтобы потом чейнить можно было
    }

    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // element
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
