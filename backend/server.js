const express = require('express');
const cors = require('cors');
const Blockchain = require('./blockchain'); // Supondo que você tenha uma implementação de blockchain
const app = express();
const port = process.env.PORT || 3000;

// Instancia o Blockchain
const drxCoin = new Blockchain();

// Permitir requisições de qualquer origem (CORS)
app.use(cors());

// Middleware para ler o corpo das requisições como JSON
app.use(express.json());

// Obter todos os blocos
app.get('/blocks', (req, res) => {
    res.json(drxCoin.chain);
});

// Criar uma nova transação
app.post('/transaction', (req, res) => {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) {
        return res.status(400).json({ message: 'Dados inválidos para transação' });
    }

    drxCoin.createTransaction({ from, to, amount });
    res.json({ message: 'Transação adicionada à lista pendente' });
});

// Minerar novos blocos
app.post('/mine', (req, res) => {
    const { minerAddress } = req.body;
    if (!minerAddress) {
        return res.status(400).json({ message: 'Endereço do minerador é necessário' });
    }

    drxCoin.minePendingTransactions(minerAddress);
    res.json({ message: 'Novo bloco minerado!', blockchain: drxCoin.chain });
});

// Consultar saldo de um endereço
app.get('/balance/:address', (req, res) => {
    const balance = drxCoin.getBalanceOfAddress(req.params.address);
    res.json({ balance });
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
