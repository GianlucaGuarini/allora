# allora

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

## "allora" meaning

"allora" is the Italian :it: word for `then`
