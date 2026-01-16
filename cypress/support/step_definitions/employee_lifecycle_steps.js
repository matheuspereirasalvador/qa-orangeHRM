import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let employeeId = "";
let employeeName = "";

Given("que estou logado como Administrador", () => {
    cy.session("admin_session", () => {
        cy.visit("/web/index.php/auth/login", { timeout: 60000 });
        cy.get("input[name='username']", { timeout: 20000 }).should("be.visible").type("Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();
        cy.url().should("include", "/dashboard");
    }, { cacheAcrossSpecs: true });
});

Given("acesso o módulo PIM", () => {
    cy.visit("/web/index.php/pim/viewEmployeeList");
    cy.get(".orangehrm-container", { timeout: 30000 }).should("exist");
});

When("cadastro um novo funcionário com os dados:", (dataTable) => {
    const data = dataTable.hashes()[0];
    employeeName = `${data.primeiro_nome} ${data.ultimo_nome}`;
    
    cy.contains("button", "Add").click();
    cy.contains("h6", "Add Employee", { timeout: 20000 }).should("be.visible");

    cy.get("input[name='firstName']").type(data.primeiro_nome);
    cy.get("input[name='lastName']").type(data.ultimo_nome);

    cy.contains("label", "Employee Id").parent().next().find("input")
      .should('be.visible')
      .invoke('val')
      .should('not.be.empty')
      .then((val) => {
          employeeId = val;
      });

    cy.get("button[type='submit']").click();
    cy.get(".oxd-toast", { timeout: 20000 }).should("be.visible");
});

Then("o funcionário {string} deve ser listado no diretório", (ignoreName) => {
    cy.visit("/web/index.php/pim/viewEmployeeList");
    
    cy.intercept("GET", "**/pim/employees*").as("searchRequest");

    cy.contains("label", "Employee Id").parent().next().find("input").type(employeeId);
    cy.get("button[type='submit']").click({ force: true });

    cy.wait("@searchRequest");

    cy.get(".oxd-table-body").should("contain", employeeName);
});

Then("o perfil do funcionário deve ser criado com sucesso", () => {
    cy.get(".oxd-table-card").first().find(".bi-pencil-fill").click({ force: true });
    cy.url().should("include", "/viewPersonalDetails");
});

Given("que já existe um funcionário com ID {string} criado via API", (ignore) => {
    const randomId = "EMP_" + Math.floor(Math.random() * 10000);
    employeeId = randomId; 

    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
            firstName: "Dupli",
            middleName: "",
            lastName: "Cate",
            empPicture: null,
            employeeId: employeeId
        }
    }).then((resp) => {
        expect(resp.status).to.eq(200);
    });
});

When("tento cadastrar um novo funcionário com o ID {string}", (ignore) => {
    cy.contains("button", "Add").click();
    cy.get("input[name='firstName']").type("Teste");
    cy.get("input[name='lastName']").type("Duplicado");

    const idInput = cy.contains("label", "Employee Id").parent().next().find("input");
    idInput.clear().type(employeeId);
    
    cy.contains("h6", "Add Employee").click();
    cy.get("button[type='submit']").click();
});

Then("devo ver uma mensagem de erro indicando duplicidade", () => {
    cy.contains(".oxd-input-group", "Employee Id")
      .find(".oxd-input-field-error-message")
      .should("be.visible");
});

Given("que possuo um funcionário ativo chamado {string} criado via API", (nomeCompleto) => {
    const [first, last] = nomeCompleto.split(" ");
    const randomId = "DEL_" + Math.floor(Math.random() * 10000);
    
    employeeId = randomId;
    employeeName = nomeCompleto;

    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
            firstName: first,
            middleName: "ToDel",
            lastName: last,
            empPicture: null,
            employeeId: employeeId
        }
    }).then(() => {
        cy.visit("/web/index.php/pim/viewEmployeeList");
    });
});

When("realizo a exclusão permanente deste funcionário via UI", () => {
    cy.intercept("GET", "**/pim/employees*").as("searchDel");
    
    cy.contains("label", "Employee Id").parent().next().find("input").clear().type(employeeId);
    cy.get("button[type='submit']").click({ force: true });
    
    cy.wait("@searchDel");

    cy.get(".oxd-table-card").first().find(".bi-trash").click({ force: true });
    cy.contains(".oxd-button--label-danger", "Yes, Delete").click();

    cy.get(".oxd-toast", { timeout: 20000 }).should("be.visible");
    cy.get(".oxd-toast", { timeout: 20000 }).should("not.exist");
});

Then("o registro {string} não deve mais existir na busca do PIM", (ignore) => {
    cy.reload();
    
    cy.get(".orangehrm-container", { timeout: 30000 }).should("exist");

    cy.intercept("GET", "**/pim/employees*").as("verifyDel");
    cy.contains("label", "Employee Id").parent().next().find("input").type(employeeId);
    cy.get("button[type='submit']").click({ force: true });
    
    cy.wait("@verifyDel");

    cy.get("body").then(($body) => {
        if ($body.find("span").text().includes("No Records Found")) {
            return;
        }
        
        if ($body.find(".oxd-table-body").length > 0) {
            cy.get(".oxd-table-body").should("not.contain", employeeId);
        }
    });
});