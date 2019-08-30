import validators from './validators.js';
import errors from './handlers.js';

const interf = {int: 'integer', num: 'number', str: 'string'};

const TypexyProto = {
    set(obj) {
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
        return this;
    }
};

const generateHandler = Interface => {
    const handlerValidator = Object.entries(Interface).reduce((handler, [key, type]) => {
        if (validators[type] === undefined) throw new Error(key + ' type not supported');

        handler[key] = validators[type];
        return handler;
    }, {});

    const handler = {
        set: function (obj, prop, value) {
            if (!handlerValidator[prop]) errors.unspecified(prop);
            else if (!handlerValidator[prop](value)) errors.invalid(prop, value);
            // Do not stop the assignment
            return obj[prop] = value;
        }
    };
    return handler;
};

const Typexy = Interface => new Proxy(TypexyProto, generateHandler(Interface));

export default Typexy;
