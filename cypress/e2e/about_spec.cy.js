describe('about page', () => {
  it('passes', () => {
    cy.visit('https://matthews-two.vercel.app/about');
    cy.get('.image').should('exist');
    cy.get('header > :nth-child(2)').click();
    cy.get('.home-title').should('contain', "MATTHEWS");
    cy.url().should('eq', 'https://matthews-two.vercel.app/');
    cy.get('[href="/combine"] > span').click();
    cy.get('.results-header').should('contain', 'Search for a poem, by author or title')
  });
})

describe('about page', () => {
  it('passes', () => {
    cy.visit('https://matthews-two.vercel.app/wildcard')
    cy.get('.error-cont > :nth-child(3)').should('contain', "The page you're looking for doesn't exist.")
  });
})