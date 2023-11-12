describe('Search component', () => {

  it('fetches search data on search form submission', () => {
    cy.intercept("GET", "https://poetrydb.org/*/*", {
      statusCode: 200,
      fixture: "mockSearchResults"
    }).as('fetchSearchData');
    cy.visit('https://matthews-two.vercel.app/combine');
    cy.get('select').select('title');
    cy.get('input').type('Nature');
    cy.get('button').click();
    cy.get('.results-header').should('contain', 'Results for \'Nature\'...');
    cy.get('.search-results > :nth-child(2)').click();
    cy.intercept("GET", "https://poetrydb.org/linecount/*", {
      statusCode: 200,
      fixture: "mockSearchResults"
    }).as('fetchSearchData');
    cy.get('.results-header').should('exist');
    cy.get('.search-results > :nth-child(1)').click();
    cy.get('.new-poem-title').should('contain', "Earth's Newest Poem")
  });


  it('fails to fetch search data on search form submission', () => {
    cy.intercept("GET", "https://poetrydb.org/*/*", {
      statusCode: 200,
      body: ""
    }).as('fetchSearchData1');
    cy.visit('https://matthews-two.vercel.app/combine');
    cy.get('select').select('title');
    cy.get('input').type('Nature');
    cy.get('button').click();
    cy.get('.error-h2').should('contain', "Oops!")

});

it('fails to fetch second second results', () => {
  cy.intercept("GET", "https://poetrydb.org/*/*", {
    statusCode: 200,
    fixture: "mockSearchResults"
  }).as('fetchSearchData');
  cy.visit('https://matthews-two.vercel.app/combine');
  cy.get('select').select('title');
  cy.get('input').type('Nature');
  cy.get('button').click();
  cy.get('.results-header').should('contain', 'Results for \'Nature\'...');
  cy.intercept("GET", "https://poetrydb.org/linecount/*", {
    statusCode: 200,
    body: ''
  }).as('fetchSearchData');
  cy.get('.search-results > :nth-child(2)').click();
  cy.get('.error-h2').should('contain', "Oops!")
});

it('no results', () => {
  cy.intercept("GET", "https://poetrydb.org/*/*", {
    statusCode: 200,
    fixture: "emptyMockData"
  }).as('fetchSearchData');
  cy.visit('https://matthews-two.vercel.app/combine');
  cy.get('select').select('title');
  cy.get('input').type('Dickinson');
  cy.get('button').click();
  cy.get('.poem1-block > :nth-child(3)').should('contain', 'Nothing found.')
});
})