# Especificação de Requisitos de Software (SRS)
**Projeto:** OrangeHRM Enhanced (Auth + Core Modules)
**Versão:** 2.1 (Consolidada)
**Data:** 10/01/2026
**Status:** Aprovado para QA
**Autores:** Matheus (QA Lead) & PO Team

---

## 1. Introdução
Este documento descreve os requisitos funcionais e não-funcionais para o sistema OrangeHRM, cobrindo os módulos críticos de Autenticação/Segurança, Gestão de Pessoas (PIM), Licenças (Leave) e Recrutamento.

### 1.1 Objetivo
Garantir a integridade dos dados dos colaboradores, segurança contra acessos indevidos (OWASP) e automação confiável dos fluxos de RH.

---

## 2. Módulo de Autenticação e Segurança (AuthSecure)

### 2.1 Requisitos Funcionais (RF)
| ID | Título | Descrição |
| :--- | :--- | :--- |
| **RF-AUTH-01** | Autenticação de Usuário | O sistema deve permitir que usuários registrados acessem a plataforma mediante credenciais válidas. |
| **RF-AUTH-02** | Encerramento de Sessão | O sistema deve fornecer um mecanismo seguro de logout para invalidar a sessão atual. |
| **RF-AUTH-03** | Proteção contra Força Bruta | O sistema deve detectar e bloquear tentativas repetidas de acesso inválido. |
| **RF-AUTH-04** | Controle de Acesso (RBAC) | O sistema deve restringir o acesso a menus e recursos com base no perfil do usuário logado. |

### 2.2 Regras de Negócio (RN)
* **RN-AUTH-01 (Política de Bloqueio):** Se o usuário falhar a senha **3 vezes consecutivas**, a conta deve ser temporariamente bloqueada por **15 minutos**.
    * *Feedback:* A mensagem deve ser genérica ("Credenciais inválidas ou conta bloqueada") para não revelar a existência do usuário.
