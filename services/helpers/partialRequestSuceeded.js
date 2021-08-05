const statusMessages = require('../dictionary/statusMessages');

const partialRequestSuceeded = (allUpdates, body) => {
  const deactivated = [];
  allUpdates.filter((item, index) => {
    if (item === 0) deactivated.push(index);
  });
  const failRequests = deactivated.map((_item, index) => body[index]['labName'] || body[index]['testName']);
  console.log('Request FAILED:', failRequests)
  return { ...statusMessages.someOfRequestsFail, failRequests };
};

module.exports = partialRequestSuceeded;