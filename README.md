# allora

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Promisify everything in less tha ~50 lines
It can be used to use promises on any javascript object.

## Examples

### Basic
Or simply:
```js
const myWindow = allora(window)
myWindow.onload.then(() => alert('I am ready!'))
```

### Example in Node:
```js
const allora = require('allora')
const myGlobal = allora(global)
Promise.race([
  myGlobal.setImmediate(),
  myGlobal.setTimeout(200),
  myGlobal.setTimeout(400)
]).then(() => done())

```

### Example in browser:
```js
const myWindow = allora(window)
const p1 = myWindow.setTimeout(500)
const p2 = myWindow.setTimeout(5000)
const p3 = myWindow.requestAnimationFrame()

p1.then(() => alert('I am ready'))
p2.then(() => alert('I am late'))
p3.then(() => alert('frame'))

Promise.all([p1, p2, p3]).then(() => alert('We are all done!'))
```

### Clear timers
Thanks to [this pull request](https://github.com/GianlucaGuarini/allora/pull/3) it's now also possible to clear the timers
```js
const myWindow = allora(window)
const timer = myWindow.setTimeout(3000)
timer.then(_ => console.log('time over'))
clearTimeout(timer)
```

## "allora" meaning

"allora" is the Italian :it: word for `then`



[travis-image]:https://img.shields.io/travis/GianlucaGuarini/allora.svg?style=flat-square
[travis-url]:https://travis-ci.org/GianlucaGuarini/allora

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/allora.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/allora.svg?style=flat-square
[npm-url]:https://npmjs.org/package/allora

