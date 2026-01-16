# language: pt
@pim @security
Funcionalidade: Gestão de Anexos e Fotos de Perfil
    Como gestor
    Quero fazer upload da foto do funcionário
    Garantindo que arquivos maliciosos sejam bloqueados

    Contexto: Estar no perfil de um funcionário
        Dado que estou editando o perfil do funcionário "Joao Silva"

    @REQ-PIM-02
    Cenário: Upload de foto de perfil válida
        Quando faço o upload do arquivo "foto_perfil.jpg"
        Então a foto deve ser atualizada com sucesso no avatar do usuário

    @RN-PIM-02 @Security
    Esquema do Cenário: Bloqueio de arquivos maliciosos e extensões proibidas
        Quando tento fazer upload do arquivo "<arquivo>"
        Então o sistema deve rejeitar o upload
        E exibir a mensagem de erro "File type not allowed"

        Exemplos:
            | arquivo          | descricao_teste         |
            | script.php       | File type not allowed   |   
            | virus.exe        | File type not allowed   |
            | fake_image.jpg   | File type not allowed   |