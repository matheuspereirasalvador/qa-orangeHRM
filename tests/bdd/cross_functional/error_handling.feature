# language: pt
@rnf @security
Funcionalidade: Tratamento de Erros e Segurança
    Para garantir a segurança da aplicação
    O sistema não deve expor detalhes técnicos em caso de falha

    @RNF-04
    Cenario: Página de erro genérica (Tratamento de Exceção)
        # Este teste força um erro (ex: rota inexistente ou ID inválido na URL)
        Quando tento acessar uma URL de recurso inexistente "/pim/viewEmployee/99999999"
        Então devo ver uma página de "404 Not Found" amigável
        E não devo visualizar "Stack Trace" ou erros de banco de dados na tela


