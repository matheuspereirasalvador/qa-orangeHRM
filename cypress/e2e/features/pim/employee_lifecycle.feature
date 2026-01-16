# language: pt
@pim @core
Funcionalidade: Ciclo de Vida do Funcionário (PIM)

    Contexto: 
        Dado que estou logado como Administrador
        E acesso o módulo PIM

    @REQ-PIM-01
    Cenário: Cadastro de novo funcionário com sucesso
        Quando cadastro um novo funcionário com os dados:
            | primeiro_nome | ultimo_nome |
            | Joao          | Silva       |
        Então o funcionário "Joao Silva" deve ser listado no diretório
        E o perfil do funcionário deve ser criado com sucesso

    @RN-PIM-01
    Cenário: Bloqueio de duplicidade de ID
        Dado que já existe um funcionário com ID "EMP001" criado via API
        Quando tento cadastrar um novo funcionário com o ID "EMP001"
        Então devo ver uma mensagem de erro indicando duplicidade

    @REQ-PIM-03
    Cenário: Exclusão de funcionário e limpeza de dados
        # Este passo garante que a Maria EXISTE antes de tentar apagar
        Dado que possuo um funcionário ativo chamado "Maria Souza" criado via API
        Quando realizo a exclusão permanente deste funcionário via UI
        Então o registro "Maria Souza" não deve mais existir na busca do PIM