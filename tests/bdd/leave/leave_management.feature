# language: pt
@leave @management
Funcionalidade: Gestão e Aprovação de Licenças
    Como supervisor
    Quero aprovar ou rejeitar solicitações
    Para controlar a ausência da equipe

    @REQ-LEV-03
    Cenario: Aprovação de licença pendente
        Dado que existe uma solicitação de licença "Pendente" do funcionário "Joao"
        Quando aprovo a solicitação
        Então o status deve mudar para "Scheduled"
        E o saldo do funcionário deve ser efetivamente descontado

    @RN-LEV-04 @EdgeCase
    Cenario: Concorrência na aprovação (Lock Otimista)
        Dado que dois administradores abrem a mesma solicitação ao mesmo tempo
        Quando o "Admin A" aprova a solicitação primeiro
        E o "Admin B" tenta rejeitar a mesma solicitação logo em seguida
        Então o "Admin B" deve receber um alerta "A solicitação já foi processada"
        E o status final da licença deve ser "Scheduled" (Aprovado pelo Admin A)