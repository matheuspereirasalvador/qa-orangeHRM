import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;

When("faço uma requisição {string} para o endpoint {string}", (method, endpoint) => {
    cy.request({
        method: method,
        url: endpoint,
        failOnStatusCode: false
    }).then((res) => {
        apiResponse = res;
        cy.log(`Status recebido: ${res.status}`);
        cy.log(`Headers recebidos: ${JSON.stringify(res.headers)}`);
    });
});

Then("o status da resposta deve ser {int}", (statusCode) => {
    expect(apiResponse.status).to.eq(statusCode);
});

Then("o header {string} deve estar presente", (headerName) => {
    const headerKey = headerName.toLowerCase();
    expect(apiResponse.headers).to.have.property(headerKey);
});

Then("o header {string} deve ser {string}", (headerName, expectedValue) => {
    const headerKey = headerName.toLowerCase();
    const actualValue = apiResponse.headers[headerKey];
    
    expect(actualValue).to.include(expectedValue);
});

Then("o header {string} deve ser {string} ou {string}", (headerName, val1, val2) => {
    const headerKey = headerName.toLowerCase();
    const actualValue = apiResponse.headers[headerKey];
    
    expect([val1, val2]).to.include(actualValue);
});

When("faço uma requisição para a API de Login", () => {
    const start = new Date().getTime();
    
    cy.request("GET", "/web/index.php/auth/login").then((res) => {
        apiResponse = res;
    });
});

Then("o tempo de resposta deve ser menor que {int} milissegundos \\(2 segundos\\)", (maxTimeMs) => {
    const duration = apiResponse.duration;
    
    cy.log(`Tempo de resposta medido: ${duration}ms`);
    
    expect(duration).to.be.lessThan(maxTimeMs);
});