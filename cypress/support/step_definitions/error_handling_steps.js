import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let pageBody = "";

When("tento acessar uma URL de recurso inexistente {string}", (badUrl) => {
    const fullUrl = badUrl.startsWith("/web") ? badUrl : `/web/index.php${badUrl}`;
    cy.visit(fullUrl, { failOnStatusCode: false });
});

Then("devo ver uma página de {string} amigável", (errorType) => {
    cy.get("body").then(($body) => {
        pageBody = $body.text();
        
        const isFriendly = pageBody.includes("Not Found") || 
                           $body.find("img[alt*='OrangeHRM']").length > 0 ||
                           $body.find(".orangehrm-background-container").length > 0;
                           
        expect(isFriendly).to.be.true;
    });
});

Then("não devo visualizar {string} ou erros de banco de dados na tela", (forbiddenTerm) => {
    const securityBlacklist = [
        "Stack Trace",
        "Exception",
        "SQLSyntaxErrorException",
        "NullPointerException",
        "ArrayOutOfBounds",
        "Fatal error",
        "<?php"
    ];

    securityBlacklist.push(forbiddenTerm);

    securityBlacklist.forEach((term) => {
        expect(pageBody).to.not.contain(term, `ALERTA DE SEGURANÇA: O termo técnico '${term}' vazou na tela de erro!`);
    });
});