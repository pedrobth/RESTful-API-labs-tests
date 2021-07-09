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
    - update a laboratory information (via PUT in /laboratories)
    - change laboratory status (via PUT in /laboratories/status)
    Tests:
    - insert a new test (via POST in /tests)
    - consult active tests (via GET in /tests)
    - update a test information (via PUT in /tests)
    - change test status (via PUT in /tests/status)

### Usage

#### get tests or laboratories:
    The api does not have any sign in for user, so a jwt validation didn't sound reasonable. Although if something similar get in production the aplication would be exposed and vulnerable.

    A simple get at /lab will return active laboratories.

    A simple get at /tests will return active tests.

#### update tests or laboratory:

    The API expect to recieve a list with the updates inside the request body. If you want to update only one test or laboratory, just provide the list containing one object.
    E.g.
    [{
	    "testName": "ressonancia magnetic",
	    "testNewName": "ressonância magnética",
	    "testNewType": "imagem"
    },
    {
	    "testName": "tomografia computadorizzzada",
	    "testNewName": "tomografia computadorizada",
	    "testNewType": "imagem"
    }]


    [{
	    "labName": "DASA leblon",
	    "labNewName": "DASA Leblon",",
	    "newAddress": "2015, Diagnostic Street, zipCode: 36087"
    },
    {
	    "labName": "DASA Ipanema centre",
	    "labNewName": "DASA Ipanema Center",
	    "newAddress": "20, Diagnostic Street, zipCode: 36105"
    }]

#### insert tests or laboratory:

    The API expect to recieve a list with the insertions inside the request body. If you want to update only one test or laboratory, just provide the list containing one object.
    E.g.
    [{
	    "testName": "ressonância magnética",
	    "testType": "imagem"
    },
    {
	    "testName": "tomografia computadorizada",
	    "testType": "imagem"
    }]


    [{
	    "labName": "DASA Leblon",
	    "address": "2015, Diagnostic Street, zipCode: 36087"
    },
    {
	    "labName": "DASA Ipanema Center",
	    "address": "20, Diagnostic Street, zipCode: 36105"
    }]