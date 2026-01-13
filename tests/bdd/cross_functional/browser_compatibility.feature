# language: pt
@rnf @compatibility
Funcionalidade: Compatibilidade Multi-navegador (Cross-Browser)
    Como um Product Owner
    Quero garantir que o sistema funcione nos navegadores homologados
    Para não perder usuários por problemas de renderização

    @RNF-03
    Esquema do Cenario: Execução de Smoke Test em navegadores suportados
        # Nota Técnica: Este teste é orquestrado via Pipeline CI/CD (Matrix Strategy)
        Dado que o ambiente de teste está configurado para o navegador "<navegador>"
        Quando executo os testes críticos de regressão
        Então não devo encontrar erros de layout ou quebra de funcionalidade

        Exemplos:
            | navegador | versao_minima |
            | Chrome    | v100+         |
            | Firefox   | v100+         |
            | Edge      | Latest        |