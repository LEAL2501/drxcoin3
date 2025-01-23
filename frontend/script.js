// URL do backend hospedado no Render (substitua com a URL real)
const backendUrl = "https://drxcoin3.onrender.com"; // Substitua pela URL real

// Criar Transação
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;

    const response = await fetch(`${backendUrl}/transacao`, {
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

    const response = await fetch(`${backendUrl}/mine`, {
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

    const response = await fetch(`${backendUrl}/balance/${address}`);
    const data = await response.json();
    alert(`Saldo: ${data.balance}`);
});

// Carregar Blocos
document.getElementById('fetchBlocks').addEventListener('click', async () => {
    const response = await fetch(`${backendUrl}/blocks`);
    const blocks = await response.json();

    const list = document.getElementById('blockchain');
    list.innerHTML = '';
    blocks.forEach(block => {
        const listItem = document.createElement('li');
        listItem.textContent = `Index: ${block.index}, Hash: ${block.hash}`;
        list.appendChild(listItem);
    });
});
