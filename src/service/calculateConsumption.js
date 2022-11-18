
  export const getCalculateConsumption = async (body) => {
    const verify = body.historicoDeConsumo.length
    if (verify !== 12)  return false;
    
    const sum = body.historicoDeConsumo.reduce((accumulator,value) => accumulator + value);
    const divide = sum/12

    if (body.tipoDeConexao === 'monofasico') {   
        const compare = divide > 400;
        return true;
    }

    if (body.tipoDeConexao === 'bifasico') {
        const compare = divide > 500;
        return true;
    }

    if (body.tipoDeConexao === 'trifasico') {
        const compare = divide > 750;
        return true;
    }
   
  };