describe('Create component happy', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://poetrydb.org/linecount/*/lines", {
      statusCode: 200,
      fixture: "mockPoemData"
    }).as('lines')
      cy.visit('https://matthews-two.vercel.app/create');
    });

  it('displays "Click here to create a poem" initially', () => {
    cy.get('.number-scroll').should('contain', 'Click here to create a poem');
  });

  it('generates a poem and displays it after clicking', () => {
    cy.get('.number-scroll').click();

    cy.wait('@lines');

    cy.get('.poem').should('exist');
    cy.get('.combined-poem').should('exist');
  });

  it('creates another poem when "Create another" is clicked', () => {
    cy.get('.number-scroll').click();

    cy.wait('@lines');

    cy.get('.poem').should('exist');
    cy.get('.combined-poem').should('exist');

    cy.get('.number-scroll').click();

    cy.wait('@lines');

    cy.get('.poem').should('exist');
    cy.get('.combined-poem').should('exist');
  });

});



describe('Create component', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://poetrydb.org/linecount/*/lines", {
      statusCode: 200,
      body: '',
    }).as('lines');
    cy.visit('https://matthews-two.vercel.app/create');
  });

  it('displays "Click here to create a poem" initially', () => {
    cy.get('.number-scroll').should('contain', 'Click here to create a poem');
    cy.get('.number-scroll').click();
    cy.get('.header-title');
    cy.wait('@lines');
    cy.get('.error-h2').should('exist')
  });
});