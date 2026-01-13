# language: pt
@pim @core
Funcionalidade: Ciclo de Vida do Funcionário (PIM)
    Como um administrador de RH
    Quero gerenciar os registros dos funcionários
    Para manter a base de dados da empresa atualizada

    Contexto: 
        Dado que estou logado como Administrador
        E acesso o módulo PIM

    @REQ-PIM-01
    Cenario: Cadastro de novo funcionário com sucesso
        Quando cadastro um novo funcionário com os dados:
            | primeiro_nome | ultimo_nome |
            | Joao          | Silva       |
        Então o funcionário "Joao Silva" deve ser listado no diretório
        E o perfil do funcionário deve ser criado com sucesso

    @RN-PIM-01
    Cenario: Bloqueio de duplicidade de ID
        Dado que já existe um funcionário com ID "EMP001"
        Quando tento cadastrar um novo funcionário com o ID "EMP001"
        Então devo ver uma mensagem de erro "Employee ID already exists"
    
    @REQ-PIM-03 @RN-PIM-03
    Cenario: Exclusão de funcionário e limpeza de dados (Hard Delete)
        Dado que possuo um funcionário ativo chamado "Maria Souza"
        Quando realizo a exclusão permanente deste funcionário
        Então o registro não deve mais existir na busca do PIM
        # Validação da Regra de Cascata (RN-PIM-03)
        E todos os registros dependentes (Licenças e Timesheets) devem ser removidos do banco