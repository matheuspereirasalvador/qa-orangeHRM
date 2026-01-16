import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Variáveis para compartilhar dados entre os passos
let candidateId = 0;
let candidateEmail = "";

// --- CONTEXTO ---

Given("que existe um candidato na etapa {string}", (stage) => {
    // 1. Setup: Criação de candidato via API para ganhar tempo
    candidateEmail = `qa_auto_${Math.floor(Math.random() * 100000)}@test.com`;
    
    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/recruitment/candidates',
        body: {
            firstName: "Candidato",
            middleName: "Automacao",
            lastName: "Teste",
            email: candidateEmail,
            contactNumber: null,
            keywords: null,
            comment: null,
            dateOfApplication: "2025-10-20",
            consentToKeepData: false,
            vacancyId: null // Geralmente null no demo funciona, ou precisaríamos buscar uma vaga ativa
        }
    }).then((resp) => {
        expect(resp.status).to.eq(200);
        // Captura o ID para navegar direto
        candidateId = resp.body.data.id;
        cy.log(`Candidato criado com ID: ${candidateId}`);
    });

    // 2. Navegação direta para o perfil do candidato (Deep Link)
    // Isso evita ter que buscar na grid, que é lento e falho
    cy.visit(`/web/index.php/recruitment/viewCandidate/${candidateId}`);
    
    // Valida que carregou
    cy.contains(".oxd-text", "Application Initiated", { timeout: 20000 }).should("be.visible");
});

// --- CENÁRIO: AVANÇO DE ETAPA ---

When("movo o candidato para a etapa {string}", (nextStage) => {
    // No OrangeHRM, "Shortlisted" é uma ação de botão "Shortlist"
    
    // Clica no botão de ação (Shortlist)
    // O botão geralmente é verde ou secundário. Usamos contains para ser robusto.
    cy.contains("button", "Shortlist").click({ force: true });
    
    // Preenche o modal de notas (obrigatório ou opcional dependendo da versão)
    cy.get("textarea").type("Moving to shortlist via Cypress automation");
    
    // Salva a transição
    cy.get("button[type='submit']").click({ force: true });
    
    // Espera o processamento e o Toast
    cy.get(".oxd-toast--success", { timeout: 15000 }).should("be.visible");
});

Then("o status do candidato deve ser atualizado no histórico", () => {
    // Verifica se o status mudou na lateral esquerda ou no header
    // O texto deve mudar de "Application Initiated" para "Shortlisted"
    cy.get(".orangehrm-recruitment-status").should("contain", "Shortlisted");
});

// --- CENÁRIO: VALIDAÇÃO DE E-MAIL ÚNICO ---

Given("que já existe um candidato ativo com email {string}", (emailFixoGherkin) => {
    // Ignoramos o email do Gherkin e geramos um random para o teste ser independente
    candidateEmail = `duplicate_${Date.now()}@qa.com`;
    
    cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/recruitment/candidates',
        body: {
            firstName: "Dupli",
            middleName: "Check",
            lastName: "User",
            email: candidateEmail,
            dateOfApplication: "2025-01-01"
        }
    }).then((resp) => {
        expect(resp.status).to.eq(200);
    });
});

When("tento cadastrar um novo candidato com o email {string}", (ignoreEmail) => {
    // Vai para a tela de Adicionar
    cy.visit("/web/index.php/recruitment/addCandidate");
    
    // Preenche dados básicos
    cy.get("input[name='firstName']").type("Novo");
    cy.get("input[name='lastName']").type("Candidato");
    
    // O PULO DO GATO: Usa o MESMO email criado no passo anterior
    // Procura o input de email (geralmente o terceiro input de texto da tela ou pelo placeholder)
    cy.get("input[placeholder='Type here']").first().type(candidateEmail);
    
    // Clica fora para disparar a validação (blur) ou tenta salvar
    cy.get("button[type='submit']").click({ force: true });
});

Then("o sistema deve alertar duplicidade de cadastro", () => {
    // No OrangeHRM, a duplicidade pode aparecer de duas formas:
    // 1. Mensagem de erro embaixo do campo email
    // 2. Um modal perguntando se quer continuar mesmo assim (Soft Warning)
    
    cy.get("body").then(($body) => {
        const erroCampo = $body.find(".oxd-input-field-error-message").text();
        const modalAviso = $body.find(".oxd-dialog-sheet").length > 0;
        
        if (erroCampo.includes("Exists") || modalAviso) {
            // Sucesso: O sistema detectou a duplicidade
            cy.log("Duplicidade detectada com sucesso!");
        } else {
            // Se falhar, força o erro para aparecer no log
            throw new Error("Sistema permitiu cadastro duplicado sem aviso.");
        }
    });
});