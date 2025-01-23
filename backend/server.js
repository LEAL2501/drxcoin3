const express = require('express');
const Blockchain = require('./blockchain');

const app = express();
const port = process.env.PORT || 3000;

const drxCoin = new Blockchain();

app.use(express.json());

// Obter todos os blocos
app.get('/blocks', (req, res) => {
    res.json(drxCoin.chain);
});

// Criar uma nova transação
app.post('/transaction', (req, res) => {
    const { from, to, amount } = req.body;
    drxCoin.createTransaction({ from, to, amount });
    res.json({ message: 'Transação adicionada à lista pendente.' });
});

// Minerar novos blocos
app.post('/mine', (req, res) => {
    const { minerAddress } = req.body;
    drxCoin.minePendingTransactions(minerAddress);
    res.json({ message: 'Novo bloco minerado!', blockchain: drxCoin.chain });
});

// Consultar saldo de um endereço
app.get('/balance/:address', (req, res) => {
    const balance = drxCoin.getBalanceOfAddress(req.params.address);
    res.json({ balance });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
