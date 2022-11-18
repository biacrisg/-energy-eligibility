  const cpf = {
    type: 'string',
    pattern: '^\\d{11}$',
    example: '21554495008',
  }
  
  const cnpj = {
    type: 'string',
    pattern: '^\\d{14}$',
    example: '33400689000109',
  }
  
  const classesDeConsumo = [
    'residencial',
    'industrial',
    'comercial'
  ]
  
  const modalidadesTarifarias = ['branca', 'convencional']
  
  module.exports = {
    cpf,
    cnpj,
    classesDeConsumo,
    modalidadesTarifarias,
  }