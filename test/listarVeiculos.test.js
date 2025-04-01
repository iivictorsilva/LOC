const { adicionarVeiculo, listarVeiculos, veiculos } = require('../app/appListagem');

describe('Testes para listagem de veículos', () => {
    beforeEach(() => {
        // Limpa o array antes de cada teste
        veiculos.length = 0;
        // Mock do console.log
        console.log = jest.fn();
    });

    test('Deve retornar array vazio quando não há veículos', () => {
        const resultado = listarVeiculos();
        expect(resultado).toEqual([]);
        expect(console.log).toHaveBeenCalledWith("Nenhum veículo cadastrado.\n");
    });

    test('Deve listar um veículo corretamente', () => {
        adicionarVeiculo(veiculos, {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2022",
            status: "DISPONIVEL",
            diaria: "200.00"
        });

        const resultado = listarVeiculos();
        
        expect(resultado).toHaveLength(1);
        expect(resultado[0]).toEqual({
            id: 1,
            marca: "Toyota",
            modelo: "Corolla",
            ano: 2022,
            status: "DISPONIVEL",
            diaria: 200.00
        });
    });

    test('Deve listar múltiplos veículos na ordem correta', () => {
        adicionarVeiculo(veiculos, {
            marca: "Toyota",
            modelo: "Corolla",
            ano: "2022",
            status: "DISPONIVEL",
            diaria: "200.00"
        });
        
        adicionarVeiculo(veiculos, {
            marca: "Honda",
            modelo: "Civic",
            ano: "2021",
            status: "INDISPONIVEL",
            diaria: "180.00"
        });

        const resultado = listarVeiculos();
        
        expect(resultado).toHaveLength(2);
        expect(resultado[0].id).toBe(1);
        expect(resultado[1].id).toBe(2);
        expect(resultado[0].marca).toBe("Toyota");
        expect(resultado[1].marca).toBe("Honda");
    });
});