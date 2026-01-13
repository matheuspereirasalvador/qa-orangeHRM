# language: pt
Funcionalidade: Autenticação de Usuário (AuthSecure)
  Como um usuário registrado do OrangeHRM
  Eu quero acessar o sistema com minhas credenciais
  Para visualizar e gerenciar informações de RH

  Contexto:
    Dado que eu acesso a página de login do OrangeHRM

  @RF-AUTH-01 @Smoke
  Cenário: Login com credenciais válidas
    Quando eu insiro o usuário "Admin"
    E insiro a senha "Admin123!"
    E clico no botão de Login
    Então devo ser redirecionado para o "Dashboard"
    E devo ver a mensagem de boas-vindas "Welcome Admin"

  @RF-AUTH-01 @Alternative
  Esquema do Cenário: Login com credenciais inválidas
    Quando eu insiro o usuário "<usuario>"
    E insiro a senha "<senha>"
    E clico no botão de Login
    Então devo ver a mensagem de erro "Invalid credentials"
    E permaneço na página de login

    Exemplos:
      | usuario | senha       |
      | Admin   | Errada123!  |
      | FakeUser| Admin123!   |
      | Admin   | 12345678    |

  @RN-AUTH-03 @Negative
  Cenário: Validação de campos obrigatórios (Saneamento)
    Quando eu deixo o campo usuário vazio
    E deixo o campo senha vazio
    E clico no botão de Login
    Então devo ver a mensagem de campo obrigatório "Required"
    E o sistema não deve enviar a requisição ao servidor