* **RN-AUTH-02 (Política de Senha):** Novas senhas devem possuir complexidade mínima:
    * Mínimo de 8 caracteres.
    * Pelo menos 1 número.
    * Pelo menos 1 caractere especial (!@#$...).
* **RN-AUTH-03 (Saneamento de Input):** Campos de login não podem ser submetidos vazios ou contendo apenas espaços em branco. O sistema deve realizar *trim* automático antes da validação.
* **RN-AUTH-04 (Unicidade de Usuário):** O `Username` é chave única no sistema. Não é permitido cadastrar duplicatas.
* **RN-AUTH-05 (Permissões de Admin):** Usuários com perfil `Admin` possuem acesso irrestrito de Leitura/Escrita ao módulo "User Management".
* **RN-AUTH-06 (Restrição ESS):** Usuários com perfil `ESS` (Employee Self Service) **NÃO** podem acessar rotas administrativas (`/admin/*`). Tentativas de acesso direto via URL devem retornar erro **403 Forbidden**.
* **RN-AUTH-07 (Invalidação de Sessão):** Ao fazer logout, o token de sessão (JWT ou Cookie) deve ser invalidado tanto no cliente (limpeza de storage) quanto no servidor (blacklist). O botão "Voltar" do navegador não deve permitir reuso da sessão.

---

## 3. Módulo PIM (Personal Information Management)

### 3.1 Requisitos Funcionais (RF)
| ID | Título | Descrição |
| :--- | :--- | :--- |
| **REQ-PIM-01** | Cadastro de Funcionário | O sistema deve permitir cadastrar novos funcionários com dados básicos e criação opcional de login. |
| **REQ-PIM-02** | Upload de Foto | O sistema deve permitir upload de foto de perfil com validação de segurança estrita. |
| **REQ-PIM-03** | Exclusão de Funcionário | O sistema deve permitir a remoção completa de um funcionário. |

### 3.2 Regras de Negócio (RN)
* **RN-PIM-01 (Unicidade de ID):** O `EmployeeID` deve ser único. O sistema deve impedir duplicidade na criação.
* **RN-PIM-02 (Segurança de Upload):**
    * A validação deve ocorrer via **Magic Numbers** (assinatura binária) e não apenas extensão.
    * **Allowlist:** Apenas `.jpg`, `.jpeg`, `.png`.
    * **Blocklist:** Rejeitar imediatamente `.exe`, `.sh`, `.php`, `.bat`, mesmo se renomeados.
    * **Tamanho:** Máximo 1MB.
* **RN-PIM-03 (Deleção em Cascata - Hard Delete):** A exclusão de um funcionário deve remover fisicamente todos os registros dependentes (Leave Requests, Timesheets, Reviews) para evitar orfandade de dados no banco.

---

## 4. Módulo Leave (Gestão de Licenças)

### 4.1 Requisitos Funcionais (RF)
| ID | Título | Descrição |
| :--- | :--- | :--- |
| **REQ-LEV-01** | Solicitação de Licença | O usuário (ESS) deve poder solicitar licença (férias, doença, etc.). |
| **REQ-LEV-02** | Validação de Saldo | O sistema deve validar se o funcionário possui saldo suficiente. |
| **REQ-LEV-03** | Aprovação de Licença | Supervisor/Admin deve poder aprovar ou rejeitar solicitações. |

### 4.2 Regras de Negócio (RN)
* **RN-LEV-01 (Saldo Insuficiente):** Bloquear a solicitação se `Dias Solicitados > Saldo Atual` (salvo configuração de exceção).
* **RN-LEV-02 (Colisão de Datas):** Um funcionário não pode ter dois registros de licença (Pendente ou Aprovado) que coincidam em datas.
* **RN-LEV-03 (Cálculo de Dias - Dias Corridos):** O cálculo da duração da licença inclui Sábados, Domingos e Feriados.
    * *Exemplo:* De Sexta a Segunda = 4 dias descontados do saldo.
* **RN-LEV-04 (Concorrência - Lock Otimista):**
    * Se dois administradores tentarem aprovar a mesma solicitação simultaneamente:
    * O primeiro request é processado com sucesso.
    * O segundo deve falhar com a mensagem: *"A solicitação já foi processada ou o status mudou."*

---

## 5. Módulo Recruitment (Recrutamento)

### 5.1 Requisitos Funcionais (RF)
| ID | Título | Descrição |
| :--- | :--- | :--- |
| **REQ-REC-01** | Pipeline de Candidato | O sistema deve permitir mover o candidato através dos status (Shortlisted -> Interview -> Hired). |
| **REQ-REC-02** | Contratação (Hire) | Ao marcar como "Hired", deve ser possível migrar os dados do candidato para criar um registro no PIM. |

### 5.2 Regras de Negócio (RN)
* **RN-REC-01 (E-mail Único):** Não é permitido cadastrar o mesmo e-mail duas vezes para a mesma vaga ativa.
* **RN-REC-02 (Migração de Dados):** Na conversão Candidato -> Funcionário, os campos `Nome`, `Sobrenome` e `E-mail` devem ser preservados.

---

## 6. Requisitos Não-Funcionais (RNF)

| ID | Título | Descrição |
| :--- | :--- | :--- |
| **RNF-01** | Performance | O login e operações de CRUD simples devem responder em < 2 segundos (4G). |
| **RNF-02** | Segurança (Transporte) | Todas as comunicações via HTTPS (TLS 1.2+). |
| **RNF-03** | Compatibilidade | Suporte a Chrome (v100+), Firefox (v100+) e Edge. |
| **RNF-04** | Tratamento de Erros | O sistema nunca deve expor Stack Traces ou detalhes de SQL/Server para o usuário final (Ex: Erro 500 deve mostrar página genérica). |

---

## 7. Exemplos de Payload (API Reference)

**POST /api/v1/auth/login**
```json
{
  "username": "admin",
  "password": "Password123!"
}
```
**POST /api/v1/employee/upload-photo (Multipart)**

File: "family_photo.png" (MIME: image/png)
Headers: Content-Type: multipart/form-data
Body: binary_data...