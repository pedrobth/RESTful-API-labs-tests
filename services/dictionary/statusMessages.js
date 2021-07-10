const statusMessasges = {
  alreadyAssociated: {
    status: 404, message: 'at leat one of the associations already exists, review your request and try it again',
  },
  associationCreated: {
    status: 201, message: 'associations successfully created',
  },
  atLeastOneLabActive: {
    status: 404, message: 'at least one lab on your list is already inactive check lab: ',
  },
  atLeastOneTestActive: {
    status: 404, message: 'at least one test on your list is already inactive check test: ',
  },
  atLeastOneLabMissing: {
    status: 404, message: 'at least one laboratory could not be found check laboratory: ',
  },
  atLeastOneTestMissing: {
    status: 404, message: 'at least one test could not be found check test: ',
  },
  ER_BAD_NULL_ERROR: {
    status: 400, message: 'associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs',
  },
  created: {
    status: 201, message: 'created successfully with the following respectively ids: ',
  },
  dbSearchReturnedEmpty: {
  status: 404, message: 'user not found', error: true,
  },
  deleted: {
    status: 200, message: 'deleted with relations removed successfully',
  },
  ER_DUP_ENTRY: {
    status: 400, message: 'at least one association requested already exists',
  },
  failOnInsertion: {
    status: 500, message: 'internal server error',
  },
  failOnUpdate: {
    status: 500, message: 'internal server error',
  },
  missingFields: {
    status: 400, message: 'mandatory fields missing or in wrong format, check inputs and try it again',
  },
  labNotInDbOrInactive: {
    status: 400, message: 'laboratory name not found or laboratory is inactive, and should not be associted to any test.',
  },
  updated: {
    status: 200, message: 'success',
  },
};

module.exports = statusMessasges;