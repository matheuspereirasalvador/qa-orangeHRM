# language: pt
@leave
Funcionalidade: Solicitação de Licenças
    Como um funcionário
    Quero solicitar minhas férias
    Para garantir meu descanso remunerado

    Contexto:
        Dado que estou logado no sistema como funcionário (ESS)
        E possuo um saldo de férias de 10 dias

    @REQ-LEV-01 @REQ-LEV-02 @RN-LEV-01
    Cenário: Bloqueio por saldo insuficiente
        Quando solicito uma licença de 15 dias
        Então o sistema deve bloquear a solicitação
        E informar que o saldo é insuficiente

    @RN-LEV-02
    Cenário: Bloqueio de colisão de datas
        Dado que já possuo uma licença aprovada de "01/02/2026" a "05/02/2026"
        Quando tento solicitar nova licença para o dia "03/02/2026"
        Então o sistema deve impedir a criação devido a conflito de agenda

    @RN-LEV-03
    Cenário: Cálculo de dias corridos (Incluindo Fim de Semana)
        # Testando se Sexta a Segunda conta 4 dias e não 2
        Quando solicito licença de "Sexta-feira" até a próxima "Segunda-feira"
        Então o sistema deve calcular um total de 4 dias debitados do saldo