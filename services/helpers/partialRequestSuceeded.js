const statusMessages = require('../dictionary/statusMessages');

const partialRequestSuceeded = (allDeletions, allRelationsDeletions, body) => {
  const deactivated = [];
  const relationsRemoved = [];
  allDeletions.filter((item, index) => {
    if (item === 0) deactivated.push(index);
  });
  allRelationsDeletions.filter((item, index) => {
    if (item === 0) relationsRemoved.push(index);
  });
  const failRequests = deactivated.map(item => body[item]);
  return { ...statusMessages.someOfRequestsFail, failRequests };
};

module.exports = partialRequestSuceeded;