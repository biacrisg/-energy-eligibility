# backend-js-login

## Projeto BackEnd 
 Aplicação criada com NodeJs
 A aplicação vai verificar se o cliente é elegivel para fazer parte de uma empresa. Para isso espera receber em seu body a seguinte entrada: 
 
 - Numero do documento: CPF ou CNPJ;
 - Tipo de conexão: monofasico, bifasico ou trifasico;
 - Classe de Consumo: residencial, industrial, comercial, rural, poderPublico;
 - Modalidade Tarifaria: azul, branca, verde, convencional;
 - Historico de consumo: consumo de energia mensal;
 
 {
  "numeroDoDocumento": string,
  "tipoDeConexao": string,
  "classeDeConsumo": string,
  "modalidadeTarifaria": string,
  "historicoDeConsumo": [
    int, 
    int, 
    int, 
    int, 
    int, 
    int, 
    int, 
    int, 
    int,
    int
  ]
}
    
# Instalando as dependências do projeto.
  $ npm install
  $ npm install nodemon@1.10.2 --dev
    
# Inicie a API
  $ npm run dev
  
  
# Testes 

$ npm test
