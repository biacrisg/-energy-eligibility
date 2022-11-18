import { response } from 'express';
import types from  '../../common/types';
import { getCalculateConsumption } from '../../service/calculateConsumption';

const verifyConsumptionClass = async (classeDeConsumo) => {
   const arrayClassesDeConsumo =  types.classesDeConsumo;
   const found = arrayClassesDeConsumo.find(element => element === classeDeConsumo);
   return found
};

const verifyTariffModality = async (modalidadeTarifaria) => {
  const arrayModalidadeTarifaria =  types.modalidadesTarifarias;
  const found = arrayModalidadeTarifaria.find(element => element === modalidadeTarifaria);
  return found
 
};


module.exports = {
  async verifyEligibility(req, res) {

        const replaceDocument = req.body.numeroDoDocumento.replace(/[\(\)\.\s-]+/g, '');
        let documentType = null;
        if ( replaceDocument.length === 11) documentType = 'cpf';
        if ( replaceDocument.length === 14) documentType = 'cnpj';

        if (!documentType ) return res.status(400).json({ elegivel: 'false', razoesInelegibilidade: 'Confira o numero do documento' });

        const acceptedConsumptionClass = await verifyConsumptionClass(req.body.classeDeConsumo);
        const acceptedTariffModality = await verifyTariffModality(req.body.modalidadeTarifaria);

        if (!acceptedTariffModality && !acceptedConsumptionClass) return res.status(400).json({ elegivel: 'false', razoesInelegibilidade: ["Classe de consumo não aceita", "Modalidade tarifária não aceita"]});
        if (!acceptedConsumptionClass) return res.status(401).json({ elegivel: 'false', razoesInelegibilidade: 'Classe de consumo não aceita' });
        if (!acceptedTariffModality) return res.status(400).json({ elegivel: 'false', razoesInelegibilidade: 'Modalidade tarifária não aceita' });
        


       const consumption = getCalculateConsumption(req.body);
       let consumptionResult = await consumption;
       
        if (consumptionResult === true) {
            const A = 1000;
            const B = 84;
            const C = req.body.historicoDeConsumo.reduce((accumulator,value) => accumulator + value,0);

            const result  = (( B * C ) / A );

            response.elegivel = true;
            response.economiaAnualDeCO2 = result;

            return res.status(200).json(response);
        }  else {
            response.elegivel = false;
            response.razoesInelegibilidade = 'Mínimo de consumo não atingido';
          return res.status(200).json(response);
        }

  },

};
