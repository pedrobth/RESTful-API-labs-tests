const frisby = require('frisby');
const { connect } = require('../controllers/getActiveLabs');
// const mysql = require('mysql2/promise');
const connection = require('./testHelper/connection');
const { LABS, RELATIONS, TESTS } = require('./testHelper/data');

const URL_LABS = 'http://localhost:3001/lab';
const URL_TESTS = 'http://localhost:3001/tests';
const INSERTED_LABS = [
  { id: 1, address: LABS[0].address, lab_name: LABS[0].labName },
  { id: 2, address: LABS[1].address, lab_name: LABS[1].labName },
  { id: 3, address: LABS[2].address, lab_name: LABS[2].labName },
  { id: 4, address: LABS[3].address, lab_name: LABS[3].labName },
];
const INSERTED_TESTS = [
  { id: 1, test_type: TESTS[0].testType, test_name: TESTS[0].testName, active: 1},
  { id: 2, test_type: TESTS[1].testType, test_name: TESTS[1].testName, active: 1},
  { id: 3, test_type: TESTS[2].testType, test_name: TESTS[2].testName, active: 1},
  { id: 4, test_type: TESTS[3].testType, test_name: TESTS[3].testName, active: 1},
];
const LOREM = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, s';

describe('UPDATE labs', () => {
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO laboratories (address, lab_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      LABS[0].address, LABS[0].labName,
      LABS[1].address, LABS[1].labName,
      LABS[2].address, LABS[2].labName,
      LABS[3].address, LABS[3].labName,
    ]);
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      TESTS[0].testType, TESTS[0].testName,
      TESTS[1].testType, TESTS[1].testName,
      TESTS[2].testType, TESTS[2].testName,
      TESTS[3].testType, TESTS[3].testName,
    ]);
    await connection.execute('INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)', [
      RELATIONS[0].laboratoryId, RELATIONS[0].testId,
      RELATIONS[1].laboratoryId, RELATIONS[1].testId,
      RELATIONS[2].laboratoryId, RELATIONS[2].testId,
      RELATIONS[3].laboratoryId, RELATIONS[3].testId,
      RELATIONS[4].laboratoryId, RELATIONS[4].testId,
      RELATIONS[5].laboratoryId, RELATIONS[5].testId,
    ]);
    
  });
  it('put on /labs route handle a single valid update on labs', async () => {
    const updateResponse = await frisby.put(URL_LABS, [{
      labId: 1,
      labName: "Ipanema Center",
      address: "imagem",
    }]).expect('status', 200);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('put on /labs route handle a valid list to update on labs', async () => {
    const updateResponse = await frisby.put(URL_LABS, [{
      labId: 1,
      labName: "DASA Niteroi centro",
      address: "imagem",
    },{
      labId: 2,
      labName: "ressonância magnética",
      address: "imagem",
    }]).expect('status', 200);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('put on /labs route handle bad inputs -> values not passed in a list', async () => {
    const updateResponse = await frisby.put(URL_LABS, {
      labId: 1,
      labName: "DASA Niteroi centro",
      address: "Av. Dos testes, 1248",
    },{
      labId: 2,
      labName: "DASA Iapnema",
      address: "R. Amostras, 1248",
    }).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('put on /labs route handle bad inputs -> empty new address', async () => {
    const updateResponse = await frisby.put(URL_LABS, [{
      labId: 1,
      labName: "DASA Iapnema",
      address: "",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('put on /labs route handle bad inputs -> invalid lab id', async () => {
    const updateResponse = await frisby.put(URL_LABS, [{
      labId: 1,
      labName: "DASA some center",
      address: LABS[3].address,
    },{
      labId: -1,
      labName: "invalid input",
      address: LABS[3].address,
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('at least one request fail');
    expect(parsedResponse.failRequests[0]).toMatchObject({
      labId: -1,
      labName: "invalid input",
      address: LABS[3].address,
    });
  });
  it('put on /labs route handle bad inputs -> a huge new lab name', async () => {
    const updateResponse = await frisby.put(URL_LABS, [{
      labId: 1,
      labName: "contagem hematócritos",
      address: "imagem",
    },{
      labId: 2,
      labName: LOREM,
      address: "imagem",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
});

describe('GET labs', () => {
  beforeEach(async () => {
    connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM laboratories');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE laboratories AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO laboratories (address, lab_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      LABS[0].address, LABS[0].labName,
      LABS[1].address, LABS[1].labName,
      LABS[2].address, LABS[2].labName,
      LABS[3].address, LABS[3].labName,
    ]);
  });
  it('route /labs exists, accept get and return the expected body', async () => {
    const getLabsResponse = await frisby.get(URL_LABS);
    expect(getLabsResponse.status).not.toBe(404);
    const { body } = getLabsResponse;
    const getLabsParsed = JSON.parse(body);
    expect(getLabsParsed.length).not.toBe(0);
    expect(getLabsParsed.message).toMatchObject(INSERTED_LABS);
  });
  it('route /labs return only active tests', async () =>{
    await connection.execute('UPDATE laboratories SET laboratories.active=false WHERE lab_name=?', [INSERTED_LABS[0].lab_name]);
    const getLabsResponse = await frisby.get(URL_LABS);
    expect(getLabsResponse.status).toBe(200);
    const { body } = getLabsResponse;
    const getLabsParsed = JSON.parse(body);
    expect(getLabsParsed.message).not.toMatchObject(INSERTED_LABS[0]);
  });
});

describe('INSERT labs', () => {
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
  });
  it('route /labs accept post and returns expected value', async () => {
    const postTestsResponse = await frisby.post(URL_LABS, [
      { address: LABS[0].address, labName: LABS[0].labName },
      { address: LABS[1].address, labName: LABS[1].labName },
      { address: LABS[2].address, labName: LABS[2].labName },
      { address: LABS[3].address, labName: LABS[3].labName },
    ]);
    expect(postTestsResponse.status).toBe(201);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('created successfully with the following ids: ');
    expect(postTestsParsed.ids.length).toBe(4);
    expect(typeof postTestsParsed.ids[0]).toBe('number');
  });
  it('post on /labs route handle bad inputs -> empty body', async () => {
    const postTestsResponse = await frisby.post(URL_LABS)
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /labs route handle bad inputs -> labs out of a list', async () => {
    const postTestsResponse = await frisby.post(URL_LABS,
      { address: LABS[0].address, labName: LABS[0].labName },
      { address: LABS[1].address, labName: LABS[1].labName },
    );
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /labs route handle bad inputs -> empty lab adress', async () => {
    const postTestsResponse = await frisby.post(URL_LABS,
      { address: LABS[0].address, labName: LABS[0].labName },
      { address: LABS[1].address, labName: LABS[1].labName },
      { address: '', labName: LABS[2].labName },
      { address: LABS[3].address, labName: LABS[3].labName },
    );
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /labs route handle bad inputs -> empty lab name', async () => {
    const postTestsResponse = await frisby.post(URL_LABS,
      { address: LABS[0].address, labName: LABS[0].labName },
      { address: LABS[1].address, labName: LABS[1].labName },
      { address: LABS[1].address, labName: '' },
      { address: LABS[3].address, labName: LABS[3].labName },
    );
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /labs route handle bad inputs -> huge lab name', async () => {
    const postTestsResponse = await frisby.post(URL_LABS, [
      { address: LABS[0].address, labName: LABS[0].labName },
      { address: LABS[1].address, labName: LOREM },
      { address: LABS[1].address, labName: LABS[2].labName },
      { address: LABS[3].address, labName: LABS[3].labName },
    ]);
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
});

describe('DELETE labs', () => {
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO laboratories (address, lab_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      LABS[0].address, LABS[0].labName,
      LABS[1].address, LABS[1].labName,
      LABS[2].address, LABS[2].labName,
      LABS[3].address, LABS[3].labName,
    ]);
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      TESTS[0].testType, TESTS[0].testName,
      TESTS[1].testType, TESTS[1].testName,
      TESTS[2].testType, TESTS[2].testName,
      TESTS[3].testType, TESTS[3].testName,
    ]);
    await connection.execute('INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)', [
      RELATIONS[0].laboratoryId, RELATIONS[0].testId,
      RELATIONS[1].laboratoryId, RELATIONS[1].testId,
      RELATIONS[2].laboratoryId, RELATIONS[2].testId,
      RELATIONS[3].laboratoryId, RELATIONS[3].testId,
      RELATIONS[4].laboratoryId, RELATIONS[4].testId,
      RELATIONS[5].laboratoryId, RELATIONS[5].testId,
    ]);
  });
  it('delete on /labs route remove a single lab successfully', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS, [
      { labName: LABS[1].labName },
    ]).expect('status', 200);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('deleted with relations removed successfully');
  });
  it('delete on /labs route remove a labs lists successfully', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS, [
      { labName: LABS[1].labName },
    ]).expect('status', 200);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('deleted with relations removed successfully');
  });
  it('delete on /labs route handle bad inputs -> empty body', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS)
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /labs route handle bad inputs -> labs out of a list', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS,
      { labName: LABS[0].labName },
      { labName: LABS[1].labName },
      { labName: LABS[2].labName },
      { labName: LABS[3].labName },
    );
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /labs route handle bad inputs -> invalid lab name', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS,
      { labName: LABS[0].labName },
      { labName: LABS[1].labName },
      { labName: `invalid Lab${LABS[2].labName}` },
      { labName: LABS[3].labName },
    );
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /labs route handle bad inputs -> empty lab name', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS,
      { labName: LABS[0].labName },
      { labName: '' },
      { labName: LABS[2].labName },
      { labName: LABS[3].labName },
    );
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /labs route handle bad inputs -> huge lab name', async () => {
    const deleteTestsResponse = await frisby.delete(URL_LABS, [
      { labName: LABS[0].labName },
      { labName: LOREM },
      { labName: LABS[2].labName },
      { labName: LABS[3].labName },
    ]);
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
});

describe('REMOVE laboratory tests associations', () => {
  const URL_LAB_1 = `http://localhost:3001/associate/${LABS[0].labName}`;
  const URL_LAB_2 = `http://localhost:3001/associate/${LABS[1].labName}`;
  const URL_LAB_3 = `http://localhost:3001/associate/${LABS[3].labName}`;
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO laboratories (address, lab_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
        LABS[0].address, LABS[0].labName,
        LABS[1].address, LABS[1].labName,
        LABS[2].address, LABS[2].labName,
        LABS[3].address, LABS[3].labName,
      ]);
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
        TESTS[0].testType, TESTS[0].testName,
        TESTS[1].testType, TESTS[1].testName,
        TESTS[2].testType, TESTS[2].testName,
        TESTS[3].testType, TESTS[3].testName,
        ]
      );
    await connection.execute('INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)', [
        RELATIONS[0].laboratoryId, RELATIONS[0].testId,
        RELATIONS[1].laboratoryId, RELATIONS[1].testId,
        RELATIONS[2].laboratoryId, RELATIONS[2].testId,
        RELATIONS[3].laboratoryId, RELATIONS[3].testId,
        RELATIONS[4].laboratoryId, RELATIONS[4].testId,
        RELATIONS[5].laboratoryId, RELATIONS[5].testId,
      ]);
    
  });
  it('delete on /associate route handle a single association remove', async () => {
    const postResponse = await frisby.delete(URL_LAB_1, [{
      testName: TESTS[0].testName,
    }]).expect('status', 200);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('delete on /associate route handle a list of associations remove', async () => {
    const postResponse = await frisby.delete(URL_LAB_1, [{
      testName: TESTS[0].testName,
    },{
      testName: TESTS[1].testName
    }]).expect('status', 200);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('delete on /associate route handle bad inputs -> values not passed in a list', async () => {
    const postResponse = await frisby.delete(URL_LAB_1, { badEntry: 5 })
      .expect('status', 400);
      const { body } = postResponse;
      const parsedResponse = JSON.parse(body);
      expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /associate route handle bad inputs -> bad arguments passed', async () => {
    const postResponse = await frisby.delete(URL_LAB_2, [{ badEntry: 5 }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /associate route handle bad inputs -> invalid laboratory name', async () => {
    const postResponse = await frisby.delete(`${URL_LAB_3} InvalidLabName`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('could not find your request criteria');
  });
  it('delete on /associate route handle bad inputs -> invalid test name', async () => {
    const postResponse = await frisby.delete(URL_LAB_3, [{ testName: `${TESTS[0].testName} InvalidTestName` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('could not find your request criteria');
  });
  it('delete on /associate route handle bad inputs -> huge laboratory name', async () => {
    const postResponse = await frisby.delete(`${URL_LAB_3} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('could not find your request criteria');
  });
  it('delete on /associate route handle bad inputs -> huge test name', async () => {
    const postResponse = await frisby.delete(URL_LAB_3, [{ testName: `${TESTS[0].testName}  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('could not find your request criteria');
  });
});

describe('INSERT laboratory tests associations', () => {
  const URL_ASSOC_1 = `http://localhost:3001/associate/${LABS[0].labName}`;
  const URL_ASSOC_2 = `http://localhost:3001/associate/${LABS[1].labName}`;
  const URL_ASSOC_4 = `http://localhost:3001/associate/${LABS[3].labName}`;
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO laboratories (address, lab_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
        LABS[0].address, LABS[0].labName,
        LABS[1].address, LABS[1].labName,
        LABS[2].address, LABS[2].labName,
        LABS[3].address, LABS[3].labName,
      ]);
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
        TESTS[0].testType, TESTS[0].testName,
        TESTS[1].testType, TESTS[1].testName,
        TESTS[2].testType, TESTS[2].testName,
        TESTS[3].testType, TESTS[3].testName,
        ]
      );
    await connection.execute('INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)', [
        RELATIONS[0].laboratoryId, RELATIONS[0].testId,
        RELATIONS[1].laboratoryId, RELATIONS[1].testId,
        RELATIONS[2].laboratoryId, RELATIONS[2].testId,
        RELATIONS[3].laboratoryId, RELATIONS[3].testId,
        RELATIONS[4].laboratoryId, RELATIONS[4].testId,
        RELATIONS[5].laboratoryId, RELATIONS[5].testId,
      ]);
    
  });
  it('post on /associate route handle a single association', async () => {
    const postResponse = await frisby.post(URL_ASSOC_4, [{
      testName: TESTS[0].testName,
    }]).expect('status', 201);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations successfully created');
  });
  it('post on /associate route handle a list of associations', async () => {
    const postResponse = await frisby.post(URL_ASSOC_4, [{
      testName: TESTS[0].testName,
    },{
      testName: TESTS[2].testName
    }]).expect('status', 201);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations successfully created');
  });
  it('post on /associate route handle bad inputs -> values not passed in a list', async () => {
    const postResponse = await frisby.post(URL_ASSOC_1, { badEntry: 5 })
      .expect('status', 400);
      const { body } = postResponse;
      const parsedResponse = JSON.parse(body);
      expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /associate route handle bad inputs -> bad arguments passed', async () => {
    const postResponse = await frisby.post(URL_ASSOC_2, [{ badEntry: 5 }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /associate route handle bad inputs -> repeated association', async () => {
    const postResponse = await frisby.post(URL_ASSOC_1, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('at least one association requested already exists');
  });
  it('post on /associate route handle bad inputs -> invalid laboratory name', async () => {
    const postResponse = await frisby.post(`${URL_ASSOC_4} InvalidLabName`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
  it('post on /associate route handle bad inputs -> invalid test name', async () => {
    const postResponse = await frisby.post(URL_ASSOC_4, [{ testName: `${TESTS[0].testName} InvalidTestName` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
  it('post on /associate route handle bad inputs -> huge laboratory name', async () => {
    const postResponse = await frisby.post(`${URL_ASSOC_4} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
  it('post on /associate route handle bad inputs -> huge test name', async () => {
    const postResponse = await frisby.post(URL_ASSOC_4, [{ testName: `${TESTS[0].testName}  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
});

describe('UPDATE tests', () => {
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO laboratories (address, lab_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
        LABS[0].address, LABS[0].labName,
        LABS[1].address, LABS[1].labName,
        LABS[2].address, LABS[2].labName,
        LABS[3].address, LABS[3].labName,
      ]);
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      TESTS[0].testType, TESTS[0].testName,
      TESTS[1].testType, TESTS[1].testName,
      TESTS[2].testType, TESTS[2].testName,
      TESTS[3].testType, TESTS[3].testName,
    ]);
    await connection.execute('INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)', [
      RELATIONS[0].laboratoryId, RELATIONS[0].testId,
      RELATIONS[1].laboratoryId, RELATIONS[1].testId,
      RELATIONS[2].laboratoryId, RELATIONS[2].testId,
      RELATIONS[3].laboratoryId, RELATIONS[3].testId,
      RELATIONS[4].laboratoryId, RELATIONS[4].testId,
      RELATIONS[5].laboratoryId, RELATIONS[5].testId,
    ]);
    
  });
  it('put on /tests route handle a single valid update on tests', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    }]).expect('status', 200);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('put on /tests route handle a valid list to update on tests', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    },{
      testName: "ressonancia magnética",
      testNewName: "ressonância magnética",
      testNewType: "imagem",
    }]).expect('status', 200);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('put on /tests route handle bad inputs -> values not passed in a list', async () => {
    const updateResponse = await frisby.put(URL_TESTS, {
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    },{
      testName: "ressonancia magnética",
      testNewName: "ressonância magnética",
      testNewType: "imagem",
    }).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('put on /tests route handle bad inputs -> invalid testNewType', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: 12,
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields in wrong format, check inputs and try it again');
  });
  it('put on /tests route handle bad inputs -> invalid old test name', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "invalid test name",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('at least one request fail');
    expect(parsedResponse.failRequests[0].testName).toBe('invalid test name');
  });
  it('put on /tests route handle bad inputs -> a huge new test name', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    },{
      testName: "ressonancia magnética",
      testNewName: LOREM,
      testNewType: "imagem",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('some of field data exceeds characters limit');
  });
  it('put on /tests route handle bad inputs -> a huge old test name', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    },{
      testName: LOREM,
      testNewName: "ressonância magnética",
      testNewType: "imagem",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('at least one request fail');
    expect(parsedResponse.failRequests[0].testName).toBe(LOREM)
  });
});

describe('GET tests', () => {
  beforeEach(async () => {
    connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      TESTS[0].testType, TESTS[0].testName,
      TESTS[1].testType, TESTS[1].testName,
      TESTS[2].testType, TESTS[2].testName,
      TESTS[3].testType, TESTS[3].testName,
    ]);
  });
  it('route /tests exists, accept get and return the expected body', async () => {
    const getTestsResponse = await frisby.get(URL_TESTS)
    expect(getTestsResponse.status).not.toBe(404);
    const { body } = getTestsResponse;
    const getTestsParsed = JSON.parse(body);
    expect(getTestsParsed.length).not.toBe(0);
    expect(getTestsParsed.message).toMatchObject(INSERTED_TESTS);
  });
  it('route /tests return only active tests', async () => {
  await connection.execute('UPDATE tests SET tests.active=false WHERE test_name=?', [INSERTED_TESTS[0].test_name]);
  const getTestsResponse = await frisby.get(URL_LABS);
  expect(getTestsResponse.status).toBe(200);
  const { body } = getTestsResponse;
  const getTestsParsed = JSON.parse(body);
  expect(getTestsParsed.message).not.toMatchObject(INSERTED_TESTS[0]);
  });
});

describe('INSERT tests', () => {
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
  });
  it('route /tests accept post and returns expected value', async () => {
    const postTestsResponse = await frisby.post(URL_TESTS, [
        { testType: TESTS[0].testType, testName: TESTS[0].testName },
        { testType: TESTS[1].testType, testName: TESTS[1].testName },
        { testType: TESTS[2].testType, testName: TESTS[2].testName },
        { testType: TESTS[3].testType, testName: TESTS[3].testName },
    ]);
    expect(postTestsResponse.status).toBe(201);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('created successfully with the following ids: ');
    expect(postTestsParsed.ids.length).toBe(4);
    expect(typeof postTestsParsed.ids[0]).toBe('number');
  });
  it('post on /tests route handle bad inputs -> empty body', async () => {
    const postTestsResponse = await frisby.post(URL_TESTS)
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /tests route handle bad inputs -> tests out of a list', async () => {
    const postTestsResponse = await frisby.post(URL_TESTS,
      { testType: TESTS[0].testType, testName: TESTS[0].testName },
      { testType: TESTS[1].testType, testName: TESTS[1].testName },
      { testType: TESTS[2].testType, testName: TESTS[2].testName },
      { testType: TESTS[3].testType, testName: TESTS[3].testName },
    );
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /tests route handle bad inputs -> invalid test type', async () => {
    const postTestsResponse = await frisby.post(URL_TESTS,
      { testType: TESTS[0].testType, testName: TESTS[0].testName },
      { testType: TESTS[1].testType, testName: TESTS[1].testName },
      { testType: 'invalidType', testName: TESTS[2].testName },
      { testType: TESTS[3].testType, testName: TESTS[3].testName },
    );
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /tests route handle bad inputs -> empty test type', async () => {
    const postTestsResponse = await frisby.post(URL_TESTS,
      { testType: TESTS[0].testType, testName: TESTS[0].testName },
      { testType: TESTS[1].testType, testName: TESTS[1].testName },
      { testType: '', testName: TESTS[2].testName },
      { testType: TESTS[3].testType, testName: TESTS[3].testName },
    );
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('post on /tests route handle bad inputs -> huge test name', async () => {
    const postTestsResponse = await frisby.post(URL_TESTS, [
      { testType: TESTS[0].testType, testName: TESTS[0].testName },
      { testType: TESTS[1].testType, testName: LOREM },
      { testType: TESTS[1].testType, testName: TESTS[2].testName },
      { testType: TESTS[3].testType, testName: TESTS[3].testName },
    ]);
    expect(postTestsResponse.status).toBe(400);
    const { body } = postTestsResponse;
    const postTestsParsed = JSON.parse(body);
    expect(postTestsParsed.message).toBe('some of field data exceeds characters limit');
  });
});

describe('DELETE tests', () => {
  beforeEach(async () => {
    await connection.execute('DELETE FROM tests_laboratories');
    await connection.execute('DELETE FROM tests');
    await connection.execute('ALTER TABLE tests_laboratories AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE tests AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO tests (test_type, test_name) VALUES (?, ?), (?, ?), (?, ?), (?, ?)', [
      TESTS[0].testType, TESTS[0].testName,
      TESTS[1].testType, TESTS[1].testName,
      TESTS[2].testType, TESTS[2].testName,
      TESTS[3].testType, TESTS[3].testName,
    ]);
    await connection.execute('INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)', [
      RELATIONS[0].laboratoryId, RELATIONS[0].testId,
      RELATIONS[1].laboratoryId, RELATIONS[1].testId,
      RELATIONS[2].laboratoryId, RELATIONS[2].testId,
      RELATIONS[3].laboratoryId, RELATIONS[3].testId,
      RELATIONS[4].laboratoryId, RELATIONS[4].testId,
      RELATIONS[5].laboratoryId, RELATIONS[5].testId,
    ]);
  });
  it('delete on /tests route remove a single test successfully', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS, [
      { testName: TESTS[1].testName },
    ]).expect('status', 200);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('deleted with relations removed successfully');
  });
  it('delete on /tests route remove a tests lists successfully', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS, [
      { testName: TESTS[1].testName },
    ]).expect('status', 200);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('deleted with relations removed successfully');
  });
  it('delete on /tests route handle bad inputs -> empty body', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS)
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /tests route handle bad inputs -> tests out of a list', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS,
      { testName: TESTS[0].testName },
      { testName: TESTS[1].testName },
      { testName: TESTS[2].testName },
      { testName: TESTS[3].testName },
    );
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /tests route handle bad inputs -> invalid test type', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS,
      { testName: TESTS[0].testName },
      { testName: TESTS[1].testName },
      { testName: TESTS[2].testName },
      { testName: TESTS[3].testName },
    );
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /tests route handle bad inputs -> empty test type', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS,
      { testName: TESTS[0].testName },
      { testName: TESTS[1].testName },
      { testName: TESTS[2].testName },
      { testName: TESTS[3].testName },
    );
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('delete on /tests route handle bad inputs -> huge test name', async () => {
    const deleteTestsResponse = await frisby.delete(URL_TESTS, [
      { testName: TESTS[0].testName },
      { testName: LOREM },
      { testName: TESTS[2].testName },
      { testName: TESTS[3].testName },
    ]);
    expect(deleteTestsResponse.status).toBe(400);
    const { body } = deleteTestsResponse;
    const deleteTestsParsed = JSON.parse(body);
    expect(deleteTestsParsed.message).toBe('at least one request fail');
    expect(deleteTestsParsed.failRequests[0].testName).toBe(LOREM);
  });
});