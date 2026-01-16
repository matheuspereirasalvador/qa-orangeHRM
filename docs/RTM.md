# Matriz de Rastreabilidade de Requisitos (RTM)

**Projeto:** OrangeHRM
**Versão da Matriz:** 1.0
**Data:** 10/01/2026

**Legenda:**
* **Prioridade:** (A)lta, (M)édia, (B)aixa.
* **Status Cobertura:**  
⚠️ Pendente (Ainda não há caso de teste vinculado)
✅ Coberto (Caso de teste criado e revisado)

---

## 1. Módulo de Autenticação e Segurança (AuthSecure)

| REQ ID | Descrição Resumida | Prioridade | Test Case ID (BDD) | Status Cobertura | Bugs Relacionados |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **RF-AUTH-01** | Autenticação de Usuário  | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/login.feature) |
| **RF-AUTH-02** | Encerramento de Sessão | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/security_protection.feature)  |
| **RF-AUTH-03** | Proteção contra Força Bruta| **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/security_protection.feature)| BUG-001 |
| **RF-AUTH-04** | Controle de Acesso (RBAC) | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/admin_user_management.feature) |
| **RN-AUTH-01** | Regra: Política de Bloqueio | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/security_protection.feature) | BUG-001 |
| **RN-AUTH-02** | Regra: Política de Senha | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/admin_user_management.feature)|
| **RN-AUTH-03** | Regra: Saneamento de Input | **A** | *TBD* |✅ [Coberto](../cypress/e2e/features/auth/login.feature)|
| **RN-AUTH-04** | Regra: Unicidade de Usuário | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/admin_user_management.feature)|
| **RN-AUTH-05** | Regra: Permissões de Admin | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/admin_user_management.feature)|
| **RN-AUTH-06** | Regra: Restrição ESS | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/admin_user_management.feature) |
| **RN-AUTH-07** | Regra: Invalidação de Sessão | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/auth/security_protection.feature) |

---

## 2. Módulo PIM (Personal Information Management)

| REQ ID | Descrição Resumida | Prioridade | Test Case ID (BDD) | Status Cobertura | Bugs Relacionados |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **REQ-PIM-01** | Cadastro de Funcionário | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/pim/employee_lifecycle.feature) | - |
| **REQ-PIM-02** | Upload de foto | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/pim/employee_attachments.feature)| - |
| **REQ-PIM-03** | Exclusão de Funcionário | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/pim/employee_lifecycle.feature)| - |
| **RN-PIM-01** | Regra: Unicidade de Employee ID | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/pim/employee_lifecycle.feature)| - |
| **RN-PIM-02** | Regra: Segurança de Upload | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/pim/employee_attachments.feature)| - |
| **RN-PIM-03** | Regra: Remoção por UI — Delete (validação via UI apenas) | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/pim/employee_lifecycle.feature) | - |

---

## 3. Módulo Leave (Gestão de Licenças)

| REQ ID | Descrição Resumida | Prioridade | Test Case ID (BDD) | Status Cobertura | Bugs Relacionados |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **REQ-LEV-01** | Solicitação de Licença | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_application.feature) | - |
| **REQ-LEV-02** | Validação de Saldo | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_application.feature) | - |
| **REQ-LEV-03** | Aprovação de Licença| **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_management.feature) | - |
| **RN-LEV-01** | Regra: Saldo Insuficiente | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_application.feature) | - |
| **RN-LEV-02** | Regra: Colisão de Datas | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_application.feature) | - |
| **RN-LEV-03** | Regra: Cálculo Dias Corridos | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_application.feature) | - |
| **RN-LEV-04** | Regra: Concorrência - Lock Otimista | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/leave/leave_management.feature) | - |

---

## 4. Módulo Recruitment (Recrutamento)

| REQ ID | Descrição Resumida | Prioridade | Test Case ID (BDD) | Status Cobertura | Bugs Relacionados |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **REQ-REC-01** | Pipeline de Candidato | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/recruitment/candidate_workflow.feature) | - |
| **REQ-REC-02** | Contratação (Hire) | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/recruitment/hiring_process.feature)| - |
| **RN-REC-01** | Regra: E-mail Único | **B** | *TBD* | ✅ [Coberto](../cypress/e2e/features/recruitment/candidate_workflow.feature)| - |
| **RN-REC-02** | Regra: Migração de Dados| **B** | *TBD* | ✅ [Coberto](../cypress/e2e/features/recruitment/hiring_process.feature)| - |

---

## 5. Requisitos Não-Funcionais (RNF)

| REQ ID | Descrição Resumida | Prioridade | Test Case ID (BDD) | Status Cobertura | Bugs Relacionados |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **RNF-01** | Performance | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/cross_functional/api_security_headers.feature)| - |
| **RNF-02** | Segurança (Transporte) | **A** | *TBD* | ✅ [Coberto](../cypress/e2e/features/cross_functional/api_security_headers.feature)| - |
| **RNF-03** | Compatibilidade | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/cross_functional/browser_compatibility.feature)  | - |
| **RNF-04** | Tratamento de Erros | **M** | *TBD* | ✅ [Coberto](../cypress/e2e/features/cross_functional/error_handling.feature) | - |