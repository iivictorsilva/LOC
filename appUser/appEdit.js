// Array de usuários
const usuarios = [];

// Função para editar usuário
function editarUsuario(usuariosArray, cpf, novosDados) {
    const index = usuariosArray.findIndex(user => user.cpf === cpf);
    
    if (index === -1) {
        throw new Error('Usuário não encontrado');
    }

    // Valida se o novo CPF já existe (caso esteja sendo alterado)
    if (novosDados.cpf && novosDados.cpf !== cpf) {
        const cpfExistente = usuariosArray.some(user => user.cpf === novosDados.cpf);
        if (cpfExistente) {
            throw new Error('Novo CPF já está em uso');
        }
    }

    // Atualiza apenas os campos fornecidos
    usuariosArray[index] = {
        ...usuariosArray[index],
        ...novosDados
    };

    return usuariosArray[index];
}

// Exportações
module.exports = {
    usuarios,
    editarUsuario
};