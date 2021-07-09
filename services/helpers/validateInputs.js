const validateInputs = (requiredFields, inputs) => {
  if (!inputs.every((i) => Object.values(i))) return false;
  if (!requiredFields.every((field) => inputs
    .every((input) => input[field]))) return false;
  return true;
};

module.exports = validateInputs;