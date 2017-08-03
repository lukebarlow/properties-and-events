import { addProperties, addGetters, addEvents } from '../'

describe('addProperties', () => {
  it('create an object with fluent properties', () => {
    class O {
      constructor () {
        addProperties(this, 'colour', 'size', 'flavour')
      }
    }
    const o = new O().colour('red').size('small').flavour('cherry')
    expect(o.colour()).toEqual('red')
    expect(o.size()).toEqual('small')
    expect(o.flavour()).toEqual('cherry')
  })
})

describe('addGetters', () => {
  it("creates getters for 'hidden' properties (names starting with underscore)", () => {
    class O {
      constructor () {
        this._colour = 'blue'
        this._size = 'large'
        this._flavour = 'apple'
        addGetters(this, 'colour', 'size', 'flavour')
      }
    }
    const o = new O()
    expect(o.colour()).toEqual('blue')
    expect(o.size()).toEqual('large')
    expect(o.flavour()).toEqual('apple')
  })
})

describe('addEvents', () => {
  it('creates events on an object', () => {
    class O {
      constructor () {
        addEvents(this, 'change')
      }

      changeSomething () {
        this.fire('change')
      }
    }
    const o = new O()
    const spy = jasmine.createSpy('spy')
    o.on('change', spy)
    o.changeSomething()
    expect(spy.calls.count()).toEqual(1)
  })

  it('add events in two separate places to build up multiple events', () => {
    class O {
      constructor () {
        addEvents(this, 'change')
        addEvents(this, 'load')
      }

      changeSomething () {
        this.fire('change')
      }

      load () {
        this.fire('load')
      }
    }
    const o = new O()

    const spy = jasmine.createSpy('spy')
    o.on('change', spy)
    o.changeSomething()
    expect(spy.calls.count()).toEqual(1)

    const spy2 = jasmine.createSpy('spy2')
    o.on('load', spy2)
    o.load()
    expect(spy2.calls.count()).toEqual(1)
  })
})

export default {}
