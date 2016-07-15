var isOnCallback = (str) => /^on(.+)/.test(str)

Object.defineProperty(Object.prototype, 'promise', {
  get: function () {
    return new Proxy(this, {
      get: (target, property) => {
        if (isOnCallback(property)) {
          return new Promise((resolve) => {
            target[property] = resolve
          })
        } else {
          return target[property]
        }
      },
      apply: (target, thisArg, argumentsList) => {
        return new Promise((resolve, reject) => {
          Reflect.apply(target, thisArg, [argumentsList[0], resolve])
        })
      },
      deleteProperty: (target, property) => {
        if (isOnCallback(property)) {
          target[property] = null
        }
        return true
      }
    })
  },
  configurable: true
})

