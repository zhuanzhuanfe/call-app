/**
 * Created by luyunhai on 2018/11/8.
 */
export const Event = {
    _events: {},
    on (name, callback) {
        console.log('Event on ' + name);
        this._events[name] = callback;
    },
    emit (name, args) {
        console.log('Event emit ' + name, args);
        this._events[name] && this._events[name](args);
    }
};
