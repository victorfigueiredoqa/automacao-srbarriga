describe('Teste funcionalidade de movimentações', () => {
    let descReceita1, descReceita2, descDespesa1, descDespesa2;

    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1280, 720);
        cy.loginSucesso();
    });

    it('Adicionar 2 movimentações para cada tipo de conta', () => {
        const timestamp = Date.now().toString().slice(-2); // Timestamp para unicidade

        // Movimentações para 'Receita'
        descReceita1 = `Mov. Receita 01 - ${timestamp}_A`;
        cy.adicionarMovimentacaoTipo({
            descricao: descReceita1,
            //nomeConta: 'Conta para saldo',
            tipo: 'REC' // Receita
        });

        descReceita2 = `Mov. Receita 02 - ${timestamp}_B`;
        cy.adicionarMovimentacaoTipo({
            descricao: descReceita2,
            //nomeConta: 'Conta para saldo',
            tipo: 'REC' // Receita
        });

        // Movimentações para 'Despesas'
        descDespesa1 = `Mov. Despesas 01 - ${timestamp}_C`;
        cy.adicionarMovimentacaoTipo({
            descricao: descDespesa1,
            //nomeConta: 'Conta para extrato',
            tipo: 'DESP' // Despesa
        });

        descDespesa2 = `Mov. Despesas 02 - ${timestamp}_C`;
        cy.adicionarMovimentacaoTipo({
            descricao: descDespesa2,
            //nomeConta: 'Conta para extrato',
            tipo: 'DESP' // Despesa
        });

        cy.get('a[href*="/extrato"]').click();
        cy.contains(descReceita1).should('be.visible');
        cy.contains(descReceita2).should('be.visible');
        cy.contains(descDespesa1).should('be.visible');
        cy.contains(descDespesa2).should('be.visible');
    });


    describe('Adicionar 2 movimentações para cada conta', () => {
        let descSaldo1, descSaldo2, descExtrato1, descExtrato2;

        beforeEach(() => {
            cy.visit("/");
            cy.viewport(1280, 720);
            cy.loginSucesso();
        });

        it('Adicionar 2 movimentações para cada conta', () => {
            const timestamp = Date.now().toString().slice(-2); // Timestamp para unicidade

            // Movimentações para 'Conta para saldo'
            descSaldo1 = `Mov. Saldo 01 - ${timestamp}_A`;
            cy.adicionarMovimentacao({
                descricao: descSaldo1,
                nomeConta: 'Conta para saldo',
                tipo: 'REC' // Receita
            });

            descSaldo2 = `Mov. Saldo 02 - ${timestamp}_B`;
            cy.adicionarMovimentacao({
                descricao: descSaldo2,
                nomeConta: 'Conta para saldo',
                tipo: 'REC' // Receita
            });

            // Movimentações para 'Conta para extrato'
            descExtrato1 = `Mov. Extrato 01 - ${timestamp}_C`;
            cy.adicionarMovimentacao({
                descricao: descExtrato1,
                nomeConta: 'Conta para extrato',
                tipo: 'DESP' // Despesa
            });

            descExtrato2 = `Mov. Extrato 02 - ${timestamp}_D`;
            cy.adicionarMovimentacao({
                descricao: descExtrato2,
                nomeConta: 'Conta para extrato',
                tipo: 'DESP' // Despesa
            });

            cy.get('a[href*="/extrato"]').click();
            cy.contains(descSaldo1).should('be.visible');
            cy.contains(descSaldo2).should('be.visible');
            cy.contains(descExtrato1).should('be.visible');
            cy.contains(descExtrato2).should('be.visible');
        });
    });

    describe('Adicionar 2 movimentações para cada situação', () => {
        let situacaoPago1, situacaoPago2, situacaoPendente1, situacaoPendente2;

        beforeEach(() => {
            cy.visit("/");
            cy.viewport(1280, 720);
            cy.loginSucesso();
        });

        it('Adicionar 2 movimentações para cada situação', () => {
            const timestamp = Date.now().toString().slice(-2); // Timestamp para unicidade

            // Movimentações para status pago 
            situacaoPago1 = `Mov. Situação Pago 01 - ${timestamp}_A`;
            cy.adicionarMovimentacaoSituacao({
                descricao: situacaoPago1,
                statusPago: true
            });

            situacaoPago2 = `Mov. Situação Pago 02 - ${timestamp}_A`;
            cy.adicionarMovimentacaoSituacao({
                descricao: situacaoPago2,
                statusPago: true
            });

            // Movimentações para status pendente
            situacaoPendente1 = `Mov. Situação Pendente 01 - ${timestamp}_A`;
            cy.adicionarMovimentacaoSituacao({
                descricao: situacaoPendente1,
                statusPago: false
            });

            situacaoPendente2 = `Mov. Situação Pendente 02 - ${timestamp}_A`;
            cy.adicionarMovimentacaoSituacao({
                descricao: situacaoPendente2,
                statusPago: false
            });

            cy.get('a[href*="/extrato"]').click();
            cy.contains(situacaoPago1).should('be.visible');
            cy.contains(situacaoPago2).should('be.visible');
            cy.contains(situacaoPendente1).should('be.visible');
            cy.contains(situacaoPendente2).should('be.visible');
        });
    });

    describe('Validar campos obrigatórios', () => {

        beforeEach(() => {
            cy.visit("/");
            cy.viewport(1280, 720);
            cy.loginSucesso();
        });

        it('Submeter formulário com campos obrigatórios não preenchidos', () => {
            cy.validarCamposObrigatorios();
        });
    });

    describe('Validar campo Valor', () => {

        beforeEach(() => {
            cy.visit("/");
            cy.viewport(1280, 720);
            cy.loginSucesso();
        });

        it.only('Submeter formulário com campo valor preenchido incorretamente', () => {
            cy.validarCampoValor();
        });
    });
})