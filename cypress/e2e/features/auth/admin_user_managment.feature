# language: pt
@auth @admin @rbac
Funcionalidade: Gestão de Usuários Administrativos e Controle de Acesso
  Como um administrador do sistema
  Eu quero criar e gerenciar contas de usuários e seus perfis
  Para garantir que os colaboradores tenham o acesso correto ao sistema

Contexto:
  # O passo "que existe um funcionário..." garante que não teremos erro de "Invalid"
  Dado que estou logado no sistema
  E que existe um funcionário disponível no PIM
  E que eu acesso o menu "Admin > User Management"

@RN-AUTH-05 @Smoke
Cenário: Criar um novo usuário com sucesso
  Quando eu clico no botão "Add"
  E preencho o formulário de cadastro com um novo usuário válido
  E clico em "Save"
  Então devo ver a mensagem de sucesso "Successfully Saved"
  E o novo usuário deve aparecer na lista de usuários

@RN-AUTH-04 @Negative
Cenário: Bloquear criação de usuário duplicado
  Dado que já existe um usuário cadastrado com login "Admin"
  Quando eu tento criar um novo usuário com "Username" igual a "Admin"
  E preencho os demais campos obrigatórios corretamente
  E clico em "Save"
  Então devo ver a mensagem de erro "Already exists" no campo Username
  E o sistema não deve salvar o registro

@RN-AUTH-02 @Negative
Esquema do Cenário: Validação de complexidade de senha
  Quando eu tento criar um usuário com a senha "<senha_fraca>"
  # O passo acima preenche o resto do form com dados dummy para isolar o erro da senha
  E clico em "Save"
  Então devo ver uma mensagem de erro indicando "<motivo>"

  Exemplos:
    | senha_fraca | motivo                   |
    | password    | Falta número e especial  |
    | Pass1234    | Falta caractere especial |
    | Pass!!!!    | Falta número             |
    | 12345678    | Apenas números           |
    | P@ss1       | Menor que 8 caracteres   |

@RF-AUTH-04 @UI
Cenário: Validação visual de menus por perfil (RBAC)
  # Contexto já logou como Admin
  Então o menu "Admin" deve estar visível na barra lateral
  Quando realizo o logout
  E faço login com um usuário de perfil "ESS"
  Então o menu "Admin" NÃO deve estar visível na barra lateral
  E o menu "PIM" deve estar visível na barra lateral

@RN-AUTH-06 @RF-AUTH-04 @Security
Cenário: Restrição de acesso direto via URL para perfil ESS
  Dado realizo o logout
  E faço login com o usuário "JohnD_QA" (Perfil ESS)
  Quando eu tento acessar a URL "/web/index.php/admin/viewSystemUsers" diretamente
  Então devo ser redirecionado para uma página de erro "403 Forbidden" ou para o "Dashboard" com alerta de acesso negado