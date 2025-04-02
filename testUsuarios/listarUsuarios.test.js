// Importa as funções adicionarUsuario, listarUsuarios e o array usuarios do arquivo appListar.js
const { adicionarUsuario, listarUsuarios, usuarios } = require('../appUser/appListar.js');

// Describe agrupa todos os testes relacionados ao sistema de usuários
describe('Testes do sistema de usuários', () => {
    
    // Executa antes de cada teste para garantir que cada teste comece com um estado limpo
    beforeEach(() => {
        usuarios.length = 0; // Limpa o array de usuários
    });

    // Bloco de testes específicos para a função de adicionar usuário
    describe('Testes de adição de usuários', () => {
        // Teste para verificar se um usuário é adicionado corretamente
        test('Deve adicionar um novo usuário corretamente', () => {
            const novoUsuario = {
                nome: "João Silva",
                cpf: "12345678901",
                email: "joao@email.com",
                senha: "senha123"
            };

            const resultado = adicionarUsuario(usuarios, novoUsuario);
            
            // Verifica se o array resultante tem 1 usuário
            expect(resultado).toHaveLength(1);
            // Verifica se o usuário adicionado tem os mesmos dados (exceto senha por segurança)
            expect(resultado[0]).toMatchObject({
                nome: "João Silva",
                cpf: "12345678901",
                email: "joao@email.com"
            });
        });

        // Teste para verificar se retorna o array atualizado
        test('Deve retornar o array atualizado após adição', () => {
            const novoUsuario = {
                nome: "Maria Souza",
                cpf: "98765432109",
                email: "maria@email.com",
                senha: "senha456"
            };

            const resultado = adicionarUsuario(usuarios, novoUsuario);
            
            // Verifica se o retorno é exatamente o mesmo array de usuários (mesma referência)
            expect(resultado).toBe(usuarios);
        });
    });

    // Bloco de testes específicos para a função de listar usuários
    describe('Testes de listagem de usuários', () => {
        // Array com dados de teste que serão usados em múltiplos testes
        const usuariosTeste = [
            {
                nome: "Carlos Oliveira",
                cpf: "11122233344",
                email: "carlos@email.com",
                senha: "senha789"
            },
            {
                nome: "Ana Santos",
                cpf: "55566677788",
                email: "ana@email.com",
                senha: "senha000"
            }
        ];

        // Executa antes de cada teste neste bloco para adicionar usuários de teste
        beforeEach(() => {
            usuariosTeste.forEach(user => adicionarUsuario(usuarios, user));
        });

        // Teste para verificar se lista todos os usuários corretamente
        test('Deve listar todos os usuários cadastrados', () => {
            const resultado = listarUsuarios(usuarios);
            
            // Verifica se retornou 2 usuários
            expect(resultado).toHaveLength(2);
            // Verifica se contém os usuários com os CPFs esperados
            expect(resultado).toEqual(expect.arrayContaining([
                expect.objectContaining({ cpf: "11122233344" }),
                expect.objectContaining({ cpf: "55566677788" })
            ]));
        });

        // Teste para verificar se retorna uma cópia do array e não a referência original
        test('Deve retornar uma cópia do array de usuários', () => {
            const resultado = listarUsuarios(usuarios);
            
            // Verifica se não é o mesmo objeto (referência diferente)
            expect(resultado).not.toBe(usuarios);
            // Verifica se o conteúdo é igual
            expect(resultado).toEqual(usuarios);
        });

        // Teste para verificar comportamento com array vazio
        test('Deve retornar array vazio quando não há usuários', () => {
            usuarios.length = 0; // Garante que o array está vazio
            const resultado = listarUsuarios(usuarios);
            
            // Verifica se retornou array vazio
            expect(resultado).toHaveLength(0);
            expect(resultado).toEqual([]);
        });
    });

    
});