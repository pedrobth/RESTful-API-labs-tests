const frisby = require('frisby');
// const mysql = require('mysql2/promise');
const connection = require('./testHelper/connection');
const { LABS, RELATIONS, TESTS } = require('./testHelper/data');

describe('UPDATE tests', () => {
  const URL_TESTS = 'http://localhost:3001/tests';
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
  it('check if API handle a single valid update on tests', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    }]).expect('status', 200);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('success');
  });
  it('check if API handle a valid list to update on tests', async () => {
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
  it('check if API handle values not passed in a list, when updating on tests', async () => {
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
  it('check if API handle bad arguments passed in testNewType field, when updating on tests', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "contagem de hematocritos",
      testNewName: "contagem hematócritos",
      testNewType: 12,
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('mandatory fields in wrong format, check inputs and try it again');
  });
  it('check if API handle invalid old test name, when updating on tests', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "invalid test name",
      testNewName: "contagem hematócritos",
      testNewType: "imagem",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('could not find your request criteria');
  });
  it('check if API handle a huge new test name, when updating on tests', async () => {
    const updateResponse = await frisby.put(URL_TESTS, [{
      testName: "invalid test name",
      testNewName: "contagem hematócritos Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique risus id rhoncus ultrices. Suspendisse posuere auctor nulla, mattis pretium arcu feugiat at. Suspendisse sed pretium erat. Proin porta turpis eros. Vestibulum tincidunt ultrices biam.",
      testNewType: "imagem",
    }]).expect('status', 400);
    const { body } = updateResponse;
    const parsedResponse = JSON.parse(body);
    expect(parsedResponse.message).toBe('could not find your request criteria');
  });
  it('check if API handle values not passed in a list, when updating on tests', async () => {
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
});