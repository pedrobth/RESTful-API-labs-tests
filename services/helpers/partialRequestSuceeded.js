const statusMessages = require('../dictionary/statusMessages');

const partialRequestSuceeded = (allUpdates, body) => {
  const deactivated = [];
  allUpdates.filter((item, index) => {
    if (item === 0) deactivated.push(index);
  });
  const failRequests = deactivated.map((item) => body[item]);
  return { ...statusMessages.someOfRequestsFail, failRequests };
};

module.exports = partialRequestSuceeded;