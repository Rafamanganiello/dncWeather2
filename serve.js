const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuração do proxy reverso para a API do Via CEP
app.use('/viacep', createProxyMiddleware({
    target: 'http://viacep.com.br/ws', // URL base da API do Via CEP
    changeOrigin: true, // Altera o cabeçalho 'Origin' para o host alvo
  pathRewrite: {
    '^/viacep': '', // Remove o prefixo '/viacep' da URL da requisição
},
}));

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});