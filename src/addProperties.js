// adds fluent style getter/setter methods to an object
// for the given list of properties

let getterSetter = (object, key) => {
  return function (value) {
    if (arguments.length === 0) {
      return object[key]
    }
    object[key] = value
    return object
  }
}

let getter = (object, key) => {
  return () => {
    return object[key]
  }
}

export function addProperties (object, ...properties) {
  for (var property of properties) {
    object[property] = getterSetter(object, '_' + property)
  }
}

export function addGetters (object, ...properties) {
  for (var property of properties) {
    object[property] = getter(object, '_' + property)
  }
}
