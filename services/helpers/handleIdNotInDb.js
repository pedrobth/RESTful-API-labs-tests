const statusMessages = require('../dictionary/statusMessages');

const handleIdNotInDb = (failMap, body) => {
  const missingInDb = [];
  failMap.filter((item, index) => {
    if (item === undefined) missingInDb.push(index);
  });
  const failRequests = missingInDb.map((item) => body[item])
  return { ...statusMessages.someOfRequestsFail, failRequests };
};

module.exports = handleIdNotInDb;