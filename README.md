# Automação de Testes Cypress para o Sistema Seu Barriga

Este projeto contém uma suíte de testes automatizados desenvolvida com Cypress para validar funcionalidades chave do sistema de gerenciamento financeiro "Seu Barriga" (disponível em `https://seubarriga.wcaquino.me/`). O objetivo é garantir a estabilidade e o comportamento esperado da aplicação através de testes robustos e de fácil manutenção, com a geração de relatórios detalhados usando Allure.

---

### Visão Geral do Projeto

O projeto utiliza o Cypress como framework de automação para testes end-to-end (E2E). Ele é estruturado para cobrir os principais fluxos de usuário no sistema Seu Barriga, incluindo:

* **Autenticação:** Login de usuários existentes e validação de credenciais.
* **Gerenciamento de Usuários:** Criação de novos usuários.
* **Gerenciamento de Contas:** Adição e manipulação de contas financeiras.
* **Gerenciamento de Movimentações:** Criação de receitas e despesas, e validação de campos.
* **Validações:** Testes para campos obrigatórios e formato de valores.

A modularidade é alcançada através de comandos customizados do Cypress, que encapsulam ações repetitivas, tornando os testes mais legíveis e reutilizáveis. A geração de relatórios Allure permite uma análise visual e detalhada dos resultados das execuções, incluindo evidências em vídeo.

---

### Configuração do Ambiente e Instalação

Para executar este projeto, você precisará ter o Node.js e o npm (ou Yarn) instalados em sua máquina.

#### Pré-requisitos

* **Node.js:** Versão 16.x ou superior (recomendado). Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager) ou **Yarn**: Geralmente, vêm com a instalação do Node.js.

#### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/victorfigueiredoqa/automacao-srbarriga.git](https://github.com/victorfigueiredoqa/automacao-srbarriga.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd automacao-srbarriga
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
    Este comando instalará o Cypress, o Allure Reporter e quaisquer outras dependências listadas no `package.json`.

---

### Executando os Testes

Os testes podem ser executados de duas formas: via interface gráfica do Cypress (modo interativo) ou via linha de comando (modo headless, recomendado para CI/CD e geração de relatórios).

#### Execução em Modo Interativo (Interface Gráfica)

Para abrir a interface do Cypress e selecionar os testes manualmente:

BASH  
npx cypress open
# ou, se tiver script:
npm run cypress:open

Esta opção é ideal para desenvolvimento e depuração, mas não gera vídeos automaticamente e não é a forma recomendada para coletar resultados para o Allure.    

Execução em Modo Headless (Linha de Comando)  
Para executar todos os testes em um ambiente de linha de comando, gerar vídeos e os resultados brutos do Allure:  
Esta é a forma recomendada para coletar todas as evidências (vídeos e dados para o Allure).  

Geração de Relatórios Allure  
Após executar os testes no modo headless, você pode gerar um relatório HTML interativo com o Allure.  

Gerar o relatório HTML a partir dos resultados brutos:  

BASH  
npx cypress run  
# ou, se tiver script:  
npm run cypress:run  

Esta é a forma recomendada para coletar todas as evidências (vídeos e dados para o Allure).  

Geração de Relatórios Allure  
Após executar os testes no modo headless, você pode gerar um relatório HTML interativo com o Allure.  

1. Gerar o relatório HTML a partir dos resultados brutos:  

BASH  
allure generate allure-results --clean  

Este comando lê os dados de teste e os vídeos gerados pelo Cypress na pasta allure-results e cria a estrutura HTML do relatório na pasta allure-report. O --clean garante que relatórios anteriores sejam removidos antes de gerar um novo.  

2. Abrir o relatório no navegador:

BASH  
allure open
Este comando abrirá automaticamente o relatório Allure gerado em seu navegador padrão.  

** Documentação dos Testes e Fluxos **   
Os testes estão organizados no diretório cypress/e2e/. Cada arquivo de especificação (.cy.js) contém um conjunto de cenários relacionados a uma funcionalidade específica.    

A seguir, um resumo dos fluxos de teste principais:    

1. Testes de Autenticação e Usuário    
   
-> Criação de Novo Usuário:  
    Navega para a página de cadastro de usuário.  
    Preenche nome, email e senha com dados aleatórios.  
    Submete o formulário e verifica a mensagem de sucesso.  
    
-> Login de Sucesso:  
    Acessa a página de login.  
    Preenche credenciais válidas (definidas via variáveis de ambiente para segurança).  
    Submete o formulário e verifica a mensagem de boas-vindas.  

-> Login de Usuário Não Cadastrado:  
    Acessa a página de login.  
    Preenche credenciais de um usuário inexistente.  
    Submete o formulário e verifica a mensagem de erro de login.  

2. Testes de Gerenciamento de Contas
   
-> Adicionar Nova Conta:  
    Navega para a tela de gerenciamento de contas.  
    Clica na opção para adicionar nova conta.  
    Preenche o nome da conta (gerado dinamicamente para unicidade).  
    Salva a conta e verifica a mensagem de sucesso.  
    Adicionar Conta Existente:  
    Navega para a tela de gerenciamento de contas.  
    Tenta adicionar uma conta com um nome já existente.    
    Verifica a mensagem de erro indicando que a conta já existe.  

3. Testes de Gerenciamento de Movimentações  
   
-> Adicionar Movimentação de Receita/Despesa:  
    Navega para a tela de criação de movimentação.  
    Seleciona o tipo de movimentação (Receita ou Despesa).  
    Preenche campos como data da transação, data do pagamento, descrição (com timestamp para unicidade), interessado e valor.  
    Seleciona a conta associada.  
    Define o status (Pago/Pendente).  
    Salva a movimentação e verifica a mensagem de sucesso.  
    Observação: Há testes específicos para 2 movimentações de Receita e 2 de Despesa.  
    
-> Adicionar Movimentação por Tipo de Conta:  
    Navega para a tela de criação de movimentação.  
    Preenche os detalhes da movimentação.  
    Seleciona contas específicas como 'Conta para saldo' e 'Conta para extrato'.  
    Salva e valida a criação.  
    Observação: Há testes para 2 movimentações para 'Conta para saldo' e 2 para 'Conta para extrato'.  
    
-> Adicionar Movimentação por Situação (Pago/Pendente):  
    Navega para a tela de criação de movimentação.  
    Preenche os detalhes da movimentação.  
    Define o status Pago ou Pendente.  
    Salva e valida a criação.  
    Observação: Há testes para 2 movimentações pagas e 2 pendentes.    

4. Testes de Validação de Campos  
   
-> Validação de Campos Obrigatórios:  
    Navega para a tela de criação de movimentação.  
    Tenta salvar a movimentação sem preencher os campos obrigatórios (data da transação, data do pagamento, descrição, interessado, valor).  
    Verifica se as mensagens de erro para cada campo obrigatório são exibidas.  
    Validação de Campo "Valor":  
    Navega para a tela de criação de movimentação.  
    Preenche todos os campos, mas insere um valor inválido (ex: texto em vez de número) no campo 'Valor'.  
    Salva o formulário e verifica a mensagem de erro indicando que o valor deve ser um número.  
