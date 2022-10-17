document.getElementById('get-inventory').addEventListener('click',getInventory);
document.getElementById('additem').addEventListener('click',addIventory);

getInventory();

function getInventory() {
    fetch("/api/parts")
    .then(res =>res.json()
    .then(data => {
        console.log(data);
        const l = document.getElementById('inventory');
        data.forEach(e =>{
            const item = document.createElement('li');
            item.appendChild(document.createTextNode(`${e.name} (${e.colour}) Qty: ${e.stock}`))
            l.appendChild(item);
        });
    })
    )
}

function addIventory() {
    const newpart = {
    name: document.getElementById('name').value,
    colour: document.getElementById('name').value,
    stock: document.getElementById('stock').value
    }
    console.log(newpart);

    fetch('/api/parts',{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newpart)
    })
    .then(res => {
        if(res.ok){
            res.json()
            .then(data => {
                console.log(data);
                getInventory();
                document.getElementById('status').innerText = `Created part ${data.id}: ${data.name}`;
            })
            .catch(err => console.log('Failed to get json object'))
        }
        else{
            console.log('Error: ',res.status);
            document.getElementById('status').innerText = 'Failed to add item';
        }
    })
    .catch()
}