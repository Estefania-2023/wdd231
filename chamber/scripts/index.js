// to display current weather
const temp = document.querySelector('#current-temp');
const desc = document.querySelector('#description-temp');
const max = document.querySelector('#max-temp');
const min = document.querySelector('#min-temp');
const hum = document.querySelector('#humidity-temp');
const sunr = document.querySelector('#sunrise');
const suns = document.querySelector('#sunset');

const icon = document.querySelector('#weather-icon');
const caption = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-12.00&lon=-77.09&units=metric&appid=337ef9758d978035a649bd1d6694ac58';

async function apiFetch(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data); 
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  function displayResults(data) {
    let iconImage = document.createElement('img');

    temp.innerHTML = `<b>${Math.round(data.main.temp)}&deg;C</b>`;
    desc.innerHTML = data.weather[0].description;
    max.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;`;
    min.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;`;
    hum.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunr.innerHTML = `Sunrise: ${formatTimeFromUnix(data.sys.sunrise)}`;
    suns.innerHTML = `Sunset: ${formatTimeFromUnix(data.sys.sunset)}`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    iconImage.setAttribute('src', iconsrc);
    iconImage.setAttribute('alt', data.weather[0].main);
    iconImage.setAttribute('width', '100');
    iconImage.setAttribute('height', '100');
    icon.appendChild(iconImage);
    
  }
  apiFetch(url);
//convert the unixformat into time
  function formatTimeFromUnix(unixTime) {
    const date = new Date(unixTime * 1000);
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); 
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
}

// to display 3 days
const tod = document.querySelector('#todayc');
const tom = document.querySelector('#tomorrowc');
const atom = document.querySelector('#atomorrowc');

const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=-12.00&lon=-77.09&units=metric&appid=337ef9758d978035a649bd1d6694ac58';

//get days
let todaydate = new Date();
let tomorrow= new Date();
tomorrow.setDate(todaydate.getDate() + 1);
let aftertomorrow = new Date();
aftertomorrow.setDate(todaydate.getDate() + 2);

let format = { weekday: 'long' };
let daytomorrow = tomorrow.toLocaleDateString('en-US', format);
let dayaftertomorrow = aftertomorrow.toLocaleDateString('en-US', format);

async function apiFetch2(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults2(data); 
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults2(data) {
  tod.innerHTML = `Today: <b>${Math.round(data.list[0].main.temp)}&deg;C</b>`;
  tom.innerHTML = `${daytomorrow}: <b>${Math.round(data.list[1].main.temp)}&deg;C</b>`;
  atom.innerHTML = `${dayaftertomorrow}: <b>${Math.round(data.list[2].main.temp)}&deg;C</b>`;
}
apiFetch2(url2);

//display gold or silver members
const companiesd = document.querySelector('#companiesd');
// generate random number
const generateRandomNumber = () => Math.floor(Math.random() * 10);
let numbers = [];
let count = 0;
// get three members
let memberstodisplay = [];
const url3 = 'https://Estefania-2023.github.io/wdd231/chamber/data/members.json';

const getCompaniesData = async (url) => {
  try {
  const response = await fetch(url);
  const data = await response.json();
  

  while(count <= 2) {
    let randomIndex = generateRandomNumber();
    let memberNumber = data.companies[randomIndex];
    let memberNumbermembersip = memberNumber.membershiplevel;
      if ( (memberNumbermembersip == 2 || memberNumbermembersip == 3) && !numbers.includes(randomIndex) ){
        numbers.push(randomIndex);
        memberstodisplay.push(memberNumber);
        count ++;
      }
    }
    displayCompanies(memberstodisplay);
  } catch (error) {
    console.log(error);
  }
}
const displayCompanies = (companies) => {
  companies.forEach(companie => {
      let card = document.createElement('section');
      let name = document.createElement('h2');
      let companiesSection = document.createElement('div');
      let companiesInformation = document.createElement('div');
      let portrait = document.createElement('img');
      let telf = document.createElement('p');
      let address = document.createElement('p');
      let website = document.createElement('p');
      let level = document.createElement('p');
      
      name.innerHTML = `${companie.name}`;
      address.innerHTML = `<b>Addres: </b>${companie.address}`;
      telf.innerHTML = `<b>Phone</b>: ${companie.phonenumber}`;
      website.innerHTML = `<b>URL: </b><a href="${companie.websiteurl}" target="_blank" title="${companie.name}">${companie.websiteurl}</a>`;
      level.innerHTML = `<b>Membership level :</b> ${companie.membershiplevel}`

      companiesSection.setAttribute('id', 'companies-section')
      portrait.setAttribute('src', companie.image);
      portrait.setAttribute('alt', companie.name);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '90');
      portrait.setAttribute('height', '90');

      name.setAttribute('class', "hidep");
      card.appendChild(name);
      card.appendChild(companiesSection);
      companiesSection.appendChild(portrait);
      companiesSection.appendChild(companiesInformation);
      companiesInformation.appendChild(telf);
      companiesInformation.appendChild(address);
      companiesInformation.appendChild(website);
      companiesInformation.appendChild(level);
      companiesd.appendChild(card);
  });
}
getCompaniesData(url3);

