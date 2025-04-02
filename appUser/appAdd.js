// Array de usuários 
const usuarios = [];

// Função pura para adicionar usuário
function adicionarUsuario(usuariosArray, novoUsuario) {
    // Verifica se todos os campos obrigatórios estão presentes
    if (!novoUsuario.nome || !novoUsuario.cpf || !novoUsuario.email || !novoUsuario.senha) {
        throw new Error('Todos os campos são obrigatórios');
    }



    // Adiciona o novo usuário
    usuariosArray.push({
        nome: novoUsuario.nome,
        cpf: novoUsuario.cpf,
        email: novoUsuario.email,
        senha: novoUsuario.senha
    });

    return usuariosArray;
}

// Função de interação com o usuário (opcional)
function adicionarUsuarioInterativo() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Nome completo: ', (nome) => {
        rl.question('CPF (apenas números): ', (cpf) => {
            rl.question('Email: ', (email) => {
                rl.question('Senha: ', (senha) => {
                    try {
                        const resultado = adicionarUsuario(usuarios, { nome, cpf, email, senha });
                        console.log('✅ Usuário cadastrado com sucesso!');
                        console.log(resultado);
                    } catch (error) {
                        console.error('❌ Erro:', error.message);
                    } finally {
                        rl.close();
                    }
                });
            });
        });
    });
}

// Exportações
module.exports = {
    usuarios,
    adicionarUsuario,
    adicionarUsuarioInterativo
};