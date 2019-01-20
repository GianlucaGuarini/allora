const allora = require('../')

const chai = require('chai')
const expect = chai.expect
const EventEmitter = require('events')

describe('core', function () {
  it('It can properly subscribe to custom APIs callbacks', function (done) {
    const emitter = new EventEmitter()

    allora(emitter).on('foo').then(() => {
      done()
    }).catch(err => { throw new Error(err) })

    emitter.emit('foo')
  })

  it('The arguments are properly forwarded', (done) => {
    const emitter = new EventEmitter()
    const alloraEmitter = allora(emitter)

    alloraEmitter.on('test').then((...args) => {
      expect(args).to.be.an('array')
      expect(args).to.be.have.lengthOf(1)
      expect(args[0]).to.be.equal('args[0] should be this text')
      done()
    })

    emitter.emit('test', 'args[0] should be this text')
  })

  it('Allow combining multiple promises', function (done) {
    const emitter = new EventEmitter()
    const emitter2 = new EventEmitter()
    const alloraEmitter = allora(emitter)
    const alloraEmitter2 = allora(emitter2)

    Promise.all([
      alloraEmitter.on('foo'),
      alloraEmitter2.on('foo')
    ]).then(() => done()).catch(err => { throw new Error(err) })

    alloraEmitter.on('foo').then((val) => {
      expect(val).to.be.equal(1)
    }).catch(err => { throw new Error(err) })

    emitter.emit('foo', 1)

    alloraEmitter2.on('foo').then((val) => {
      expect(val).to.be.equal(2)
    }).catch(err => { throw new Error(err) })

    emitter2.emit('foo', 2)
  })

  it('Promisable native methods', function (done) {
    const coolGlobal = allora(global)
    Promise.all([
      coolGlobal.setImmediate(),
      coolGlobal.setTimeout(200),
      coolGlobal.setTimeout(500)
    ]).then(() => done())
  })

  it('Reject the promise', function (done) {
    const coolGlobal = allora(global)
    coolGlobal.setImmediate().then(() => {
      throw new Error('Random error')
    }).catch(() => done())
  })

  it('Can clear properly the timer', function (done) {
    const coolGlobal = allora(global)
    const timer = coolGlobal.setTimeout(200)

    var count = 0

    timer.then(_ => count++)

    clearTimeout(timer.valueOf())

    setTimeout(function () {
      expect(count).to.be.equal(0)
      done()
    }, 1000)
  })
})
