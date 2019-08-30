const validators = {
    integer: val => Number.isInteger(val),
    number: val => typeof val === 'number',
    string: val => typeof val === 'string',
};

export default validators;
