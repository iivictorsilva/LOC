const { adicionarVeiculo, excluirVeiculo, veiculos } = require('../app/excluirVeiculo.js');

describe('Testes unitários para excluirVeiculo', () => {
    beforeEach(() => {
        // Limpa o array antes de cada teste
        veiculos.length = 0;
    });

    test('Deve retornar erro quando o índice é inválido', () => {
        adicionarVeiculo(veiculos, {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2020",
            status: "DISPONIVEL",
            diaria: "150.00"
        });

        const resultado = excluirVeiculo(veiculos, 99);
        
        expect(resultado.success).toBe(false);
        expect(resultado.message).toBe("Veículo não encontrado.");
        expect(veiculos.length).toBe(1);
    });

    test('Deve excluir um veículo existente', () => {
        adicionarVeiculo(veiculos, {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2020",
            status: "DISPONIVEL",
            diaria: "150.00"
        });

        const resultado = excluirVeiculo(veiculos, 0);
        
        expect(resultado.success).toBe(true);
        expect(resultado.veiculo.marca).toBe("Toyota");
        expect(veiculos.length).toBe(0);
    });

    test('Deve manter outros veículos ao excluir um', () => {
        adicionarVeiculo(veiculos, {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2020",
            status: "DISPONIVEL",
            diaria: "150.00"
        });
        adicionarVeiculo(veiculos, {
            marca: "Honda",
            modelo: "Civic",
            ano: "2021",
            status: "INDISPONIVEL",
            diaria: "180.00"
        });

        const resultado = excluirVeiculo(veiculos, 0);
        
        expect(resultado.success).toBe(true);
        expect(veiculos.length).toBe(1);
        expect(veiculos[0].marca).toBe("Honda");
    });

    test('Deve retornar o veículo correto ao excluir', () => {
        adicionarVeiculo(veiculos, {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2020",
            status: "DISPONIVEL",
            diaria: "150.00"
        });
        adicionarVeiculo(veiculos, {
            marca: "Honda",
            modelo: "Civic",
            ano: "2021",
            status: "INDISPONIVEL",
            diaria: "180.00"
        });

        const resultado = excluirVeiculo(veiculos, 1);
        
        expect(resultado.veiculo.marca).toBe("Honda");
        expect(veiculos[0].marca).toBe("Toyota");
    });
});