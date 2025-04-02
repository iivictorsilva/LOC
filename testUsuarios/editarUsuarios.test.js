// Importa a função editarUsuario e o array usuarios do arquivo appEdit.js
const { editarUsuario, usuarios } = require('../appUser/appEdit.js');

// Describe cria um bloco de testes para a funcionalidade de edição de usuários
describe('Testes de edição de usuários', () => {
    // Define um usuário de teste padrão que será usado nos testes
    const usuarioTeste = {
        nome: "Maria Oliveira",
        cpf: "12345678901",  // CPF com 11 dígitos
        email: "maria@email.com",  // Email válido
        senha: "senha123"  // Senha com mais de 6 caracteres
    };

    // Executa antes de cada teste para garantir um estado consistente
    beforeEach(() => {
        // 1. Limpa o array de usuários
        usuarios.length = 0;
        // 2. Adiciona uma cópia do usuário de teste
        usuarios.push({ ...usuarioTeste });
    });

    // Teste: Edição apenas do nome do usuário
    test('Deve editar o nome do usuário mantendo outros campos', () => {
        // Define apenas o novo nome para edição
        const novosDados = { nome: "Maria Oliveira Santos" };
        
        // Executa a função de edição
        const resultado = editarUsuario(usuarios, "12345678901", novosDados);
        
        // Verificações:
        // 1. Nome foi alterado corretamente
        expect(resultado.nome).toBe("Maria Oliveira Santos");
        // 2. CPF permaneceu inalterado
        expect(resultado.cpf).toBe(usuarioTeste.cpf);
        // 3. Email permaneceu inalterado
        expect(resultado.email).toBe(usuarioTeste.email);
    });

    // Teste: Edição apenas do email do usuário
    test('Deve editar o email do usuário', () => {
        // Define apenas o novo email para edição
        const novosDados = { email: "maria.santos@email.com" };
        
        // Executa a função de edição
        const resultado = editarUsuario(usuarios, "12345678901", novosDados);
        
        // Verificações:
        // 1. Email foi alterado corretamente
        expect(resultado.email).toBe("maria.santos@email.com");
        // 2. Nome permaneceu inalterado
        expect(resultado.nome).toBe(usuarioTeste.nome);
    });

    // Teste: Edição apenas do CPF do usuário
    test('Deve editar o CPF do usuário', () => {
        // Define apenas o novo CPF para edição
        const novosDados = { cpf: "98765432109" };
        
        // Executa a função de edição
        const resultado = editarUsuario(usuarios, "12345678901", novosDados);
        
        // Verificações:
        // 1. CPF foi alterado corretamente no resultado
        expect(resultado.cpf).toBe("98765432109");
        // 2. CPF foi alterado corretamente no array de usuários
        expect(usuarios[0].cpf).toBe("98765432109");
    });

    // Teste: Edição apenas da senha do usuário
    test('Deve editar a senha do usuário', () => {
        // Define apenas a nova senha para edição
        const novosDados = { senha: "novasenha456" };
        
        // Executa a função de edição
        const resultado = editarUsuario(usuarios, "12345678901", novosDados);
        
        // Verificação:
        // 1. Senha foi alterada corretamente
        expect(resultado.senha).toBe("novasenha456");
    });

    // Sugestão: Você poderia adicionar mais testes aqui para:
    // - Tentar editar um usuário que não existe
    // - Tentar usar um CPF já cadastrado
    // - Editar múltiplos campos simultaneamente
    // - Verificar validação de campos obrigatórios
});