# Plano de Teste - OrangeHRM

| Versão | 1.0 |
| :--- | :--- |
| **Data** | 10/01/2026 |
| **Autor** | Matheus Pereira Salvador |
| **Status** | Aprovado |

---

## 1. Contexto e Introdução
### 1.1 Objetivo
Garantir que os módulos críticos de RH funcionem sem falhas, assegurando a integridade dos dados dos colaboradores e a segurança das informações sensíveis.

### 1.2 Referências

* [Especificação de Requisitos de Software (SRS)](SRS.md)
* [Matriz de Rastreabilidade de Requisitos (RTM)](RTM.md)
---

## 2. Itens de Teste
Liste o que será testado (softwares, módulos, versões).
* **Frontend:** OrangeHRM v5.6
* **Backend/API:** PHP 8.2 (REST API v2)
* **Banco de Dados:** MySQL 8.0

---

## 3. Escopo

### 3.1 O Que Será Testado (In-Scope)
* **Admin**: Gerenciamento de usuários (RBAC), Configuração de Job, Organization, E-mail Configuration.
* **PIM (Personal Info)**: CRUD de funcionários, Upload de arquivos, Dependents, Reports.
* **Leave (Licenças)**: Definição de regras (Entitlements), Solicitação, Aprovação/Rejeição, Accruals.
* **Time**: Timesheets, Attendance (Punch in/out), Relatórios de horas.
* **Recruitment**: Criação de Vagas, Pipeline de Candidatos, Hiring.
* **Performance**: Testes básicos de carga.
* **API**: Endpoints principais utilizados pelo front-end.

### 3.2 O Que NÃO Será Testado (Out-of-Scope)
* Módulo Mobile App Nativo (foco será na versão Web Responsiva).
* Integrações com sistemas de folha de pagamento terceiros (simulados via Mock).
* Testes de Stress destrutivos (DDoS).

---

## 4. Estratégia de Teste

### 4.1 Níveis de Teste
* Smoke Testing: Executado a cada novo deploy no ambiente de QA para validar se a aplicação "sobe" (Login + Acesso ao Dashboard).
* Teste Funcional / Sistema: Validação detalhada de todos os requisitos de negócio (Black Box).
* Execução da suíte automatizada nos fluxos críticos antes do Release Candidate.
* Teste Exploratório: Sessões de 1 hora focadas em tentar quebrar fluxos complexos sem roteiro prévio.

### 4.2 Tipos de Teste
* **Funcional:** (Ex: Validação de campos, fluxo feliz e alternativo)
* **Não-Funcional:** (Ex: Usabilidade, Segurança básica)
* **Regressão:** (Ex: Testes automatizados nas principais features)

### 4.3 Dados de Teste
* Não utilizaremos dados de produção (LGPD/GDPR).
* Massa de dados será gerada via IA.

### 4.4 Critérios de Entrada (Entry Criteria)
* Ambiente de QA disponível e estável.
* Build deployado com sucesso.
* Smoke Test passou com > 95% de sucesso.

### 4.5 Critérios de Saída (Exit Criteria)
* 100% dos Casos de Teste Críticos e Altos executados e aprovados.
* Zero bugs de severidade "Crítica" ou "Alta" abertos.
* Relatório de cobertura de teste assinado.

### 4.6 Critérios de Suspensão e Retomada
* O Login estiver inoperante.
* Houver corrupção de dados no banco.
* Ambiente instável (Timeouts constantes).

---

## 5. Riscos e Mitigação (Abordagem Baseada em Risco)

| Risco (Produto ou Projeto) | Impacto | Plano de Mitigação |
| :--- | :--- | :--- | 
| Instabilidade no ambiente de QA | Alto | Ter ambiente local (Docker) pronto como backup.|
| Mudança de requisitos durante o teste | Médio | Congelar requisitos na semana de regressão. |
| Dependência de API de terceiros | Médio | Usar Mocks/Stubs para isolar o OrangeHRM.|
| Falta de dados para teste | Baixo | Gerar massa de dados antes dos testes

---

## 6. Ambiente de Teste e Ferramentas
* **Ambiente de QA**: https://www.orangehrm.com/
* **Gestão de Bugs**: Jira (Fluxo: Open -> In Progress -> Ready for QA -> Done)
* **Automação**: Cypress (JavaScript/TypeScript)
* **API Testing**: Postman
* **Performance**: K6
* **Browser Principal**: Firefox
* **Cross-Browser**: Google Chrome, Edge

---


## 8. Entregáveis

1.  Plano de Teste (Este documento).
2.  Suíte de Casos de Teste / Scripts.
3.  Relatórios de Bugs (Defect Reports).
4.  Relatório Sumário de Teste (Test Summary Report).

---

## 9. Aprovação

| Nome | Cargo | Data | Assinatura |
| :--- | :--- | :--- | :--- |
| [Nome] | Product Owner | - | - |
| [Nome] | Tech Lead | - | - |