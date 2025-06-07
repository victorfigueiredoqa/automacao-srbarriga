// Custom command para criar um novo usuário
Cypress.Commands.add("criarUsuario", () => {
    const timestamp = Date.now();
    const nomeAleatorio = `Teste${timestamp}`;
    const emailAleatorio = `teste${timestamp}@email.com`;
    const senhaAleatoria = `Senha@${timestamp.toString().substring(5, 9)}`;

    cy.contains('Novo usuário?').click();
    cy.get('#nome').type(nomeAleatorio);
    cy.get('#email').type(emailAleatorio);
    cy.get('#senha').type(senhaAleatoria, { log: false });
    cy.get('.btn').contains('Cadastrar').click();
    cy.get('.alert').contains('Usuário inserido com sucesso').should('be.visible');
    cy.wrap({ email: emailAleatorio, senha: senhaAleatoria }).as('novoUsuarioCriado');
});

// Custom command para validar acesso de usuário não cadastrado
Cypress.Commands.add("usuarioNaoCadastrado", (UsuarioNaoCadastrado = Cypress.env("EMAIL_USUARIO_NAO_CADASTRADO"), senha = Cypress.env("SENHA_USUARIO_NAO_CADASTRADO")) => {
    if (!UsuarioNaoCadastrado || !senha) {
        throw new Error("Credenciais EMAIL_USUARIO_NAO_CADASTRADO ou SENHA_USUARIO_NAO_CADASTRADO não definidas...");
    }
    cy.get('#email').type(UsuarioNaoCadastrado);
    cy.get('#senha').type(senha);
    cy.get('.btn').contains('Entrar').click();
    cy.get('.alert').contains('Problemas com o login do usuário').should('be.visible');
});


// Custom command para realizar login com sucesso
Cypress.Commands.add("loginSucesso", (emailUsuario = Cypress.env("USUARIO_SRBARRIGA"), senhaUsuario = Cypress.env("SENHA_SEBARRIGA")) => {
    if (!emailUsuario || !senhaUsuario) {
        throw new Error("Credenciais USUARIO_SRBARRIGA ou SENHA_SRBARRIGA não definidas...");
    }
    cy.get('#email').type(emailUsuario);
    cy.get('#senha').type(senhaUsuario, { log: false });
    cy.get('.btn').contains('Entrar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Bem vindo,');
});

// Custom command para realizar logout com sucesso
Cypress.Commands.add("logoutSucesso", (emailUsuario = Cypress.env("USUARIO_SRBARRIGA"), senhaUsuario = Cypress.env("SENHA_SEBARRIGA")) => {
    if (!emailUsuario || !senhaUsuario) {
        throw new Error("Credenciais USUARIO_SRBARRIGA ou SENHA_SRBARRIGA não definidas...");
    }
    cy.get('#email').type(emailUsuario);
    cy.get('#senha').type(senhaUsuario, { log: false });
    cy.get('.btn').contains('Entrar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Bem vindo,');
    cy.get('a[href*="logout"]').contains('Sair').click();
});

// Custom command para adicionar conta
Cypress.Commands.add("adicionarContas", (nomeConta) => {

    cy.get('.dropdown-toggle').contains('Contas').click();
    cy.get('a[href*="addConta"]').click();
    cy.get('#nome').clear().type(nomeConta);
    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Conta adicionada com sucesso!');
});

// Custom command para adionar conta já existente
Cypress.Commands.add("adicionarContaJaExistente", () => {
    cy.get('.dropdown-toggle').contains('Contas').click();
    cy.get('a[href*="addConta"]').click();
    cy.get('#nome').type('Conta mesmo nome');
    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Já existe uma conta com esse nome!');
});

// Custom commands para adicionar movimentação por tipo
Cypress.Commands.add("adicionarMovimentacaoTipo", (movimentacao = {}) => {
    
    const defaults = {
        tipo: 'REC', // REC ou DESP
        dataTransacao: Cypress.moment().format('DD/MM/YYYY'),
        dataPagamento: Cypress.moment().add(1, 'day').format('DD/MM/YYYY'),
        descricao: `Movimentacao Aleatoria ${Date.now().toString().slice(-2)}`,
        interessado: 'Victor QA',
        valor: '100',
        nomeConta: 'Conta para movimentacoes',
        statusPago: true
    };

    const options = { ...defaults, ...movimentacao };

    cy.get('a[href*="movimentacao"]').contains('Criar Movimentação').click();
    cy.get('#tipo').select(options.tipo);
    cy.get('#data_transacao').type(options.dataTransacao);
    cy.get('#data_pagamento').type(options.dataPagamento);
    cy.get('#descricao').type(options.descricao); // Usa a descrição gerada/passada
    cy.get('#interessado').type(options.interessado);
    cy.get('#valor').type(options.valor);
    cy.get('#conta').select(options.nomeConta); // Usa o nome da conta
    
    if (options.statusPago) {
        cy.get('#status_pago').click();
    } else {
        cy.get('#status_pendente').click(); // Se houver a opção pendente
    }

    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Movimentação adicionada com sucesso!');
});


