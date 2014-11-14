# Watch function execution

...


## Installation

```
npm install func-watch
```

## Usage

```js
var watch = require('func-watch');

var watched = watch(function (..., callback) {...});

// Introspect
watched.running
watched.idle()

// Events
watched.events.on('call', ...)
watched.events.on('callback', ...)
watched.events.on('error', ...)
watched.events.on('start', ...)
watched.events.on('drain', ...)
```


## Rationale

...


## TODO:

- fill in docs/rationale
- tests
