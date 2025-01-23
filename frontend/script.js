// Criar Transação
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;

    // Enviar a transação para o backend
    const response = await fetch('https://drxcoin3.onrender.com/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, amount }),
    });

    const data = await response.json();
    alert(data.message);
});

// Minerar Bloco
document.getElementById('mineForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const minerAddress = document.getElementById('minerAddress').value;

    // Enviar a requisição para minerar o bloco
    const response = await fetch('https://drxcoin3.onrender.com/mine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minerAddress }),
    });

    const data = await response.json();
    alert(data.message);
});

// Consultar Saldo
document.getElementById('balanceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = document.getElementById('address').value;

    // Consultar o saldo do endereço
    const response = await fetch(`https://drxcoin3.onrender.com/balance/${address}`);
    const data = await response.json();
    alert(`Saldo: ${data.balance}`);
});

// Carregar Blocos
document.getElementById('fetchBlocks').addEventListener('click', async () => {
    // Carregar todos os blocos
    const response = await fetch('https://drxcoin3.onrender.com/blocks');
    const blocks = await response.json();

    const list = document.getElementById('blockchain');
    list.innerHTML = '';  // Limpa a lista de blocos antes de adicionar novos

    // Exibir os blocos na página
    blocks.forEach(block => {
        const listItem = document.createElement('li');
        listItem.textContent = `Index: ${block.index}, Hash: ${block.hash}`;
        list.appendChild(listItem);
    });
});
