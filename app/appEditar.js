// app.js
const readline = require('readline');

// Configuração do readline (será mockada nos testes)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let veiculos = [];

// Função pura para edição de veículo (para testes)
function editarVeiculo(veiculosArray, index, novosDados) {
    if (index < 0 || index >= veiculosArray.length) {
        return { success: false, message: "Veículo não encontrado." };
    }

    const veiculo = veiculosArray[index];
    
    // Atualiza apenas os campos fornecidos
    if (novosDados.marca) veiculo.marca = novosDados.marca;
    if (novosDados.modelo) veiculo.modelo = novosDados.modelo;
    if (novosDados.ano) veiculo.ano = parseInt(novosDados.ano);
    if (novosDados.status) veiculo.status = novosDados.status;
    if (novosDados.diaria) veiculo.diaria = parseFloat(novosDados.diaria);

    return { success: true, veiculo };
}

// Função interativa (usará a função pura internamente)
function editarVeiculoInterativo() {
    if (veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado para editar.\n");
        return;
    }

    // Mostra lista de veículos
    listarVeiculos();

    rl.question("Digite o número do veículo que deseja editar: ", (indexInput) => {
        const index = parseInt(indexInput) - 1;
        
        const resultado = editarVeiculo(veiculos, index, {
            marca: "Novo valor", // Isso seria substituído pelas respostas reais
            // ... outros campos
        });
        
        if (resultado.success) {
            console.log("Veículo atualizado com sucesso!\n");
        } else {
            console.log(resultado.message + "\n");
        }
    });
}

// Exportações
module.exports = {
    editarVeiculo, // Exporta a função pura para testes
    veiculos,
    // ... outras exportações
};