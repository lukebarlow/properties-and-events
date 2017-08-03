// adds events to the supplied object
import { dispatch } from 'd3-dispatch'

const DISPATCHERS = Symbol('dispatchers')

export default function (object, ...events) {
  if (!object[DISPATCHERS]) {
    object[DISPATCHERS] = {}
  }

  const dispatchersByEventName = object[DISPATCHERS]

  // if we're trying to add an event which already exists, then
  // throw an error
  for (let event of events) {
    if (Object.keys(dispatchersByEventName).includes(event)) {
      throw new Error('Trying to add event twice - ' + event)
    }
  }

  let dispatcher = dispatch.apply(null, events)

  for (let event of events) {
    dispatchersByEventName[event] = dispatcher
  }

  function eventName (type) {
    return type.split('.').shift()
  }

  object.on = function (type, handler) {
    dispatchersByEventName[eventName(type)].on(type, handler)
    return object
  }

  object.fire = function (type, ...args) {
    dispatchersByEventName[eventName(type)].call(type, object, ...args)
  }
}
