const readline = require('readline');

// Configuração do readline para interação com o usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array para armazenar os veículos
let veiculos = [];

// Função para adicionar um veículo
function adicionarVeiculo() {
    rl.question("Digite a marca do veículo: ", (marca) => {
        rl.question("Digite o modelo do veículo: ", (modelo) => {
            rl.question("Digite o ano do veículo: ", (ano) => {
                rl.question("Digite o status do veículo (Disponível/Indisponível): ", (status) => {
                    rl.question("Digite o valor da diária do veículo: ", (diaria) => {
                        // Criando o objeto do veículo
                        const veiculo = {
                            marca: marca,
                            modelo: modelo,
                            ano: parseInt(ano),
                            status: status,
                            diaria: parseFloat(diaria)
                        };

                        // Adicionando o veículo ao array
                        veiculos.push(veiculo);
                        console.log("Veículo adicionado com sucesso!\n");
                        menu(); // Volta ao menu após adicionar
                    });
                });
            });
        });
    });
}

// Função para listar os veículos
function listarVeiculos() {
    if (veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado.\n");
    } else {
        console.log("Lista de Veículos:");
        veiculos.forEach((veiculo, index) => {
            console.log(`Veículo ${index + 1}:`);
            console.log(`  Marca: ${veiculo.marca}`);
            console.log(`  Modelo: ${veiculo.modelo}`);
            console.log(`  Ano: ${veiculo.ano}`);
            console.log(`  Status: ${veiculo.status}`);
            console.log(`  Diária: R$ ${veiculo.diaria.toFixed(2)}`);
            console.log('-------------------------');
        });
    }
    menu(); // Volta ao menu após listar
}




function editarVeiculo() {
    if (veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado para editar.\n");
        return menu();
    }

     // Mostra os veículos para escolher qual editar

    rl.question("Digite o número do veículo que deseja editar: ", (index) => {
        index = parseInt(index) - 1;

        if (index < 0 || index >= veiculos.length) {
            console.log("Veículo não encontrado.\n");
            return menu();
        }

        console.log("Deixe em branco para manter o valor atual.\n");

        rl.question(`Nova marca (${veiculos[index].marca}): `, (marca) => {
            rl.question(`Novo modelo (${veiculos[index].modelo}): `, (modelo) => {
                rl.question(`Novo ano (${veiculos[index].ano}): `, (ano) => {
                    rl.question(`Novo status (${veiculos[index].status}): `, (status) => {
                        rl.question(`Nova diária (R$ ${veiculos[index].diaria.toFixed(2)}): `, (diaria) => {
                            // Atualiza apenas os campos que o usuário preencheu
                            if (marca) veiculos[index].marca = marca;
                            if (modelo) veiculos[index].modelo = modelo;
                            if (ano) veiculos[index].ano = parseInt(ano);
                            if (status) veiculos[index].status = status;
                            if (diaria) veiculos[index].diaria = parseFloat(diaria);

                            console.log("Veículo atualizado com sucesso!\n");
                            menu();
                        });
                    });
                });
            });
        });
    });
}

function excluirVeiculo() {
    if (veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado para excluir.\n");
        return menu();
    }

    // Mostra os veículos para escolha

    rl.question("Digite o número do veículo que deseja excluir: ", (index) => {
        index = parseInt(index) - 1;

        if (index < 0 || index >= veiculos.length) {
            console.log("Veículo não encontrado.\n");
        } else {
            veiculos.splice(index, 1);
            console.log("Veículo excluído com sucesso!\n");
        }

        menu();
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
                    adicionarVeiculo();
                    break;
                case "2":
                    listarVeiculos();
                    break;
                case "3":
                    editarVeiculo();
                    break;
                case "4":
                    excluirVeiculo();
                    break;
                case "5":
                    console.log("Saindo do sistema...");
                    rl.close(); // Fecha o readline e encerra o programa
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.\n");
                    menu(); // Volta ao menu em caso de opção inválida
            }
        }
    );
}




