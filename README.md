# allora

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Promisify everything in less than ~50 lines. It can be used to implement promises on any JavaScript object.

## Examples

### Basic
Or simply:
```js
const w = allora(window)
w.onload.then(() => alert('I am ready!'))
```

### Example in Node:
```js
const allora = require('allora')
const g = allora(global)
Promise.all([
  g.setImmediate(),
  g.setTimeout(200),
  g.setTimeout(400)
]).then(() => done())

```

### Example in browser:
```js
const w = allora(window)
const p1 = w.setTimeout(500)
const p2 = w.setTimeout(5000)
const p3 = w.requestAnimationFrame()

p1.then(() => alert('I am ready'))
p2.then(() => alert('I am late'))
p3.then(() => alert('frame'))

Promise.all([p1, p2, p3]).then(() => alert('We are all done!'))
```

### Clear timers
Thanks to [this pull request](https://github.com/GianlucaGuarini/allora/pull/3) it's now also possible to clear the timers
```js
const w = allora(window)
const timer = w.setTimeout(3000)
timer.then(_ => console.log('time over'))
// the valueOf call should be not needed here
// but if you are on node, you will need it https://github.com/nodejs/node/issues/7792
clearTimeout(timer.valueOf())
```

### Event streams
`Allora` does not allow you to do event streams since Promises could be only once fulfilled.
```js
const w = allora(window)
const polling = w.setInterval(3000)
polling.then(() => console.log('This will called only once!!!'))

```
However my friend [@nilssolanki](https://github.com/nilssolanki) made [stroxy](https://github.com/nilssolanki/stroxy) to provide an elegant streaming api to any javascript object. I would highly recommend you `stroxy` if you are looking a lightweight events streaming library similar to `allora`.

## "allora" meaning

"allora" is the Italian :it: word for `then`



[travis-image]:https://img.shields.io/travis/GianlucaGuarini/allora.svg?style=flat-square
[travis-url]:https://travis-ci.org/GianlucaGuarini/allora

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/allora.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/allora.svg?style=flat-square
[npm-url]:https://npmjs.org/package/allora

