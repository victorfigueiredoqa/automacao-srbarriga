describe('Teste da página de Login', () => {
  beforeEach(() => {
    cy.visit("/"); 
    cy.viewport(1280, 720);
  });

  it('Testar a criação de um novo usuário', () => {
    cy.criarUsuario();
  })

  it('Validar login com usuário não cadastrado', () => {
    cy.usuarioNaoCadastrado();
  })

  it('Validar login com sucesso', () => {
    cy.loginSucesso();
  })
})