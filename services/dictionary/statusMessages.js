const statusMessasges = {
  dbSearchReturnedEmpty: {
  status: 404, message: 'user not found', error: true,
  },
  atLeastOneTestMissing: {
    status: 404, message: 'at least one test could not be found check test: ',
  },
  updated: {
    status: 200, message: 'success',
  },
  failOnInsertion: {
    status: 500, message: 'internal server error',
  },
  failOnUpdate: {
    status: 500, message: 'internal server error',
  },
  created: {
    status: 201, message: 'created successfully',
  }
};

module.exports = statusMessasges;