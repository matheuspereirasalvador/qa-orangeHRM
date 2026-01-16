# language: pt
@recruitment @integration
Funcionalidade: Processo de Contratação (Hire)
    Como recrutador
    Quero efetivar a contratação de um candidato
    Para transformá-lo automaticamente em funcionário

    @REQ-REC-02 @RN-REC-02
    Cenário: Contratação e Migração de Dados (Candidate to Employee)
        Dado que o candidato "Ana Silva" está na etapa "Job Offer Accepted"
        Quando executo a ação de "Hire" (Contratar)
        Então um novo registro deve ser criado automaticamente no módulo PIM
        E os dados "Nome", "Sobrenome" e "Email" devem ser idênticos ao do candidato