import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let employeeFirstName = "Joao";
let employeeLastName = "Silva";

Given("que estou editando o perfil do funcionário {string}", (nomeCompleto) => {
    cy.session("admin_session", () => {
        cy.visit("/web/index.php/auth/login", { timeout: 60000 });
        
        cy.get("input[name='username']", { timeout: 30000 })
          .should("be.visible")
          .type("Admin");
          
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();
        
        cy.url().should("include", "/dashboard");
    }, {
        cacheAcrossSpecs: true
    });

    const nomes = nomeCompleto.split(" ");
    employeeFirstName = nomes[0];
    employeeLastName = nomes[1];

    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
            firstName: employeeFirstName,
            middleName: "",
            lastName: employeeLastName,
            empPicture: null,
            employeeId: Math.floor(Math.random() * 10000).toString()
        },
        failOnStatusCode: false
    }).then(() => {
        cy.intercept('GET', '**/pim/employees*').as('employeesList');
        cy.visit("/web/index.php/pim/viewEmployeeList", { timeout: 60000 });
        cy.wait('@employeesList', { timeout: 30000 }).its('response.statusCode').should('be.oneOf', [200, 304]);
    });

    cy.get(".oxd-table-body", { timeout: 30000 }).should("exist");
    
    cy.contains(".oxd-input-group", "Employee Name").find("input").type(nomeCompleto);
    
    cy.get(".oxd-autocomplete-dropdown", { timeout: 10000 }).should("be.visible");
    cy.contains(".oxd-autocomplete-option", nomeCompleto).first().click();
    
    cy.get("button[type='submit']").click({ force: true });

    cy.get(".oxd-table-card", { timeout: 20000 }).first().find("button .bi-pencil-fill").click({ force: true });
    
    cy.get(".orangehrm-edit-employee-image", { timeout: 20000 }).click();
    
    cy.contains("h6", "Change Profile Picture", { timeout: 20000 }).should("be.visible");
});

When("faço o upload do arquivo {string}", (nomeArquivo) => {
    cy.get("input[type='file']").selectFile(`cypress/fixtures/${nomeArquivo}`, { force: true });
    
    cy.get("button[type='submit']").click();
});

Then("a foto deve ser atualizada com sucesso no avatar do usuário", () => {
    cy.get(".oxd-toast", { timeout: 20000 }).should("contain", "Successfully Updated");
    
    cy.get(".orangehrm-edit-employee-image img").should("have.attr", "src").and("not.include", "default-photo");
});

When("tento fazer upload do arquivo {string}", (nomeArquivo) => {
    cy.get("input[type='file']").selectFile(`cypress/fixtures/${nomeArquivo}`, { force: true });
    
    cy.get("body").then(($body) => {
        if ($body.find(".oxd-input-field-error-message").length === 0) {
            cy.get("button[type='submit']").click();
        }
    });
});

Then("o sistema deve rejeitar o upload", () => {

    cy.get(".oxd-toast").should("not.exist");
});

Then("exibir a mensagem de erro {string}", (msgErro) => {
    cy.contains(".oxd-input-field-error-message", msgErro).should("be.visible");
});