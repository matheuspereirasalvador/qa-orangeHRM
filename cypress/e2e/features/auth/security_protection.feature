# language: pt
@auth @security
Funcionalidade: Proteção e Segurança (Security)
  Como administrador do sistema
  Eu quero que o sistema bloqueie tentativas suspeitas e gerencie sessões
  Para proteger os dados contra ataques e acessos indevidos

  Contexto:
    Dado que existe um usuário ativo "Admin"

  @RN-AUTH-01 @RF-AUTH-03 @Security
  Cenário: Bloqueio de conta após 3 tentativas falhas
    Dado que eu falho o login 2 vezes consecutivas com o usuário "Admin"
    Quando eu tento logar com a senha incorreta pela 3ª vez
    Então devo ver a mensagem de erro "Invalid credentials"
    E o usuário "Admin" deve ficar bloqueado por 15 minutos

  # @RN-AUTH-01 @Security
  # Cenário: Tentativa de login durante período de bloqueio
    #   Dado que o usuário "Admin" está bloqueado temporariamente
    #   Quando eu tento logar com a senha CORRETA "Admin123!"
    #   Então devo ver a mensagem "Credenciais inválidas ou conta bloqueada"

  @RF-AUTH-02 @Smoke
  Cenário: Encerramento de sessão (Logout) com sucesso
    Dado que estou logado no sistema
    Quando clico na opção de "Logout" no menu do usuário
    Então devo ser redirecionado para a página de Login
    E a sessão atual deve ser invalidada

  @RN-AUTH-07 @Security
  Cenário: Bloqueio de acesso via histórico do navegador após logout
    # Pré-condição explicita: Preciso estar dentro para sair
    Dado que estou logado no sistema
    E realizo o logout

    # Ação: Simular o botão "Voltar"
    Quando navego para a página anterior do histórico do navegador
      
    # Validação: Garante que o usuário não viu nem um flash da página restrita
    Então devo ser mantido na página de Login
    E não devo visualizar a Dashboard