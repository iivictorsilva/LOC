// Importa a função adicionarUsuario e o array usuarios do arquivo appAdd.js
const { adicionarUsuario, usuarios } = require('../appUser/appAdd.js');

// Describe cria um bloco de testes relacionados ao sistema de usuários
describe('Testes do sistema de usuários', () => {
    
    // beforeEach é executado antes de cada teste
    // Aqui estamos limpando o array de usuários para garantir isolamento entre os testes
    beforeEach(() => {
        usuarios.length = 0; // Esvazia o array de usuários
    });

    // Teste para verificar a adição de um novo usuário
    test('Deve adicionar um usuário à lista', () => {
        // Define um objeto de usuário de teste com dados válidos
        const novoUsuario = {
            nome: "João Silva",
            cpf: "12345678901", // CPF com 11 dígitos
            email: "joao@email.com", // Email válido
            senha: "senha123" // Senha com mais de 6 caracteres
        };

        // Chama a função adicionarUsuario com o array de usuários e o novo usuário
        const resultado = adicionarUsuario(usuarios, novoUsuario);
        
        // Verificações (assertions):
        // 1. Verifica se o array resultado tem exatamente 1 elemento
        expect(resultado).toHaveLength(1);
        
        // 2. Verifica se o primeiro elemento do array corresponde exatamente ao objeto novoUsuario
        expect(resultado[0]).toEqual({
            nome: "João Silva",
            cpf: "12345678901",
            email: "joao@email.com",
            senha: "senha123"
        });
    });

    // Teste para verificar se o array começa vazio
    test('O array usuarios deve estar vazio inicialmente', () => {
        // Verifica se o array de usuários está vazio antes de qualquer operação
        expect(usuarios).toHaveLength(0);
    });
});