'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by luyunhai on 2018/11/8.
 */
var Event = exports.Event = {
    _events: {},
    on: function on(name, callback) {
        console.log('Event on ' + name);
        this._events[name] = callback;
    },
    emit: function emit(name, args) {
        console.log('Event emit ' + name, args);
        this._events[name] && this._events[name](args);
    }
};