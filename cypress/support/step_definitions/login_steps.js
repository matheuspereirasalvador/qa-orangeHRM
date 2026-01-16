import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que eu acesso a página de login do OrangeHRM", () => {
    cy.visit("/"); 
});

When("eu insiro o usuário {string}", (usuario) => {
    cy.get("input[name='username']").type(usuario);
});

When("insiro a senha {string}", (senha) => {
    cy.get("input[name='password']").type(senha);
});

When("eu deixo o campo usuário vazio", () => {
    cy.get("input[name='username']").clear(); 
});

When("deixo o campo senha vazio", () => {
    cy.get("input[name='password']").clear();
});

When("clico no botão de Login", () => {
    cy.get("button[type='submit']").click();
});

Then("devo ser redirecionado para o {string}", (pagina) => {
    cy.url().should("include", "/dashboard");
});

Then("devo ver a mensagem de boas-vindas {string}", (mensagem) => {
    cy.get(".oxd-userdropdown-name").should("be.visible");
});

Then("devo ver a mensagem de erro {string}", (mensagem) => {
    cy.get(".oxd-alert-content-text").should("contain.text", mensagem);
});

Then("permaneço na página de login", () => {
    cy.url().should("include", "/auth/login");
});

Then("devo ver a mensagem de campo obrigatório {string}", (mensagem) => {
    cy.contains(".oxd-input-group__message", mensagem).should("be.visible");
});

Then("o sistema não deve enviar a requisição ao servidor", () => {
    cy.url().should("include", "/auth/login");
});

