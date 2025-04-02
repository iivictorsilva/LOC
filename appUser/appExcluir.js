// Array de usuários (declarado no escopo do módulo)
const usuarios = [];

// Função para excluir usuário
function excluirUsuario(usuariosArray, cpf) {
    const index = usuariosArray.findIndex(user => user.cpf === cpf);
    
    if (index === -1) {
        throw new Error('Usuário não encontrado');
    }

    // Remove o usuário do array
    const [usuarioRemovido] = usuariosArray.splice(index, 1);
    return usuarioRemovido;
}

// Exportações
module.exports = {
    usuarios,
    excluirUsuario
};