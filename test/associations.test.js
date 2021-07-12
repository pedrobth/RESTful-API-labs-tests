const frisby = require('frisby');
const mysql = require('mysql2/promise');
// const createDb = require('./testHelper/jestConnection');
const connection = require('./testHelper/connection');
const { LABS, RELATIONS, TESTS } = require('./testHelper/data');


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
  it('check a single valid associations can be removed', async () => {
    const postResponse = await frisby.delete(URL_LAB_1, [{
      testName: TESTS[0].testName,
    }]).expect('status', 200);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('check 2 new valid associations can be removed', async () => {
    const postResponse = await frisby.delete(URL_LAB_1, [{
      testName: TESTS[0].testName,
    },{
      testName: TESTS[1].testName
    }]).expect('status', 200);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('application handle values not passed in a list', async () => {
    const postResponse = await frisby.delete(URL_LAB_1, { badEntry: 5 })
      .expect('status', 400);
      const { body } = postResponse;
      const parsedResponse = JSON.parse(body);
      expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('application handle bad arguments passed', async () => {
    const postResponse = await frisby.delete(URL_LAB_2, [{ badEntry: 5 }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('application handle invalid association deletion -> invalid laboratory name', async () => {
    const postResponse = await frisby.delete(`${URL_LAB_3} InvalidLabName`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('invalid request');
  });
  it('application handle invalid association deletion -> invalid test name', async () => {
    const postResponse = await frisby.delete(URL_LAB_3, [{ testName: `${TESTS[0].testName} InvalidTestName` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('invalid request');
  });
  it('application handle invalid association deletion -> too big invalid laboratory name', async () => {
    const postResponse = await frisby.delete(`${URL_LAB_3} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('invalid request');
  });
  it('application handle invalid association deletion -> too big invalid test name', async () => {
    const postResponse = await frisby.delete(URL_LAB_3, [{ testName: `${TESTS[0].testName}  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('invalid request');
  });
});

describe('INSERT laboratory tests associations', () => {
  const URL_LAB_1 = `http://localhost:3001/associate/${LABS[0].labName}`;
  const URL_LAB_2 = `http://localhost:3001/associate/${LABS[1].labName}`;
  const URL_LAB_4 = `http://localhost:3001/associate/${LABS[3].labName}`;
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
  it('check a single valid associations can be inserted', async () => {
    const postResponse = await frisby.post(URL_LAB_4, [{
      testName: TESTS[0].testName,
    }]).expect('status', 201);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations successfully created');
  });
  it('check 2 new valid associations can be inserted', async () => {
    const postResponse = await frisby.post(URL_LAB_4, [{
      testName: TESTS[0].testName,
    },{
      testName: TESTS[2].testName
    }]).expect('status', 201);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations successfully created');
  });
  it('application handle values not passed in a list', async () => {
    const postResponse = await frisby.post(URL_LAB_1, { badEntry: 5 })
      .expect('status', 400);
      const { body } = postResponse;
      const parsedResponse = JSON.parse(body);
      expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('application handle bad arguments passed', async () => {
    const postResponse = await frisby.post(URL_LAB_2, [{ badEntry: 5 }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields missing or in wrong format, check inputs and try it again');
  });
  it('application handle invalid association -> repeated association', async () => {
    const postResponse = await frisby.post(URL_LAB_1, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('at least one association requested already exists');
  });
  it('application handle invalid association -> invalid laboratory name', async () => {
    const postResponse = await frisby.post(`${URL_LAB_4} InvalidLabName`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
  it('application handle invalid association -> invalid test name', async () => {
    const postResponse = await frisby.post(URL_LAB_4, [{ testName: `${TESTS[0].testName} InvalidTestName` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
  it('application handle invalid association -> too big invalid laboratory name', async () => {
    const postResponse = await frisby.post(`${URL_LAB_4} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.`, [{ testName: TESTS[0].testName }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
  it('application handle invalid association -> too big invalid test name', async () => {
    const postResponse = await frisby.post(URL_LAB_4, [{ testName: `${TESTS[0].testName}  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.` }])
      .expect('status', 400);
    const { body } = postResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('associations between inactive or out of database laboratory or between valid laboratory and inactive or out of databse test is forbiden. check your inputs');
  });
});