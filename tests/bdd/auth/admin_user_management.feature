# language: pt
@auth @admin @rbac
Funcionalidade: Gestão de Usuários Administrativos e Controle de Acesso
  Como um Administrador do sistema (Admin)
  Eu quero criar e gerenciar contas de usuários e seus perfis
  Para garantir que os colaboradores tenham o acesso correto ao sistema

  Contexto:
    Dado que eu estou logado como "Admin"
    E que eu acesso o menu "Admin > User Management"

  @RN-AUTH-05 @Smoke
  Cenario: Criar um novo usuário com sucesso
    Quando eu clico no botão "Add"
    E preencho o campo "User Role" com "ESS"
    E preencho o campo "Employee Name" com "John Doe"
    E preencho o campo "Username" com "JohnD_QA"
    E defino a senha como "D@ta1234" 
    E confirmo a senha "D@ta1234"
    E clico em "Save"
    Então devo ver a mensagem de sucesso "Successfully Saved"
    E o usuário "JohnD_QA" deve aparecer na lista de usuários

  @RN-AUTH-04 @Negative
  Cenario: Bloquear criação de usuário duplicado
    Dado que já existe um usuário cadastrado com login "Admin"
    Quando eu tento criar um novo usuário com "Username" igual a "Admin"
    E preencho os demais campos obrigatórios corretamente
    E clico em "Save"
    Então devo ver a mensagem de erro "Already exists" no campo Username
    E o sistema não deve salvar o registro

  @RN-AUTH-02 @Negative
  Esquema do Cenário: Validação de complexidade de senha
    Quando eu tento criar um usuário com a senha "<senha_fraca>"
    E clico em "Save"
    Então devo ver uma mensagem de erro indicando "<motivo>"
    
    Exemplos:
      | senha_fraca | motivo                     |
      | password    | Falta número e especial    |
      | Pass1234    | Falta caractere especial   |
      | Pass!!!!    | Falta número               |
      | 12345678    | Apenas números             |
      | P@ss1       | Menor que 8 caracteres     |

  @RF-AUTH-04 @UI
  Cenario: Validação visual de menus por perfil (RBAC)
    # Primeiro valida que o Admin VÊ o menu
    Então o menu "Admin" deve estar visível na barra lateral
    
    # Agora valida que o ESS NÃO VÊ o menu
    Quando faço logout
    E faço login com um usuário de perfil "ESS"
    Então o menu "Admin" NÃO deve estar visível na barra lateral
    E o menu "PIM" deve estar visível na barra lateral

  @RN-AUTH-06 @RF-AUTH-04 @Security
  Cenario: Restrição de acesso direto via URL para perfil ESS
    # Este cenário complementa o anterior: garante que esconder o menu funciona
    # mesmo se o usuário tentar digitar a URL direto
    Dado que eu faço logout
    E faço login com o usuário "JohnD_QA" (Perfil ESS)
    Quando eu tento acessar a URL "/admin/viewSystemUsers" diretamente
    Então devo ser redirecionado para uma página de erro "403 Forbidden"
    Ou devo ser redirecionado para o "Dashboard" com alerta de acesso negado