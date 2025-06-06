describe('Teste funcionalidade de acessar contas', () => {
    let nomeConta1;
    let nomeConta2;
    let nomeConta3;

    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1280, 720);
        cy.loginSucesso();
    });

    it('Adicionar 3 contas', () => {
        const timestamp = Date.now().toString().slice(-2);
        nomeConta1 = `Conta_Automacao_${timestamp}_01`;
        cy.adicionarContas(nomeConta1);
        nomeConta2 = `Conta_Automacao_${timestamp}_02`;
        cy.adicionarContas(nomeConta2);
        nomeConta3 = `Conta_Automacao_${timestamp}_03`;
        cy.adicionarContas(nomeConta3);
    })

    it('Listar contas cadastradas e editar', () => {
        cy.get('.dropdown-toggle').contains('Contas').click();
        cy.get('a[href*="contas"]').click();
        cy.get('thead > tr > :nth-child(1)').contains('Conta').should('be.visible');

        cy.contains('table tbody tr td', nomeConta1)
            .siblings()
            .find('.glyphicon-edit')
            .click();

        cy.get('#nome').clear().type('Conta_Editada_01');
        cy.get('.btn').contains('Salvar').click();
        cy.get('.alert').should('be.visible').and('contain.text', 'Conta alterada com sucesso!');

        cy.contains('table tbody tr td', nomeConta2)
            .siblings()
            .find('.glyphicon-edit')
            .click();

        cy.get('#nome').clear().type('Conta_Editada_02')
        cy.get('.btn').contains('Salvar').click();
        cy.get('.alert').should('be.visible').and('contain.text', 'Conta alterada com sucesso!');

        cy.contains('table tbody tr td', nomeConta3)
            .siblings()
            .find('.glyphicon-edit')
            .click();

        cy.get('#nome').clear().type('Conta_Editada_03');
        cy.get('.btn').contains('Salvar').click();
        cy.get('.alert').should('be.visible').and('contain.text', 'Conta alterada com sucesso!');
    })

    it('Excluir conta com movimentação', () => {
        cy.get('.dropdown-toggle').contains('Contas').click();
        cy.get('a[href*="contas"]').click();
        cy.get('thead > tr > :nth-child(1)').contains('Conta').should('be.visible');
        const nomeContaParaExcluir = 'Conta com movimentacao';
        cy.contains('table tbody tr td', nomeContaParaExcluir)
            .siblings()
            .find('.glyphicon-remove-circle')
            .click();
        cy.get('.alert').should('be.visible').and('contain.text', 'Conta em uso na movimentações');
    })

    it('Adicionar conta já existente', () => {
        cy.adicionarContaJaExistente();
    })
})

