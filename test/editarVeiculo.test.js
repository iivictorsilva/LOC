
const { editarVeiculo, veiculos } = require('../app/appEditar.js');

describe('Testes unitários para editarVeiculo', () => {
    beforeEach(() => {
        // Limpa o array antes de cada teste
        veiculos.length = 0;
        
        // Adiciona um veículo de teste
        veiculos.push({
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2020,
            status: "DISPONIVEL",
            diaria: 150.00
        });
    });

    test('Deve editar a marca do veículo', () => {
        const resultado = editarVeiculo(veiculos, 0, { marca: "Honda" });
        
        expect(resultado.success).toBe(true);
        expect(veiculos[0].marca).toBe("Honda");
        expect(veiculos[0].modelo).toBe("Corolla"); // Não alterado
    });

    test('Deve editar múltiplos campos', () => {
        const resultado = editarVeiculo(veiculos, 0, {
            modelo: "Camry",
            ano: "2022",
            diaria: "180.50"
        });
        
        expect(resultado.success).toBe(true);
        expect(veiculos[0].modelo).toBe("Camry");
        expect(veiculos[0].ano).toBe(2022);
        expect(veiculos[0].diaria).toBe(180.50);
    });

    test('Deve converter ano e diária para números', () => {
        const resultado = editarVeiculo(veiculos, 0, {
            ano: "2022",
            diaria: "180.50"
        });
        
        expect(typeof veiculos[0].ano).toBe('number');
        expect(typeof veiculos[0].diaria).toBe('number');
    });

    test('Deve retornar erro para índice inválido', () => {
        const resultado = editarVeiculo(veiculos, 99, { marca: "Honda" });
        
        expect(resultado.success).toBe(false);
        expect(resultado.message).toBe("Veículo não encontrado.");
    });

    test('Deve manter valores originais quando campos não são fornecidos', () => {
        const veiculoOriginal = {...veiculos[0]};
        const resultado = editarVeiculo(veiculos, 0, {});
        
        expect(resultado.success).toBe(true);
        expect(veiculos[0]).toEqual(veiculoOriginal);
    });
});