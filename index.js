var EventEmitter = require('events').EventEmitter;


module.exports = function watch(func) {
    var events = new EventEmitter;
    var wrapper = function () {
        var args = [].slice.call(arguments);
        var callback = args.pop();

        if (wrapper.running === 0) events.emit('start');
        wrapper.running++;
        events.emit.apply(events, ['call'].concat(arguments));

        args.push(function (err) {
            events.emit.apply(events, ['callback'].concat(arguments));
            if (err) events.emit('error', err);

            wrapper.running--;
            if (wrapper.running === 0) events.emit('drain');

            callback.apply(null, arguments);
        });
    }

    wrapper.running = 0;
    wrapper.events = events;

    wrapper.idle = function () {
        return wrapper.running === 0;
    }

    // Suppress errors as they should be handled by callback anyway
    events.on('error', function (){});

    return wrapper;
}
