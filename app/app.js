const readline = require('readline');

// Configuração do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array de veículos (agora declarado no escopo do módulo)
const veiculos = [];

// Função pura para adicionar veículo
function adicionarVeiculo(veiculosArray, novoVeiculo) {
    const veiculoFormatado = {
        ...novoVeiculo,
        ano: parseInt(novoVeiculo.ano),
        diaria: parseFloat(novoVeiculo.diaria)
    };
    veiculosArray.push(veiculoFormatado);
    return veiculosArray;
}

// Função de interação com o usuário
function adicionarVeiculoInterativo() {
    rl.question("Digite a marca do veículo: ", (marca) => {
        rl.question("Digite o modelo do veículo: ", (modelo) => {
            rl.question("Digite o ano do veículo: ", (ano) => {
                rl.question("Digite o status do veículo (Disponível/Indisponível): ", (status) => {
                    rl.question("Digite o valor da diária do veículo: ", (diaria) => {
                        adicionarVeiculo(veiculos, { marca, modelo, ano, status, diaria });
                        console.log("Veículo adicionado com sucesso!\n");
                        menu();
                    });
                });
            });
        });
    });
}

// Menu interativo
function menu() {
    rl.question(
        "Escolha uma opção:\n" +
        "1. Adicionar veículo\n" +
        "2. Listar veículos\n" +
        "3. Editar veículo\n" +
        "4. Excluir veículo\n" +
        "5. Sair\n" +
        "Digite o número da opção: ",
        (opcao) => {
            switch (opcao) {
                case "1":
                    adicionarVeiculoInterativo();
                    break;
                // ... outros casos
                default:
                    console.log("Opção inválida");
                    menu();
            }
        }
    );
}

// Exportações
module.exports = {
    adicionarVeiculo,
    veiculos,
    // Exporte outras funções que precisar testar
};