
import { async } from 'regenerator-runtime';
import { verifyConsumptionClass } from './service/calculateConsumption';
import { verifyTariffModality } from './service/calculateConsumption';
import { verifyDocument } from './service/calculateConsumption';
import { getCalculateConsumption } from './service/calculateConsumption';

describe('eligibilidade', () => {
  it('verify success', async () => {
    const x = await verifyConsumptionClass('comercial')
    expect(x).toBe('comercial');
  });

  it('when passing a wrong consumption class', async () => {
    const x = await verifyConsumptionClass('error')
    expect(x).toBe(undefined);
  });
});

describe('modalidade tarifa', () => {
  it('verify success', async () => {
    const x = await verifyTariffModality('branca')
    expect(x).toBe('branca');
  });

  it('when passing a wrong consumption class', async () => {
    const x = await verifyTariffModality('error')
    expect(x).toBe(undefined);
  });
});

describe('documento valido', () => {
  it('verify success document cpf', async () => {
    const x = await verifyDocument('144.588.846-70')
    expect(x).toBe('cpf');
  });

  it('verify success document cnpj', async () => {
    const x = await verifyDocument('14458884670123')
    expect(x).toBe('cnpj');
  });

  it('error document type', async () => {
    const x = await verifyDocument('12345')
    expect(x).toBe(null);
  });
});

describe('calcular economia', () => {
  it('error -12 months', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "14041737706111.",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        3878, 
        9760, 
        5976, 
        2797, 
        2481, 
        5731, 
        7538, 
        4392,
        7859, 
      ]
    })
    expect(x).toBe(false);
  });


  it('monofasico success', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "140417377061111.",
      "tipoDeConexao": "monofasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        3878, 
        9760, 
        5976, 
        2797, 
        2481, 
        5731, 
        7538, 
        4392,
        7859, 
        1111,
        2222,
        3333
      ]
    })
    expect(x).toBe(true);
  });

  it('monofasico error', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "140417377061111.",
      "tipoDeConexao": "monofasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        300, 
        400,
        400, 
        400,
        400,
        400,
        400,
        400,
        400,
        400,
        400,
        400
      ]
    })
    expect(x).toBe(undefined);
  });

  it('bifasico success', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "140417377061111.",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        3878, 
        9760, 
        5976, 
        2797, 
        2481, 
        5731, 
        7538, 
        4392,
        7859, 
        1111,
        2222,
        3333
      ]
    })
    expect(x).toBe(true);
  });

  it('bifasico error', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "140417377061111.",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        300, 
        400,
        400, 
        400,
        400,
        400,
        400,
        400,
        400,
        400,
        400,
        400
      ]
    })
    expect(x).toBe(undefined);
  });

  it('trifasico success', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "140417377061111.",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        3878, 
        9760, 
        5976, 
        2797, 
        2481, 
        5731, 
        7538, 
        4392,
        7859, 
        1111,
        2222,
        3333
      ]
    })
    expect(x).toBe(true);
  });

  it('trifasico error', async () => {
    const x = await getCalculateConsumption({
      "numeroDoDocumento": "140417377061111.",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        300, 
        400,
        400, 
        400,
        400,
        400,
        400,
        400,
        400,
        400,
        400,
        400
      ]
    })
    expect(x).toBe(undefined);
  });

  //   const x = await verifyDocument({
//   "numeroDoDocumento": "14041737706111.",
//   "tipoDeConexao": "bifasico",
//   "classeDeConsumo": "rural",
//   "modalidadeTarifaria": "verde",
//   "historicoDeConsumo": [
//     3878, 
//     9760, 
//     5976, 
//     2797, 
//     2481, 
//     5731, 
//     7538, 
//     4392,
//     7859, 
//     4160
//   ]
// })
  //   expect(x).toBe(null);
  // });
});





