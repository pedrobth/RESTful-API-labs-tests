# RESTful API following MSC architecture
    A simple API developed for educational purpuse

## Decisions:
    The solution was implemented using Node.js

### Frameworks, libraries and packages
    
    - Express framework (to help with the REST architectural style).
    - Cors (to help with the security and comunication with browser - ensures that we will send the right headers).
    - dotenv (to help with a secure environment configuration).
    - mysql2 

## The problem:
    Laboratories and exams in sistem must have its availability consulted.

    the API allows to:
    Laboratories:
    - insert a new laboratory (via POST in /laboratories)
    - consult active laboratories (via GET in /laboratories)
    - update a laboratory information (via PUT in /laboratories:<name>)
    - change laboratory status (via PUT in /laboratories/status:<name>)
    Tests:
    - insert a new test (via POST in /tests)
    - consult active tests (via GET in /tests)
    - update a test information (via PUT in /tests:<name>)
    - change test status (via PUT in /tests/status:<name>)

### Usage
