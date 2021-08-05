const validateInputs = (requiredFields, inputs) => {
  if (!Array.isArray(inputs)) return false;
  if (!inputs.every((i) => Object.values(i))) return false;
  if (!requiredFields.every((field) => inputs
    .every((i) => i[field]))) return false;
  inputsList = inputs.map((input) => Object.values(input))
  if (inputsList.flat().some((input) => input.length > 255)) return false;
    return true;
};

module.exports = validateInputs;