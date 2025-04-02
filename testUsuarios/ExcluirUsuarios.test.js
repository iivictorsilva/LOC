// Importa a função excluirUsuario e o array usuarios do arquivo appExcluir.js
const { excluirUsuario, usuarios } = require('../appUser/appExcluir.js');

// Describe cria um bloco de testes para a funcionalidade de exclusão de usuários
describe('Testes de exclusão de usuários', () => {
    // Define um usuário de teste padrão que será usado nos testes
    const usuarioTeste = {
        nome: "Carlos Oliveira",
        cpf: "11122233344",  // CPF com 11 dígitos
        email: "carlos@email.com",  // Email válido
        senha: "senha123"  // Senha com mais de 6 caracteres
    };

    // Executa antes de cada teste para garantir um estado consistente
    beforeEach(() => {
        // 1. Limpa o array de usuários
        usuarios.length = 0;
        // 2. Adiciona uma cópia do usuário de teste
        usuarios.push({ ...usuarioTeste });
    });

    // Teste: Exclusão bem-sucedida de um usuário existente
    test('Deve excluir um usuário existente', () => {
        // Executa a função de exclusão
        const resultado = excluirUsuario(usuarios, "11122233344");
        
        // Verificações:
        // 1. O resultado deve ser igual ao usuário que foi excluído
        expect(resultado).toEqual(usuarioTeste);
        // 2. O array de usuários deve estar vazio após a exclusão
        expect(usuarios).toHaveLength(0);
    });

    // Teste: Verifica se a função retorna o usuário excluído
    test('Deve retornar o usuário excluído', () => {
        // Executa a função de exclusão
        const usuarioExcluido = excluirUsuario(usuarios, "11122233344");
        
        // Verificações:
        // 1. O nome do usuário excluído deve ser o esperado
        expect(usuarioExcluido.nome).toBe("Carlos Oliveira");
        // 2. O CPF do usuário excluído deve ser o esperado
        expect(usuarioExcluido.cpf).toBe("11122233344");
    });

    // Teste: Tentativa de excluir um usuário que não existe
    test('Deve lançar erro ao tentar excluir usuário inexistente', () => {
        // Verifica se a função lança um erro quando o usuário não existe
        expect(() => {
            excluirUsuario(usuarios, "00000000000");
        }).toThrow('Usuário não encontrado');
    });

    // Teste: Exclusão com múltiplos usuários no sistema
    test('Deve manter outros usuários ao excluir um específico', () => {
        // Adiciona um segundo usuário ao array
        usuarios.push({
            nome: "Ana Santos",
            cpf: "55566677788",
            email: "ana@email.com",
            senha: "senha456"
        });

        // Exclui o primeiro usuário
        excluirUsuario(usuarios, "11122233344");
        
        // Verificações:
        // 1. Deve restar apenas 1 usuário no array
        expect(usuarios).toHaveLength(1);
        // 2. O usuário restante deve ser o segundo que foi adicionado
        expect(usuarios[0].cpf).toBe("55566677788");
    });

    /*
    * Sugestão de testes adicionais:
    * 
    * 1. Testar exclusão quando há mais de 2 usuários
    * 2. Verificar se todos os campos do usuário excluído são retornados corretamente
    * 3. Testar com CPF em formatos diferentes (com pontos e traço)
    * 4. Verificar comportamento com array vazio
    */
});