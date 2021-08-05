const statusMessages = require('../dictionary/statusMessages');

const partialRequestSuceeded = (allUpdates, body) => {
  const deactivated = [];
  allUpdates.filter((item, index) => {
    if (item === 0) deactivated.push(index);
  });
  console.log('partialRequest:', deactivated, body)
  // check if can be changed by body[index], only
  const failRequests = deactivated.map((item) => body[item]['labName'] || body[index]['testName']);
  console.log('Request FAILED:', failRequests)
  return { ...statusMessages.someOfRequestsFail, failRequests };
};

module.exports = partialRequestSuceeded;