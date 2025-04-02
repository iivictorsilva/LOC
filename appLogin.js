const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Dados iniciais
const admin = { username: 'victor', password: '123456' };
let usuarios = [];
let veiculos = [];
let locacoes = [];

// Funções auxiliares atualizadas
function parseDate(dataStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
}

function calcularDias(dataInicio, dataFim) {
    const inicio = parseDate(dataInicio);
    const fim = parseDate(dataFim);
    const diff = fim - inicio;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24))); // Mínimo 1 dia
}

function formatarData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/');
    return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
}

function validarData(dataStr) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataStr)) return false;
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    if (dia < 1 || dia > 31) return false;
    if (mes < 1 || mes > 12) return false;
    
    // Verifica se a data é válida
    const data = new Date(ano, mes - 1, dia);
    return data.getDate() === dia && 
           data.getMonth() === mes - 1 && 
           data.getFullYear() === ano;
}

function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Funções de veículos atualizadas
function listarVeiculos(mostrarMenu = true, somenteDisponiveis = false) {
    console.log('\n=== VEÍCULOS ' + (somenteDisponiveis ? 'DISPONÍVEIS' : 'CADASTRADOS') + ' ===');
    
    const veiculosFiltrados = somenteDisponiveis 
        ? veiculos.filter(v => v.status === 'Disponível')
        : veiculos;

    if (veiculosFiltrados.length === 0) {
        console.log('Nenhum veículo encontrado.');
    } else {
        veiculosFiltrados.forEach((veiculo, index) => {
            console.log(`\nCódigo: ${index}`);
            console.log(`Marca: ${veiculo.marca}`);
            console.log(`Modelo: ${veiculo.modelo}`);
            console.log(`Ano: ${veiculo.ano}`);
            console.log(`Placa: ${veiculo.placa}`);
            console.log(`Status: ${veiculo.status}`);
            console.log(`Diária: R$ ${veiculo.diaria.toFixed(2)}`);
        });
    }
    if (mostrarMenu) menuUsuario();
}

function adicionarVeiculo() {
    console.log('\n=== ADICIONAR VEÍCULO ===');
    rl.question('Marca: ', marca => {
        rl.question('Modelo: ', modelo => {
            rl.question('Ano: ', ano => {
                rl.question('Placa: ', placa => {
                    rl.question('Diária (R$): ', diaria => {
                        const veiculo = {
                            marca,
                            modelo,
                            ano: parseInt(ano),
                            placa,
                            diaria: parseFloat(diaria),
                            status: 'Disponível'
                        };
                        veiculos.push(veiculo);
                        console.log('\n✅ Veículo adicionado com sucesso!');
                        menuAdmin();
                    });
                });
            });
        });
    });
}

function editarVeiculo() {
    listarVeiculos(false);
    rl.question('\nDigite o código do veículo para editar: ', codigo => {
        const index = parseInt(codigo);
        if (isNaN(index) || index < 0 || index >= veiculos.length) {
            console.log('❌ Código inválido!');
            return menuAdmin();
        }

        const veiculo = veiculos[index];
        rl.question(`Nova marca (${veiculo.marca}): `, marca => {
            rl.question(`Novo modelo (${veiculo.modelo}): `, modelo => {
                rl.question(`Novo ano (${veiculo.ano}): `, ano => {
                    rl.question(`Nova placa (${veiculo.placa}): `, placa => {
                        rl.question(`Nova diária (R$ ${veiculo.diaria.toFixed(2)}): `, diaria => {
                            veiculos[index] = {
                                marca: marca || veiculo.marca,
                                modelo: modelo || veiculo.modelo,
                                ano: ano ? parseInt(ano) : veiculo.ano,
                                placa: placa || veiculo.placa,
                                diaria: diaria ? parseFloat(diaria) : veiculo.diaria,
                                status: veiculo.status
                            };
                            console.log('\n✅ Veículo atualizado com sucesso!');
                            menuAdmin();
                        });
                    });
                });
            });
        });
    });
}

function removerVeiculo() {
    listarVeiculos(false);
    rl.question('\nDigite o código do veículo para remover: ', codigo => {
        const index = parseInt(codigo);
        if (isNaN(index) || index < 0 || index >= veiculos.length) {
            console.log('❌ Código inválido!');
            return menuAdmin();
        }

        veiculos.splice(index, 1);
        console.log('\n✅ Veículo removido com sucesso!');
        menuAdmin();
    });
}