// Custom commands para adicionar movimentação por conta
Cypress.Commands.add("adicionarMovimentacao", (movimentacao = {}) => {
    // Define valores padrão e sobrescreve com o que for passado
    const defaults = {
        tipo: 'REC', // REC ou DESP
        dataTransacao: Cypress.moment().format('DD/MM/YYYY'),
        dataPagamento: Cypress.moment().add(1, 'day').format('DD/MM/YYYY'),
        descricao: `Movimentacao Aleatoria ${Date.now().toString().slice(-2)}`,
        interessado: 'Victor QA',
        valor: '100',
        nomeConta: 'Conta para saldo', // Nome da conta padrão
        statusPago: true
    };

    const options = { ...defaults, ...movimentacao };

    cy.get('a[href*="movimentacao"]').contains('Criar Movimentação').click();
    cy.get('#tipo').select(options.tipo);
    cy.get('#data_transacao').type(options.dataTransacao);
    cy.get('#data_pagamento').type(options.dataPagamento);
    cy.get('#descricao').type(options.descricao); // Usa a descrição gerada/passada
    cy.get('#interessado').type(options.interessado);
    cy.get('#valor').type(options.valor);
    cy.get('#conta').select(options.nomeConta); // Usa o nome da conta
    
    if (options.statusPago) {
        cy.get('#status_pago').click();
    } else {
        cy.get('#status_pendente').click(); // Se houver a opção pendente
    }

    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Movimentação adicionada com sucesso!');
});

// Custom commands para adicionar movimentação por situação
Cypress.Commands.add("adicionarMovimentacaoSituacao", (movimentacao = {}) => {
    // Define valores padrão e sobrescreve com o que for passado
    const defaults = {
        tipo: 'REC', 
        dataTransacao: Cypress.moment().format('DD/MM/YYYY'),
        dataPagamento: Cypress.moment().add(1, 'day').format('DD/MM/YYYY'),
        descricao: `Movimentacao Aleatoria ${Date.now().toString().slice(-2)}`,
        interessado: 'Victor QA',
        valor: '100',
        nomeConta: 'Conta para saldo',
        statusPago: true
    };

    const options = { ...defaults, ...movimentacao };

    cy.get('a[href*="movimentacao"]').contains('Criar Movimentação').click();
    cy.get('#tipo').select(options.tipo);
    cy.get('#data_transacao').type(options.dataTransacao);
    cy.get('#data_pagamento').type(options.dataPagamento);
    cy.get('#descricao').type(options.descricao); 
    cy.get('#interessado').type(options.interessado);
    cy.get('#valor').type(options.valor);
    cy.get('#conta').select(options.nomeConta); 
    
    if (options.statusPago) {
        cy.get('#status_pago').click();
    } else {
        cy.get('#status_pendente').click(); 
    }

    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Movimentação adicionada com sucesso!');
});

// Custom command para validar campos obrigatórios
Cypress.Commands.add("validarCamposObrigatorios", () => {
    cy.get('a[href*="movimentacao"]').contains('Criar Movimentação').click();
    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Data da Movimentação é obrigatório', 'Data do pagamento é obrigatório', 'Descrição é obrigatório', 'Interessado é obrigatório', 'Valor é obrigatório');
});

// Custom command para validar campo VALOR
Cypress.Commands.add("validarCampoValor", () => {
    cy.get('a[href*="movimentacao"]').contains('Criar Movimentação').click();
    cy.get('#tipo').select('Receita');
    cy.get('#data_transacao').type('01/06/2025');
    cy.get('#data_pagamento').type('05/06/2025');
    cy.get('#descricao').type('Teste');
    cy.get('#interessado').type('Teste');
    cy.get('#valor').type('ADFF');
    cy.get('.btn').contains('Salvar').click();
    cy.get('.alert').should('be.visible').and('contain.text', 'Valor deve ser um número');
});




