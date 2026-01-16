Cypress.Commands.add('ensureLoggedIn', () => {
  cy.session('admin_session', () => {
    cy.visit('/web/index.php/auth/login');
    
    cy.get("input[name='username']", { timeout: 15000 }).should('be.visible').type('Admin');
    cy.get("input[name='password']").should('be.visible').type('admin123');
    cy.get("button[type='submit']").click();
    
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-title').should('be.visible');
  }, {
    cacheAcrossSpecs: true
  });
});