import { response } from 'express';
import { getCalculateConsumption } from '../../service/calculateConsumption';
import { verifyDocument } from '../../service/calculateConsumption';
import { verifyConsumptionClass } from '../../service/calculateConsumption';
import { verifyTariffModality } from '../../service/calculateConsumption';
import 'regenerator-runtime/runtime';

module.exports = {

  async verifyEligibility(req, res) {

        const verifyDocumentType = await verifyDocument(req.body.numeroDoDocumento);
        if (!verifyDocumentType ) return res.status(400).json({ elegivel: 'false', razoesInelegibilidade: 'Confira o numero do documento' });

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

  }
};
