const { adicionarVeiculo, veiculos } = require('../app/app.js');

describe('Testes do sistema de veículos', () => {
    beforeEach(() => {
        // Limpa o array de veículos antes de cada teste
        veiculos.length = 0;
    });

    test('Deve adicionar um veículo à lista', () => {
        const novoVeiculo = {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2025",
            status: "DISPONIVEL",
            diaria: "150.00"
        };

        const resultado = adicionarVeiculo(veiculos, novoVeiculo);
        
        expect(resultado).toHaveLength(1);
        expect(resultado[0]).toEqual({
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2025,
            status: "DISPONIVEL",
            diaria: 150.00
        });
    });

    test('O array veiculos deve estar vazio inicialmente', () => {
        expect(veiculos).toHaveLength(0);
    });
});