// Funções de locação atualizadas
function alugarVeiculo() {
    listarVeiculos(false, true);
    
    rl.question('\nDigite o código do veículo para alugar: ', codigo => {
        const index = parseInt(codigo);
        if (isNaN(index) || index < 0 || index >= veiculos.length) {
            console.log('❌ Código inválido!');
            return menuUsuario();
        }

        if (veiculos[index].status !== 'Disponível') {
            console.log('❌ Veículo não disponível para locação!');
            return menuUsuario();
        }

        rl.question('Data de retirada (DD/MM/AAAA): ', dataRetirada => {
            if (!validarData(dataRetirada)) {
                console.log('❌ Formato de data inválido! Use DD/MM/AAAA');
                return alugarVeiculo();
            }

            rl.question('Data de devolução (DD/MM/AAAA): ', dataDevolucao => {
                if (!validarData(dataDevolucao)) {
                    console.log('❌ Formato de data inválido! Use DD/MM/AAAA');
                    return alugarVeiculo();
                }

                const dias = calcularDias(dataRetirada, dataDevolucao);
                const total = dias * veiculos[index].diaria;

                console.log('\n=== RESUMO DA LOCAÇÃO ===');
                console.log(`Veículo: ${veiculos[index].marca} ${veiculos[index].modelo}`);
                console.log(`Período: ${formatarData(dataRetirada)} a ${formatarData(dataDevolucao)}`);
                console.log(`Dias de locação: ${dias}`);
                console.log(`Valor total: R$ ${total.toFixed(2)}`);

                rl.question('\nConfirmar locação? (S/N): ', confirmacao => {
                    if (confirmacao.toLowerCase() === 's') {
                        veiculos[index].status = 'Alugado';
                        locacoes.push({
                            veiculoIndex: index,
                            dataRetirada,
                            dataDevolucao,
                            total
                        });
                        console.log('\n✅ Locação realizada com sucesso!');
                    } else {
                        console.log('Locação cancelada.');
                    }
                    menuUsuario();
                });
            });
        });
    });
}

// Funções de usuários atualizadas
function listarUsuarios() {
    console.log('\n=== USUÁRIOS CADASTRADOS ===');
    if (usuarios.length === 0) {
        console.log('Nenhum usuário cadastrado.');
    } else {
        usuarios.forEach((usuario, index) => {
            console.log(`\nID: ${index}`);
            console.log(`Nome: ${usuario.nome}`);
            console.log(`CPF: ${usuario.cpf}`);
            console.log(`Email: ${usuario.email}`);
        });
    }
    menuAdmin();
}

function adicionarUsuario() {
    console.log('\n=== ADICIONAR USUÁRIO ===');
    rl.question('Nome completo: ', nome => {
        rl.question('CPF (apenas números): ', cpf => {
            if (!validarCPF(cpf)) {
                console.log('❌ CPF inválido! Deve conter 11 dígitos.');
                return adicionarUsuario();
            }
            
            rl.question('Email: ', email => {
                if (!validarEmail(email)) {
                    console.log('❌ Email inválido!');
                    return adicionarUsuario();
                }
                
                rl.question('Senha (mínimo 6 caracteres): ', senha => {
                    if (senha.length < 6) {
                        console.log('❌ Senha deve ter no mínimo 6 caracteres!');
                        return adicionarUsuario();
                    }
                    
                    usuarios.push({ nome, cpf, email, senha });
                    console.log('\n✅ Usuário cadastrado com sucesso!');
                    menuAdmin();
                });
            });
        });
    });
}

function removerUsuario() {
    listarUsuarios();
    rl.question('\nDigite o ID do usuário para remover: ', id => {
        const index = parseInt(id);
        if (isNaN(index) || index < 0 || index >= usuarios.length) {
            console.log('❌ ID inválido!');
            return menuAdmin();
        }

        usuarios.splice(index, 1);
        console.log('\n✅ Usuário removido com sucesso!');
        menuAdmin();
    });
}

// Menus atualizados
function menuAdmin() {
    console.log('\n=== PAINEL ADMINISTRATIVO ===');
    rl.question(
        '1. Gerenciar Veículos\n' +
        '2. Gerenciar Usuários\n' +
        '3. Visualizar Locações\n' +
        '4. Sair\n' +
        'Escolha uma opção: ',
        opcao => {
            switch (opcao) {
                case '1':
                    menuVeiculos();
                    break;
                case '2':
                    menuUsuarios();
                    break;
                case '3':
                    listarLocacoes();
                    break;
                case '4':
                    console.log('Saindo do painel administrativo...');
                    mainMenu();
                    break;
                default:
                    console.log('❌ Opção inválida!');
                    menuAdmin();
            }
        }
    );
}

function menuVeiculos() {
    console.log('\n=== GERENCIAR VEÍCULOS ===');
    rl.question(
        '1. Listar Veículos\n' +
        '2. Adicionar Veículo\n' +
        '3. Editar Veículo\n' +
        '4. Remover Veículo\n' +
        '5. Voltar\n' +
        'Escolha uma opção: ',
        opcao => {
            switch (opcao) {
                case '1':
                    listarVeiculos(false);
                    menuVeiculos();
                    break;
                case '2':
                    adicionarVeiculo();
                    break;
                case '3':
                    editarVeiculo();
                    break;
                case '4':
                    removerVeiculo();
                    break;
                case '5':
                    menuAdmin();
                    break;
                default:
                    console.log('❌ Opção inválida!');
                    menuVeiculos();
            }
        }
    );
}

