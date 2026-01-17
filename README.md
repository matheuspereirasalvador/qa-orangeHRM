# 🍊 QA Enterprise Architecture Portfolio | OrangeHRM

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Azure DevOps](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=azuredevops&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![K6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)

> **Projeto de Engenharia de Qualidade** demonstrando o ciclo completo de testes: desde a concepção BDD, automação E2E/API, testes de performance, até a integração contínua em múltiplos provedores de nuvem.

---

## 🎯 Escopo e Arquitetura

O projeto simula a rotina de um QA Engineer Sênior, cobrindo as camadas da pirâmide de testes e requisitos não funcionais.

### 🧩 Cobertura de Testes (Estratégia)
| Tipo | Ferramenta | Descrição |
| :--- | :--- | :--- |
| **E2E (UI)** | **Cypress** | Fluxos de Contratação, Gestão de Pessoas (PIM) e Licenças. |
| **API** | **Cypress** | Validação de Status Code, Headers de Segurança e Contratos. |
| **BDD** | **Cucumber** | Escrita de cenários em Gherkin (PT-BR) focada em regras de negócio. |
| **Performance** | **K6** | Testes de Carga (Load Testing) e verificação de latência (SLAs). |
| **Gestão** | **Jira + Xray** | Rastreabilidade, Planos de Teste e Evidências de Execução. |

---

## 📑 Planejamento & Documentação (QA Artifacts)

Antes da execução dos testes, foi realizado um planejamento estruturado para garantir a qualidade e a rastreabilidade do processo. Os artefatos gerados documentam todo o ciclo de vida do teste:

* **[Software Requirements Specification (SRS)](docs/SRS.md):** Documento detalhado contendo o levantamento dos requisitos funcionais e regras de negócio mapeadas.
* **[Requirements Traceability Matrix (RTM)](docs/RTM.md):** Matriz de rastreabilidade que liga cada requisito aos seus respectivos cenários de teste, garantindo cobertura total.
* **[Plano de Teste (Test Plan)](docs/test_plan.md):** Estratégia completa definindo escopo, ferramentas, riscos e cronograma da bateria de testes.
* **[Relatório de Bugs (Bug Reports)](/docs/reports/bug_report.md):** Documentação técnica dos defeitos encontrados durante a execução (incluindo steps to reproduce, evidências e severidade).

---

## 🚧 Desafios e Soluções (Environment Strategy)

Como o projeto utiliza o ambiente público **OrangeHRM Open Source Demo**, enfrentamos desafios de instabilidade de dados (resets constantes) e lentidão de servidor.

**Minha Abordagem de Mitigação:**
1.  **Blindagem de Testes:** Implementação de `retries`, `waits` dinâmicos e tratativas de exceção para minimizar falsos negativos.
2.  **Estratégia Híbrida:** Nos casos onde a automação é bloqueada por dados inconsistentes (ex: falta de saldo de férias no servidor demo), optei pela **Validação Manual Documentada** (via Jira/Xray) e mantive o código da automação como prova de competência técnica.
3.  **Pipeline Resiliente:** O CI/CD foi configurado com `continue-on-error` para garantir a geração de artefatos (vídeos/logs) mesmo em falhas de infraestrutura.

---

## 🚀 CI/CD & DevOps

Demonstração de versatilidade configurando pipelines nos dois principais players do mercado.

### 🔹 GitHub Actions
* **Arquivo:** `.github/workflows/main.yml`
* **Trigger:** Push na branch `main`.
* **Função:** Roda a suíte Cypress em container Ubuntu, gera artefatos de vídeo em caso de falha.

### 🔹 Azure DevOps
* **Arquivo:** `azure-pipelines.yml`
* **Função:** Configuração pronta para integração com Azure Pipelines, demonstrando conhecimento em ecossistema Microsoft.

---

## 📊 Performance Testing (K6)

Testes de carga isolados para validar a resiliência da aplicação sob estresse.

* **Script:** `/performance/load_test_login.js`
* **Cenário:** Simulação de 10 VUs (Virtual Users) simultâneos acessando a autenticação.
* **Thresholds:** Falha se 95% das requisições demorarem > 2s.

---

## 📂 Evidências e Gestão (Jira)

A rastreabilidade é o coração da QA. Consulte a pasta `/docs/evidence` para visualizar:
* ✅ **User Stories & BDD:** Print dos cards no Jira.
* ✅ **Test Execution:** Relatórios do Xray comprovando a validação dos cenários.
* ✅ **Bugs Reportados:** Defeitos encontrados durante a automação (ex: sobreposição de férias permitida indevidamente).

---

## ⚡ Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar Testes E2E (Interface Gráfica)
npx cypress open

# 3. Rodar Testes E2E (Modo Headless/CI)
npx cypress run --browser chrome

# 4. Rodar Testes de Performance
k6 run performance/load_test_login.js
```
---
Autor: Matheus Pereira Salvador 
