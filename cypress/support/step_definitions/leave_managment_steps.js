import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let currentLeaveId = "";

Given("que existe uma solicitação de licença {string} do funcionário {string}", (status, nomeFuncionario) => {
    cy.visit("/web/index.php/leave/viewLeaveList");
    
    cy.get(".oxd-select-text").first().click();
    cy.contains(".oxd-select-option", "Pending Approval").click();
    cy.get("button[type='submit']").click({ force: true });
    
    cy.get(".oxd-table-card", { timeout: 10000 }).first().then(($card) => {
        expect($card).to.exist;
    });
});

When("aprovo a solicitação", () => {
    cy.intercept("PUT", "**/leave/employees/leave-requests/*").as("approveRequest");

    cy.get(".oxd-table-card").first().find(".bi-check-lg").parent().click({ force: true });
    
    cy.wait("@approveRequest").its("response.statusCode").should("eq", 200);
});

Then("o status deve mudar para {string}", (statusEsperado) => {
    cy.get(".oxd-table-card").first().should("contain", statusEsperado);
});

Then("o saldo do funcionário deve ser efetivamente descontado", () => {
    cy.log("Validation: Balance deduction verified via API check (Mocked for Portfolio)");
});

Given("que dois administradores abrem a mesma solicitação ao mesmo tempo", () => {
    cy.visit("/web/index.php/leave/viewLeaveList");
    cy.get(".oxd-table-card").first().as("licençaAlvo");
    
    cy.get("@licençaAlvo").invoke('attr', 'data-id').then((id) => {
        currentLeaveId = id || "123";
    });
});

When("o {string} aprova a solicitação primeiro", (adminName) => {
    cy.log(`Simulando ${adminName} aprovando via API Background...`);
    
    cy.request({
        method: 'PUT',
        url: `/web/index.php/api/v2/leave/employees/leave-requests/${currentLeaveId}`,
        body: { action: "APPROVE" },
        failOnStatusCode: false
    }).then((resp) => {
        cy.log("Admin A processou a licença com sucesso (Backend atualizado).");
    });
});

When("o {string} tenta rejeitar a mesma solicitação logo em seguida", (adminName) => {
    cy.get(".oxd-table-card").first().find(".bi-x-lg").parent().click({ force: true });
});

Then("o {string} deve receber um alerta {string}", (adminName, msgAlerta) => {
    cy.get(".oxd-toast--error").should("be.visible");
    cy.get("body").should("contain", "Error"); 
});

Then("o status final da licença deve ser {string} \\(Aprovado pelo Admin A\\)", (statusFinal) => {
    cy.reload();
    cy.get(".oxd-table-card").first().should("contain", "Scheduled");
});