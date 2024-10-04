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



const requestURL3 = 'https://Estefania-2023.github.io/wdd231/chamber/data/members.json';

fetch(requestURL3)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const businesses = jsonObject['companies'];
    chooseHighlights(businesses);
  });


  function chooseHighlights(businesses){

    const filteredMembership = businesses.filter(function (business) {
        return business.membershiplevel == 3 ||
              business.membershiplevel == 2;
    });

    const shuffledMembership = filteredMembership.sort(() => 0.5 - Math.random());

    displayHighlight(shuffledMembership[0], "#spotlight1");
    displayHighlight(shuffledMembership[1], "#spotlight2");
    displayHighlight(shuffledMembership[2], "#spotlight3");
  }

  function displayHighlight(business, elementID) {

    let pName = document.createElement('h3');
    let logoImg = document.createElement('img');
    let pSlogan = document.createElement('p');
    let hr = document.createElement('hr');
    let pSpotinfo = document.createElement('p');
    let a = document.createElement('a');

    pName.innerHTML = `${business.name}`;
    pName.setAttribute('class', 'large');

    logoImg.setAttribute('src', business.image);
    logoImg.setAttribute('class', 'spotlightImg');  
    logoImg.setAttribute('alt', `Logo image for ${business.name}`);
    logoImg.setAttribute('loading', 'lazy');
  


    pSlogan.textContent = `"${business.information}"`;
    pSlogan.setAttribute('class', 'small bold italic');   
 

    hr.style.margin = "2px";
    pSpotinfo.innerHTML += "Number: " + business.phonenumber + "  |   ";
    pSpotinfo.innerHTML += " Membership level: " + business.membershiplevel + "|    Website:";
    pSpotinfo.classList.add('spotinfo');

    a.textContent = "website";
    a.setAttribute('href', business.websiteurl);
  
    pSpotinfo.appendChild(a);

    const spotlightContainer = document.querySelector(elementID)

    spotlightContainer.removeChild(spotlightContainer.firstElementChild);
  
    spotlightContainer.appendChild(logoImg);
    spotlightContainer.appendChild(pName);
    spotlightContainer.appendChild(pSlogan);
    spotlightContainer.appendChild(hr);
    spotlightContainer.appendChild(pSpotinfo);



  }
 
