const statusMessasges = {
  associationCreated: {
    status: 201, message: 'associations successfully created',
  },
  created: {
    status: 201, message: 'created successfully with the following ids: ',
  },
  dbSearchReturnedEmpty: {
    status: 404, message: 'user not found', error: true,
  },
  deleted: {
    status: 200, message: 'deleted with relations removed successfully',
  },
  ER_BAD_FIELD_ERROR: {
    status: 400, message: 'associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs',
  },
  ER_BAD_NULL_ERROR: {
    status: 400, message: 'associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs',
  },
  ER_DATA_TOO_LONG: {
    status: 400, message: 'some of field data exceeds characters limit',
  },
  ER_DUP_ENTRY: {
    status: 400, message: 'at least one association requested already exists',
  },
  ER_BAD_INPUT: {
    status: 400, message: 'mandatory fields in wrong format, check inputs and try it again',
  },
  failOnInsertion: {
    status: 500, message: 'internal server error',
  },
  idNotInDatabase: {
    status: 400, message: 'At least one Id in your request cannot be found'
  },
  labDeletedNoAssiciationFound: {
    status: 200, message: 'laboratory removed. WARNING: "could not find any relation with tests"'
  },
  missingFields: {
    status: 400, message: 'mandatory fields missing or in wrong format, check inputs and try it again',
  },
  someOfRequestsFail: {
    status: 400, message: 'at least one request fail'
  },
  testDeletedNoAssociationFound: {
    status: 200, message: 'test removed. WARNING: "could not find any relation with any laboratory"'
  },
  updated: {
    status: 200, message: 'success',
  },
  zeroAffectedRows: {
    status: 400, message: 'could not find your request criteria'
  }
};

module.exports = statusMessasges;