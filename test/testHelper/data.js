const DATA = {
  LABS: [{
    labName: "DASA Leblon",
    address: "2015, Diagnostic Street, zipCode: 36087",
  },{
    labName: "DASA Ipanema Center",
    address: "20, image Street, zipCode: 36105",
  },{
    labName: "DASA Centro",
    address: "201, Analysis Street, zipCode: 36187",
  },{
    labName: "DASA Flamengo",
    address: "21, FlaFlu Street, zipCode: 36005",
  }],
  TESTS: [{
    testName: "ressonancia magnética",
    testType: "imagem"
  },{
    testName: "contagem de hematocritos",
    testType: "analise clinica"
  },
  {
    testName: "hemograma",
    testType: "analise clinica"
  },
  {
    testName: "tomografia computadorizada",
    testType: "imagem"
  }],
  RELATIONS: [{
    laboratoryId: 1,
    testId: 1,
  },{
    laboratoryId: 1,
    testId: 2,
  },{
    laboratoryId: 1,
    testId: 3,
  },{
    laboratoryId: 1,
    testId: 4,
  },{
    laboratoryId: 2,
    testId: 1,
  },{
    laboratoryId: 2,
    testId: 2,
  }],
};

module.exports = DATA;