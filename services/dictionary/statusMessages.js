const statusMessasges = {
  atLeastOneTestMissing: {
    status: 404, message: 'at least one test could not be found check test: ',
  },
  atLeastOneTestActive: {
    status: 404, message: 'at least one test on your list is already inactive check test: ',
  },
  dbSearchReturnedEmpty: {
  status: 404, message: 'user not found', error: true,
  },
  deleted: {
    status: 200, message: 'deleted with relations removed successfully',
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