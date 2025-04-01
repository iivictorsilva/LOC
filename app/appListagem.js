const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let veiculos = [];

// Função para adicionar veículo (pura)
function adicionarVeiculo(veiculosArray, novoVeiculo) {
    const veiculoFormatado = {
        marca: novoVeiculo.marca,
        modelo: novoVeiculo.modelo,
        ano: parseInt(novoVeiculo.ano),
        status: novoVeiculo.status,
        diaria: parseFloat(novoVeiculo.diaria)
    };
    veiculosArray.push(veiculoFormatado);
    return veiculosArray;
}

// Função para listar veículos (modificada para testes)
function listarVeiculos() {
    if (veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado.\n");
        return [];
    }

    const veiculosListados = [];
    console.log("Lista de Veículos:");
    veiculos.forEach((veiculo, index) => {
        const veiculoInfo = {
            id: index + 1,
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            ano: veiculo.ano,
            status: veiculo.status,
            diaria: veiculo.diaria
        };
        console.log(`Veículo ${veiculoInfo.id}:`);
        console.log(`  Marca: ${veiculoInfo.marca}`);
        console.log(`  Modelo: ${veiculoInfo.modelo}`);
        console.log(`  Ano: ${veiculoInfo.ano}`);
        console.log(`  Status: ${veiculoInfo.status}`);
        console.log(`  Diária: R$ ${veiculoInfo.diaria.toFixed(2)}`);
        console.log('-------------------------');
        veiculosListados.push(veiculoInfo);
    });

    return veiculosListados;
}

// Exporte todas as funções necessárias
module.exports = {
    adicionarVeiculo,
    listarVeiculos,
    veiculos
};