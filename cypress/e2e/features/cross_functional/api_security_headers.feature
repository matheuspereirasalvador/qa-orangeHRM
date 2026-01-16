# language: pt
@rnf @api @security
Funcionalidade: Cabeçalhos de Segurança e Protocolo (API)
    Como um arquiteto de segurança
    Quero garantir que todas as respostas da API possuam headers de proteção
    Para mitigar vulnerabilidades comuns (OWASP)

    @RNF-02
    Esquema do Cenário: Validação de Headers de Segurança (OWASP) em endpoints públicos
        # Aqui não precisamos logar, pois queremos ver a segurança da borda (Edge)
        Quando faço uma requisição "GET" para o endpoint "<endpoint>"
        Então o status da resposta deve ser 200
        # Força o navegador a usar apenas HTTPS no futuro
        E o header "Strict-Transport-Security" deve estar presente
        # Impede que o navegador "adivinhe" o tipo de arquivo (evita ataques de MIME sniffing)
        E o header "X-Content-Type-Options" deve ser "nosniff"
        # Proteção contra Clickjacking
        E o header "X-Frame-Options" deve ser "SAMEORIGIN" ou "DENY"

        Exemplos:
            | endpoint              |
            | /web/index.php/auth/login |
            | /web/index.php/pim/viewEmployeeList |

    @RNF-01 @Performance
    Cenário: Tempo de resposta da API (Latência)
        Quando faço uma requisição para a API de Login
        Então o tempo de resposta deve ser menor que 2000 milissegundos (2 segundos)