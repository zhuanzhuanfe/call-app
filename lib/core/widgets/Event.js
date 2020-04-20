"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;

/**
 * Created by luyunhai on 2018/11/8.
 */
var Event = {
  _events: {},
  on: function on(name, callback) {
    this._events[name] = callback;
  },
  emit: function emit(name, args) {
    this._events[name] && this._events[name](args);
  }
};
exports.Event = Event;