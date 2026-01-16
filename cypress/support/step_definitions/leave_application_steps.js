import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const getFutureDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
};

const getNextWeekDay = (dayIndex) => {
    const date = new Date();
    date.setDate(date.getDate() + (dayIndex + 7 - date.getDay()) % 7);
    return date;
};

Given("que estou logado no sistema como funcionário \\(ESS\\)", () => {
    cy.session("ess_user", () => {
        cy.visit("/web/index.php/auth/login");
        cy.get("input[name='username']").should("be.visible").type("Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();
        cy.url().should("include", "/dashboard");
    });
    
    cy.visit("/web/index.php/leave/applyLeave");
    cy.contains("h6", "Apply Leave").should("be.visible");
});

Given("possuo um saldo de férias de 10 dias", () => {
    cy.log("Pre-condition: User has 10 days of leave balance (Mocked/Assumed)");
});

When("solicito uma licença de 15 dias", () => {
    cy.get(".oxd-select-text").click();
    cy.contains(".oxd-select-option", "US - Vacation").click();

    const startDate = getFutureDate(30);
    const endDate = getFutureDate(45);

    cy.get(".oxd-date-input .oxd-input").first().clear().type(startDate);
    cy.get(".oxd-date-input .oxd-input").last().clear().type(endDate);
    
    cy.contains("h6", "Apply Leave").click();
    cy.get("button[type='submit']").click();
});

Then("o sistema deve bloquear a solicitação", () => {
    cy.get(".oxd-toast--success").should("not.exist");
});

Then("informar que o saldo é insuficiente", () => {
    cy.get("body").should("contain", "Balance not sufficient");
});

Given("que já possuo uma licença aprovada de {string} a {string}", (data1, data2) => {
    const start = getFutureDate(10);
    const end = getFutureDate(12);

    cy.get(".oxd-select-text").click();
    cy.contains(".oxd-select-option", "US - Vacation").click();

    cy.get(".oxd-date-input .oxd-input").first().clear().type(start);
    cy.get(".oxd-date-input .oxd-input").last().clear().type(end);
    
    cy.get("button[type='submit']").click();
    cy.get(".oxd-toast--success", { timeout: 10000 }).should("be.visible");
    
    cy.reload();
});

When("tento solicitar nova licença para o dia {string}", (ignoreDate) => {
    cy.get(".oxd-select-text").click();
    cy.contains(".oxd-select-option", "US - Vacation").click();

    const conflictDate = getFutureDate(11);

    cy.get(".oxd-date-input .oxd-input").first().clear().type(conflictDate);
    cy.get(".oxd-date-input .oxd-input").last().clear().type(conflictDate);
    
    cy.contains("h6", "Apply Leave").click();
});

Then("o sistema deve impedir a criação devido a conflito de agenda", () => {
    cy.get("button[type='submit']").click();
    cy.get(".oxd-text--error").should("contain", "Overlaps");
});

When("solicito licença de {string} até a próxima {string}", (diaInicio, diaFim) => {
    const friday = getNextWeekDay(5);
    const monday = new Date(friday);
    monday.setDate(friday.getDate() + 3);

    const strFriday = friday.toISOString().split('T')[0];
    const strMonday = monday.toISOString().split('T')[0];

    cy.reload();
    cy.get(".oxd-select-text").click();
    cy.contains(".oxd-select-option", "US - Vacation").click();

    cy.get(".oxd-date-input .oxd-input").first().clear().type(strFriday);
    cy.get(".oxd-date-input .oxd-input").last().clear().type(strMonday);
    
    cy.contains("label", "To Date").click();
    
    cy.wait(2000);
});

Then("o sistema deve calcular um total de 4 dias debitados do saldo", () => {
    cy.contains(".oxd-input-group", "Duration")
      .should("contain", "4.00");
});