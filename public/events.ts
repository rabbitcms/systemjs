import {Client} from "../../../../modules/clients/public/js/clients";

export abstract class EventEmitter {
    protected _events: { [event: string]: Function[] } = {};

    protected onSubscribe(eventName: string, fn: Function) {
    }

    /**
     * @param {string} eventName
     * @param {Function} fn
     * @returns {this}
     */
    public subscribe(eventName: string, fn: Function): EventEmitter {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(fn);

        this.onSubscribe(eventName, fn);

        return this;
    }

    /**
     * @param {string} eventName
     * @param {Function} fn
     * @returns {this}
     */
    public unsubscribe(eventName: string, fn: Function): EventEmitter {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter((e) => {
                return e !== fn;
            })
        }

        return this;
    }

    /**
     *
     * @param {string} eventName
     * @param {Function} fn
     * @returns {EventEmitter}
     */
    public once(eventName: string, fn: Function): EventEmitter {
        let func = (...args) => {
            this.unsubscribe(eventName, func);
            fn.apply(null, args);
        };
        this.subscribe(eventName, func);

        return this;
    }

    protected emit(eventName: string, ...args): EventEmitter {
        const event = this._events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.apply(null, args);
            });
        }
        return this;
    }
}

export abstract class StaticEventEmitter {
    protected static _events: { [event: string]: Function[] } = {};

    protected static onSubscribe(eventName: string, fn: Function) {
    }

    /**
     * @param {string} eventName
     * @param {Function} fn
     */
    public static subscribe(eventName: string, fn: Function) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(fn);

        this.onSubscribe(eventName, fn);
    }

    /**
     * @param {string} eventName
     * @param {Function} fn
     */
    public static unsubscribe(eventName: string, fn: Function) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(e => e !== fn)
        }
    }

    /**
     *
     * @param {string} eventName
     * @param {Function} fn
     */
    public static once(eventName: string, fn: Function) {
        let func = (...args) => {
            this.unsubscribe(eventName, func);
            fn.apply(null, args);
        };
        this.subscribe(eventName, func);

    }

    protected static emit(eventName: string, ...args) {
        const event = this._events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.apply(null, args);
            });
        }
    }


}

