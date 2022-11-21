
import 'regenerator-runtime/runtime';
import types from  '../common/types';


export const getCalculateConsumption = async (body) => {
  const verify = body.historicoDeConsumo.length
  if (verify !== 12) return false;

  const sum = body.historicoDeConsumo.reduce((accumulator, value) => accumulator + value);
  const divide = sum / 12

  if (body.tipoDeConexao === 'monofasico') {
    const compare = divide > 400;
    if (compare) return true;
  }

  if (body.tipoDeConexao === 'bifasico') {
    const compare = divide > 500;
    if (compare) return true;
  }

  if (body.tipoDeConexao === 'trifasico') {
    const compare = divide > 750;
    if (compare) return true;
  }

};

export const verifyConsumptionClass = async (classeDeConsumo) => {
  const arrayClassesDeConsumo = types.classesDeConsumo;
  const found = arrayClassesDeConsumo.find(element => element === classeDeConsumo);
  return found
};

export const verifyTariffModality = async (modalidadeTarifaria) => {
  const arrayModalidadeTarifaria = types.modalidadesTarifarias;
  const found = arrayModalidadeTarifaria.find(element => element === modalidadeTarifaria);
  return found

};

export const verifyDocument = async (numeroDoDocumento) => {
  const replaceDocument = numeroDoDocumento.replace(/[\(\)\.\s-]+/g, '');
  let documentType = null;
  if ( replaceDocument.length === 11) documentType = 'cpf';
  if ( replaceDocument.length === 14) documentType = 'cnpj';
  return documentType;

};
