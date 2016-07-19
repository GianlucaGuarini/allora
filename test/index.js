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
    Promise.all([
      coolGlobal.setImmediate(),
      coolGlobal.setTimeout(200),
      coolGlobal.setTimeout(500)
    ]).then(() => done())
  })
  
  it('Returns the return value via valueOf', function (done) {
      const coolGlobal = allora(global)
      let globalValue = false
      
      const timeout = coolGlobal.setTimeout(500)
      timeout.then(() => {
        globalValue = true
      })
      expect(timeout.valueOf()).to.be.equal(Number(timeout))
      expect(timeout.toString()).to.be.equal(String(timeout))
      
      coolGlobal.setTimeout(1000).then(() => {
        expect(globalValue).to.be.equal(false)
      })
  })
})
