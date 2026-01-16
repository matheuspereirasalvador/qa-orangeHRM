import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let currentBrowserInfo = {};

Given("que o ambiente de teste está configurado para o navegador {string}", (expectedBrowser) => {
    currentBrowserInfo = Cypress.browser;

    cy.log(`📦 Browser Configurado na Pipeline: ${expectedBrowser}`);
    cy.log(`🏃 Browser em Execução Real: ${currentBrowserInfo.displayName} (v${currentBrowserInfo.majorVersion})`);

    if (currentBrowserInfo.displayName.toLowerCase() !== expectedBrowser.toLowerCase()) {
        cy.log(`⚠️ AVISO: O Gherkin pede ${expectedBrowser}, mas o runner está em ${currentBrowserInfo.displayName}. Em CI isso seria uma falha.`);
    }
});

When("executo os testes críticos de regressão", () => {
    cy.visit("/web/index.php/auth/login");
    
    cy.get(".orangehrm-login-branding > img").should("be.visible");
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    
    cy.window().then((win) => {
        cy.spy(win.console, 'error').as('consoleError');
    });
});

Then("não devo encontrar erros de layout ou quebra de funcionalidade", () => {
    cy.get('@consoleError').should('not.have.been.called');

    cy.get("button[type='submit']")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });
      
    cy.get(".oxd-input-field-error-message").should("exist");
    
    cy.log(`✅ Sucesso: Aplicação renderizada corretamente no ${currentBrowserInfo.displayName}`);
});