function menuUsuarios() {
    console.log('\n=== GERENCIAR USUÁRIOS ===');
    rl.question(
        '1. Listar Usuários\n' +
        '2. Adicionar Usuário\n' +
        '3. Remover Usuário\n' +
        '4. Voltar\n' +
        'Escolha uma opção: ',
        opcao => {
            switch (opcao) {
                case '1':
                    listarUsuarios();
                    break;
                case '2':
                    adicionarUsuario();
                    break;
                case '3':
                    removerUsuario();
                    break;
                case '4':
                    menuAdmin();
                    break;
                default:
                    console.log('❌ Opção inválida!');
                    menuUsuarios();
            }
        }
    );
}

function menuUsuario() {
    console.log('\n=== MENU DO USUÁRIO ===');
    rl.question(
        '1. Listar Veículos\n' +
        '2. Alugar Veículo\n' +
        '3. Sair\n' +
        'Escolha uma opção: ',
        opcao => {
            switch (opcao) {
                case '1':
                    listarVeiculos();
                    break;
                case '2':
                    alugarVeiculo();
                    break;
                case '3':
                    console.log('Saindo da conta de usuário...');
                    mainMenu();
                    break;
                default:
                    console.log('❌ Opção inválida!');
                    menuUsuario();
            }
        }
    );
}

function listarLocacoes() {
    console.log('\n=== HISTÓRICO DE LOCAÇÕES ===');
    if (locacoes.length === 0) {
        console.log('Nenhuma locação registrada.');
    } else {
        locacoes.forEach((locacao, index) => {
            const veiculo = veiculos[locacao.veiculoIndex];
            console.log(`\nLocação ${index + 1}:`);
            console.log(`Veículo: ${veiculo.marca} ${veiculo.modelo}`);
            console.log(`Período: ${formatarData(locacao.dataRetirada)} a ${formatarData(locacao.dataDevolucao)}`);
            console.log(`Valor total: R$ ${locacao.total.toFixed(2)}`);
        });
    }
    menuAdmin();
}

function mainMenu() {
    console.log('\n=== SISTEMA DE LOCAÇÃO DE VEÍCULOS ===');
    rl.question(
        '1. Login\n' +
        '2. Cadastrar\n' +
        '3. Sair\n' +
        'Escolha uma opção: ',
        opcao => {
            switch (opcao) {
                case '1':
                    login();
                    break;
                case '2':
                    cadastrar();
                    break;
                case '3':
                    console.log('Saindo do sistema...');
                    rl.close();
                    break;
                default:
                    console.log('❌ Opção inválida!');
                    mainMenu();
            }
        }
    );
}

function login() {
    console.log('\n=== LOGIN ===');
    rl.question('Usuário (email/admin): ', username => {
        rl.question('Senha: ', password => {
            if (username === admin.username && password === admin.password) {
                console.log('\n✅ Login administrativo realizado com sucesso!');
                menuAdmin();
            } else {
                const usuario = usuarios.find(u => u.email === username && u.senha === password);
                if (usuario) {
                    console.log(`\n✅ Bem-vindo, ${usuario.nome}!`);
                    menuUsuario();
                } else {
                    console.log('\n❌ Usuário ou senha incorretos!');
                    mainMenu();
                }
            }
        });
    });
}

function cadastrar() {
    console.log('\n=== CADASTRO DE USUÁRIO ===');
    rl.question('Nome completo: ', nome => {
        rl.question('CPF (apenas números): ', cpf => {
            if (!validarCPF(cpf)) {
                console.log('❌ CPF inválido! Deve conter 11 dígitos.');
                return cadastrar();
            }
            
            rl.question('Email: ', email => {
                if (!validarEmail(email)) {
                    console.log('❌ Email inválido!');
                    return cadastrar();
                }
                
                if (usuarios.some(u => u.email === email)) {
                    console.log('❌ Email já cadastrado!');
                    return cadastrar();
                }
                
                rl.question('Senha (mínimo 6 caracteres): ', senha => {
                    if (senha.length < 6) {
                        console.log('❌ Senha deve ter no mínimo 6 caracteres!');
                        return cadastrar();
                    }
                    
                    usuarios.push({ nome, cpf, email, senha });
                    console.log('\n✅ Cadastro realizado com sucesso!');
                    mainMenu();
                });
            });
        });
    });
}

// Iniciar sistema
console.clear();
mainMenu();