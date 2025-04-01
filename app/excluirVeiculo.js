const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let veiculos = [];

// Função para adicionar veículo (já existente)
function adicionarVeiculo(veiculosArray, novoVeiculo) {
    const veiculo = {
        marca: novoVeiculo.marca,
        modelo: novoVeiculo.modelo,
        ano: parseInt(novoVeiculo.ano),
        status: novoVeiculo.status,
        diaria: parseFloat(novoVeiculo.diaria)
    };
    veiculosArray.push(veiculo);
    return veiculosArray;
}

// Função pura para excluir veículo (nova)
function excluirVeiculo(veiculosArray, index) {
    if (index < 0 || index >= veiculosArray.length) {
        return { success: false, message: "Veículo não encontrado." };
    }
    const veiculoRemovido = veiculosArray.splice(index, 1);
    return { success: true, veiculo: veiculoRemovido[0] };
}

// Função interativa que usa a função pura
function excluirVeiculoInterativo() {
    if (veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado para excluir.\n");
        return;
    }

    listarVeiculos();

    rl.question("Digite o número do veículo que deseja excluir: ", (input) => {
        const index = parseInt(input) - 1;
        const resultado = excluirVeiculo(veiculos, index);
        
        if (resultado.success) {
            console.log("Veículo excluído com sucesso!\n");
        } else {
            console.log(resultado.message + "\n");
        }
        menu();
    });
}

// Exporte todas as funções necessárias
module.exports = {
    adicionarVeiculo,
    excluirVeiculo, // Função pura para testes
    excluirVeiculoInterativo, // Função interativa
    veiculos
};