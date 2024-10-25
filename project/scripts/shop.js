const imgBase = 'images/';
const galleryURL = 'data/fruits.json';

const photoHere = document.querySelector('#photo-here');
const dialog = document.querySelector('#clientelle-dialog');
const title = document.querySelector('#clientelle-dialog h3');
const closeBox = document.querySelector('#clientelle-dialog button');
const info = document.querySelector('#clientelle-dialog p');

closeBox.addEventListener('click', () => dialog.close());

async function getData() {
    const response = await fetch(galleryURL);
    const data = await response.json();
    displayItems(data.fruits)
}


function displayItems(data) {
    data.forEach(client => {
        const photo = document.createElement('img');
        photo.src = `${imgBase}${client.image}`;
        photo.alt = `Client who chose to get a ${client.service}`;
        photo.className = 'photo';
        photo.loading = 'lazy';
        photo.width = 180;
        photo.height = 180;
        photo.addEventListener('click', () => showDialog(client));
        photoHere.appendChild(photo);
    })
}

getData()

function showDialog(client) {
    title.innerHTML = client.service;
    info.innerHTML = `
    <br>This fruit cost ${client.cost} per kilogram
    <br>If you want to contact for more information, call (01) 7252245
    `;
    dialog.showModal();
}