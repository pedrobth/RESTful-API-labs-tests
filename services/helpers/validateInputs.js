const validateInputs = (requiredFields, inputs) => {
  console.log((inputs));
  if (!Array.isArray(inputs)) return false;
  if (!inputs.every((i) => Object.values(i))) return false;
  if (!requiredFields.every((field) => inputs
    .every((i) => i[field]))) return false;
  return true;
};

module.exports = validateInputs;