properties-and-events
====================

Add properties and events with fluent api calls to your objects.


```

import { addProperties, addGetters, addEvents } from 'properties-and-events'

class Car {
  constructor () {
    addProperties(this, 'colour', 'upholstery', 'sunroof')
    addGetters(this, 'doors', 'engineSize')
    addEvents(this, 'start', 'stop')
    this._doors = 4
    this._engineSize = 1.98
  }

  drive (time) {
    this.fire('start')
    setTimeout(() => {
      this.fire('stop')
    }, time)
  }
}

const myCar = new Car()
  .colour('red')
  .upholstery('leather')
  .sunroof(false)
  .on('start', () => {console.log('car started')})
  .on('stop', () => {console.log('car stopped')})

console.log(myCar.doors()) // logs 4
console.log(myCar.colour()) // logs 'red'
console.log(myCar._colour) // also logs 'red'
```

**`addProperties`** adds fluent getter/setter methods to your object. If the
method is called with an argument, then it is treated as a setter, and returns
a reference to the original object to allow method chaining. If called without
any argument then it is treated as a getter and will return the value of the
property. The actual value of the property is stored in a field with the name
of the method prefixed with an underscore. i.e. `o.colour()` gets the value 
stored in `o._colour`.

**`addGetters`** works similarly to `addProperties` but without the setter
functionality.

**`addEvents`** adds events to your object. Two methods will be added to your
object. `myObject.on(type, handler)` is used to subscribe to events. Internally,
use `this.fire(type, arg1, arg2, ...)` to fire events. `arg1, arg2, ...` will
be passed to the handler.