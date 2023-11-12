describe('Search component', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://poetrydb.org/title/nature", {
      statusCode: 200,
      fixture: "mockSearchResults"
    }).as('fetchSearchData');
  });

  it('fetches search data on search form submission', () => {
    cy.visit('https://matthews-two.vercel.app/combine');
    cy.get('select').select('title');
    cy.get('input').type('Nature');
    cy.get('button.button').click();
    cy.wait('@fetchSearchData');
    cy.get('.results-header').should('contain', 'Results for \'Nature\'...');
  });


});
