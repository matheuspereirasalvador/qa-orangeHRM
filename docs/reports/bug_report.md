## 🐞 BUG-001 | Falha no Bloqueio de Conta (Proteção contra Brute Force)

| Campo | Detalhe |
| :--- | :--- |
| **ID** | **BUG-001** |
| **Severidade** | 🔴 **Crítica** (Risco de Segurança) |
| **Prioridade** | Alta |
| **Componente** | Módulo de Autenticação / Login |
| **Versão** | OrangeHRM OS 5.7 (Demo Environment) |
| **Regra e Requisito** | `@RN-AUTH-01` `@RF-AUTH-03` |

### 📝 Descrição do Problema
O mecanismo de segurança de bloqueio de conta (Account Lockout) não é acionado após 3 tentativas consecutivas de login com credenciais inválidas. O sistema permite tentativas ilimitadas de adivinhação de senha, violando a política de segurança estabelecida para mitigação de ataques de Força Bruta (RF-AUTH-03 e RN-AUTH-01).

### 👣 Passos para Reproduzir (Steps to Reproduce)
1.  Acessar a página de login (`/web/index.php/auth/login`).
2.  Inserir um nome de usuário válido (ex: `Admin`).
3.  Inserir uma senha incorreta (ex: `senhaErrada1`) e clicar em Login.
4.  Repetir o passo anterior por mais 2 vezes (Totalizando 3 falhas consecutivas).
5.  Tentar realizar o login uma 4ª vez.

### ✅ Resultado Esperado
O sistema deve impedir novas tentativas de login para o usuário "Admin" por um período de 15 minutos, exibindo uma mensagem informativa de bloqueio ou mantendo a mensagem genérica (dependendo da política de *User Enumeration*), mas efetivamente recusando credenciais mesmo que corretas durante o período de bloqueio.

### ❌ Resultado Atual (Actual Result)
O sistema exibe a mensagem "Invalid credentials" repetidamente, mas **permite tentativas infinitas** de login sem aplicar qualquer bloqueio temporário à conta.

### 📸 Evidências

* **Execução do Teste:** ![Tentativas de Login](/docs/evidence/bugs/bug_evidence_001_bruteforce.gif)

---