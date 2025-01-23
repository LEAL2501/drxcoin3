document.getElementById('fetchBlocks').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/blocks');
    const blocks = await response.json();

    const list = document.getElementById('blockchain');
    list.innerHTML = '';
    blocks.forEach(block => {
        const listItem = document.createElement('li');
        listItem.textContent = `Index: ${block.index}, Hash: ${block.hash}`;
        list.appendChild(listItem);
    });
});
