// adds events to the supplied object
import { dispatch } from 'd3-dispatch'

const DISPATCHERS = Symbol('dispatchers')

export default function (object) {
  if (!object[DISPATCHERS]) {
    object[DISPATCHERS] = {}
  }

  const dispatchersByEventName = object[DISPATCHERS]

  function eventName (type) {
    return type.split('.').shift()
  }

  object.on = function (type, handler) {
    const name = eventName(type)
    if (!dispatchersByEventName[name]) {
      dispatchersByEventName[name] = dispatch(name)
    }

    dispatchersByEventName[name].on(type, handler)
    return object
  }

  object.fire = function (type, ...args) {
    const dispatcher = dispatchersByEventName[eventName(type)]
    if (dispatcher) {
      dispatcher.call(type, object, ...args)
    }
  }
}