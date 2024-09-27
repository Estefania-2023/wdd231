const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");


gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}



const url = 'https://Estefania-2023.github.io/wdd231/chamber/data/members.json';
const cards = document.querySelector('.grid');

async function getCompaniesData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanies(data.companies);
}

const displayCompanies = (companies) => {
    companies.forEach(companie => {
        let card = document.createElement('section');
        let portrait = document.createElement('img');
        let name = document.createElement('p');
        let address = document.createElement('p');
        let telf = document.createElement('p');
        let website = document.createElement('p');
        
        name.innerHTML = `${companie.name}`;
        address.innerHTML = `${companie.address}`;
        telf.innerHTML = `${companie.phonenumber}`;
        website.innerHTML = `<a href="${companie.websiteurl}" target="_blank" title="${companie.name}">${companie.websiteurl}</a>`;

        portrait.setAttribute('src', companie.image);
        portrait.setAttribute('alt', companie.name);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        name.setAttribute('class', "hidep");

        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(telf);
        card.appendChild(website);
        
        cards.appendChild(card);
    });
}
getCompaniesData(url);