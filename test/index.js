const allora = require('../')

const chai = require('chai')
// const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const EventEmitter = require('events')
const expect = chai.expect
chai.use(sinonChai)

describe('core', function () {
  var emitter

  beforeEach(function () {
    emitter = allora(new EventEmitter())
  })

  it('It can properly subscribe to custom APIs callbacks', function (done) {
    emitter.on('foo').then(() => {
      done()
    })
    emitter.emit('foo')
  })

  it('Allow combining multiple promises', function (done) {
    const emitter2 = allora(new EventEmitter())

    Promise.all([
      emitter.on('foo'),
      emitter2.on('foo')
    ]).then(() => done())

    emitter.on('foo').then((val) => {
      expect(val).to.be.equal(1)
    })
    emitter.emit('foo', 1)

    emitter2.on('foo').then((val) => {
      expect(val).to.be.equal(2)
    })
    emitter2.emit('foo', 2)
  })

  it('Promisable native methods', function (done) {
    const coolGlobal = allora(global)
    Promise.race([
      coolGlobal.setImmediate(),
      coolGlobal.setTimeout(200),
      coolGlobal.setTimeout(400)
    ]).then(() => done())
  })
})
