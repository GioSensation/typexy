const errors = {
    unspecified: prop => console.warn(`Prop ${prop} is not specified in interface.`),
    invalid: (prop, value) => console.warn(`Value for ${prop} is not in interface spec: ${value}.`),
};

export default errors;
