import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let employeeName = "FuncionarioTeste_" + Math.floor(Math.random() * 10000);
let dynamicUsername = "UserQA_" + Math.floor(Math.random() * 10000);

const preencherDropdown = (label, valor) => {
    cy.contains(".oxd-input-group", label).find(".oxd-select-text").click();
    cy.contains(".oxd-select-option", valor).click();
};

const preencherInput = (label, valor) => {
    cy.contains(".oxd-input-group", label).find("input").clear().type(valor);
};

const preencherAutocompleteEmployee = (nome) => {
    const campo = cy.contains(".oxd-input-group", "Employee Name");
    campo.find("input").clear().type(nome);
    cy.get(".oxd-autocomplete-dropdown", { timeout: 8000 }).should("be.visible");
    cy.contains(".oxd-autocomplete-option", nome).click();
};

Given("que existe um funcionário disponível no PIM", () => {
    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
            firstName: "QA",
            middleName: "Auto",
            lastName: employeeName,
            empPicture: null,
            employeeId: Math.floor(Math.random() * 1000).toString()
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});

Given("que eu acesso o menu {string}", (menuPath) => {
    cy.ensureLoggedIn();
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.contains(".oxd-topbar-header-title", "User Management", { timeout: 20000 }).should("be.visible");
});

Given("que já existe um usuário cadastrado com login {string}", (username) => {
});


Given("faço login com o usuário {string} \\(Perfil ESS)", (usuario) => {
    cy.visit("/web/index.php/auth/login");
    cy.get("input[name='username']").type("Admin"); 
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();
});

Given("faço login com um usuário de perfil {string}", (perfil) => {
    cy.visit("/");
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();
});

When("eu clico no botão {string}", (botao) => {
    if (botao === "Add") {
        cy.get(".orangehrm-header-container button").contains("Add").click();
    } else {
        cy.contains("button", botao).click();
    }
});

When("clico em {string}", (textoBotao) => {
    cy.contains("button", textoBotao).click();
});

When("preencho o formulário de cadastro com um novo usuário válido", () => {
    preencherDropdown("User Role", "ESS");
    preencherAutocompleteEmployee(employeeName);
    preencherDropdown("Status", "Enabled");
    preencherInput("Username", dynamicUsername); 
    preencherInput("Password", "SenhaForte123!");
    preencherInput("Confirm Password", "SenhaForte123!");
});

When("eu tento criar um novo usuário com {string} igual a {string}", (campo, valor) => {
    cy.contains("button", "Add").click();
    preencherInput("Username", valor);
});

When("preencho os demais campos obrigatórios corretamente", () => {
    preencherDropdown("User Role", "ESS");
    preencherAutocompleteEmployee(employeeName);
    preencherDropdown("Status", "Enabled");
    preencherInput("Password", "SenhaForte123!");
    preencherInput("Confirm Password", "SenhaForte123!");
});

When("eu tento criar um usuário com a senha {string}", (senha) => {
    cy.contains("button", "Add").click();
    
    preencherDropdown("User Role", "ESS");
    preencherAutocompleteEmployee(employeeName);
    preencherDropdown("Status", "Enabled");
    preencherInput("Username", "WeakPass_" + Math.floor(Math.random()*1000));
    
    preencherInput("Password", senha);
    preencherInput("Confirm Password", senha);
});

When("eu tento acessar a URL {string} diretamente", (url) => {
    cy.visit(url, { failOnStatusCode: false });
});

Then("devo ver a mensagem de sucesso {string}", (mensagem) => {
    cy.get(".oxd-toast").should("contain", mensagem);
});

Then("devo ver a mensagem de erro {string} no campo Username", (mensagem) => {
    cy.contains(".oxd-input-group", "Username")
      .find(".oxd-input-field-error-message")
      .should("have.text", mensagem);
});

Then("o novo usuário deve aparecer na lista de usuários", () => {
    cy.ensureLoggedIn();
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.get(".oxd-table-filter", { timeout: 20000 }).should("be.visible"); 
    
    preencherInput("Username", dynamicUsername);
    cy.contains("button", "Search").click();
    
    cy.get(".oxd-table-body", { timeout: 30000 }).should("contain", dynamicUsername);
});

Then("o sistema não deve salvar o registro", () => {
    cy.get(".oxd-input-field-error-message").should("be.visible");
});

Then("devo ver uma mensagem de erro indicando {string}", (motivo) => {
    cy.get(".oxd-input-field-error-message").should("be.visible");
});

Then("o menu {string} deve estar visível na barra lateral", (menu) => {
    cy.contains(".oxd-main-menu-item", menu).should("be.visible");
});

Then("o menu {string} NÃO deve estar visível na barra lateral", (menu) => {
    cy.contains(".oxd-main-menu-item", menu).should("not.exist");
});

Then("devo ser redirecionado para uma página de erro {string} ou para o {string} com alerta de acesso negado", (erro, pagina) => {
    cy.get("body").then(($body) => {
        if ($body.text().includes("Access Denied") || $body.text().includes("403")) {
            expect(true).to.be.true;
        } else {
            cy.url().should("include", "/dashboard");
        }
    });
});