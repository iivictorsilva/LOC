// Array de usuários (declarado no escopo do módulo)
const usuarios = [];

// Função pura para adicionar usuário
function adicionarUsuario(usuariosArray, novoUsuario) {
    // Verifica se todos os campos obrigatórios estão presentes
    if (!novoUsuario.nome || !novoUsuario.cpf || !novoUsuario.email || !novoUsuario.senha) {
        throw new Error('Todos os campos são obrigatórios');
    }

    // Verifica se o CPF já existe
    const cpfExistente = usuariosArray.some(user => user.cpf === novoUsuario.cpf);
    if (cpfExistente) {
        throw new Error('CPF já cadastrado');
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

// Função para listar usuários
function listarUsuarios(usuariosArray) {
    // Retorna uma cópia do array para evitar manipulação acidental
    return [...usuariosArray];
}

// Exportações
module.exports = {
    usuarios,
    adicionarUsuario,
    listarUsuarios
};