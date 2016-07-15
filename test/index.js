require('../')

const chai = require('chai')
// const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const EventEmitter = require('events')
// const expect = chai.expect
chai.use(sinonChai)

describe('core', function () {
  it('It can properly subscribe to custom APIs callbacks', function (done) {
    var emitter = new EventEmitter()

    emitter.on.promise('foo').then(() => {
      done()
    })

    emitter.emit('foo')
  })
})
