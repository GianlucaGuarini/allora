function isOnCallback (str) {
  return typeof str === 'string' && /^on(.+)/.test(str)
}

/**
 * Function called recursively on all the object properties
 * If a property is a function we make it promisable
 * @param   { Object } parent - context where the apply method will be triggered
 * @param   { String } prop - property we are trying to get from the parent object
 * @returns { Proxy }
 */
function makePromisable (parent, prop) {
  return new Proxy(prop ? parent[prop] : parent, {
    get: (target, property) => {
      // no function no need for promises in return
      if (isOnCallback(property)) {
        // detect properties like
        // window.onload.then(() => console.log('loaded'))
        return new Promise((resolve) => {
          target[property] = resolve
        })
      } else if (typeof target[property] !== 'function') {
        return target[property]
      } else {
        // make proxy also the nested object properties
        return makePromisable(target, property)
      }
    },
    // this is cool to make promiseable event emitters
    //  and many other native node methods
    apply: (target, thisArg, argumentsList) => {
      let returnValue
      const promise = new Promise((resolve, reject) => {
        // guessing the timer functions from the type of arguments passed to the method
        const isTimer = !argumentsList.length || typeof argumentsList[0] === 'number'
        // assuming the callback will be always the second argument
        argumentsList.splice(isTimer ? 0 : 1, 0, resolve)
        returnValue = Reflect.apply(target, parent, argumentsList)
      })
      // Return the returnValue through valueOf
      promise.valueOf = () => returnValue
      promise.toString = () => returnValue
      return promise
    }
  })
}

module.exports = exports.default = (object) => makePromisable(object)
