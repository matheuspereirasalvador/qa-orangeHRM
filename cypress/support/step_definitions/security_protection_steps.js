import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que existe um usuário ativo {string}", (usuario) => {
    cy.visit("/");
});

Given("que estou logado no sistema", () => {
    cy.session("admin_session", () => {
        cy.visit("/");
        cy.get("input[name='username']").clear().type('Admin');
        cy.get("input[name='password']").clear().type('admin123');
        cy.get("button[type='submit']").click();
        cy.url().should('include', '/dashboard');
    }, {
        validate: () => {
            cy.visit("/web/index.php/dashboard/index");
            cy.url().should('include', '/dashboard');
        },
        cacheAcrossSpecs: true
    });

    cy.visit("/web/index.php/dashboard/index");
});

Given("que eu falho o login 2 vezes consecutivas com o usuário {string}", (usuario) => {
    for (let i = 0; i < 2; i++) {
        cy.get("input[name='username']").clear().type(usuario);
        cy.get("input[name='password']").clear().type("SenhaErrada123"); 
        cy.get("button[type='submit']").click();
        cy.get(".oxd-alert-content-text").should("be.visible");
    }
});

When("eu tento logar com a senha incorreta pela 3ª vez", () => {
    cy.get("input[name='username']").clear().type('Admin');
    cy.get("input[name='password']").clear().type('OutraSenhaErrada');
    cy.get("button[type='submit']").click();
});

Then("o usuário {string} deve ficar bloqueado por 15 minutos", (usuario) => {
    cy.get("input[name='username']").clear().type(usuario);
    cy.get("input[name='password']").clear().type('admin123');
    cy.get("button[type='submit']").click();
    cy.url().should('include', '/auth/login');   

});


Given("realizo o logout", () => { 
    cy.get(".oxd-userdropdown-tab").should("be.visible").click();
    cy.contains("a[role='menuitem']", 'Logout').click();
});

When("clico na opção de {string} no menu do usuário", (opcao) => {
    cy.get(".oxd-userdropdown-tab").should("be.visible").click();
    cy.contains("a[role='menuitem']", opcao).click();
});

Then("devo ser redirecionado para a página de Login", () => {
    cy.url().should("include", "/auth/login");
});

Then("a sessão atual deve ser invalidada", () => {
    cy.visit("/web/index.php/dashboard/index", { failOnStatusCode: false });
    cy.url().should("include", "/auth/login");
});

When("navego para a página anterior do histórico do navegador", () => {
    cy.go(-1);
});

Then("devo ser mantido na página de Login", () => {
    cy.url().should("include", "/auth/login");
});

Then("não devo visualizar a Dashboard", () => {
    cy.get('body').should('not.contain', 'Dashboard');
});