# language: pt
@recruitment
Funcionalidade: Workflow de Candidatos
    Como recrutador
    Quero mover candidatos pelo funil de contratação
    Para organizar o processo seletivo

    @REQ-REC-01
    Cenário: Avanço de etapa no pipeline
        Dado que existe um candidato na etapa "Application Initiated"
        Quando movo o candidato para a etapa "Shortlisted"
        Então o status do candidato deve ser atualizado no histórico

    @RN-REC-01
    Cenário: Validação de E-mail Único
        Dado que já existe um candidato ativo com email "joao@email.com"
        Quando tento cadastrar um novo candidato com o email "joao@email.com"
        Então o sistema deve alertar duplicidade de cadastro