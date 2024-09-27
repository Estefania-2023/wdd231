const year = document.querySelector("#year");
let last = document.querySelector("#last");


const today = new Date();

year.innerHTML = `© <span class="highlight">${today.getFullYear()} Pedro Rafael Zelada Soruco   Tarija-Bolivia  </span>`;

let oLastModif = new Date(document.lastModified);

let day = oLastModif.getDate();
let month = oLastModif.getMonth() + 1; 
let yearf = oLastModif.getFullYear();
let hours = oLastModif.getHours();
let minutes = oLastModif.getMinutes();
let seconds = oLastModif.getSeconds();


day = day < 10 ? '0' + day : day;
month = month < 10 ? '0' + month : month;
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
seconds = seconds < 10 ? '0' + seconds : seconds;

let formattedDate = `${month}/${day}/${yearf} ${hours}:${minutes}:${seconds}`;

last.innerHTML = `Last Modification ${formattedDate}`;

// For button
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animate');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});