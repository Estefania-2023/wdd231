const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const mykey = "82b9407b7b6d113e077d354c4b29fe74"
const myLat = "-21.40227954422257"
const myLong = "-64.73662852842976"

const url = `https://api.openweathermap.org/data/2.5/weather?lat=-12.00&lon=-77.09&units=metric&appid=337ef9758d978035a649bd1d6694ac58`;

async function apiFetch(){
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            console.log(data); //Testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute("src",iconsrc);
    weatherIcon.setAttribute("alt","weather icon");
    captionDesc.textContent =`${desc}`;
}

apiFetch();


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

//directory



// Store the resource of the JSON URL file into a variable.
const requestURL = 'data/activities.json';


const spotlight1 = document.querySelector('#spotlight-1');
const spotlight2 = document.querySelector('#spotlight-2');
const spotlight3 = document.querySelector('#spotlight-3');

/* Create empty lists for businesses to be sorted through, and create empty variables to hold spotlight business data. */
let npList = [];
let bronzeList = [];
let silverGoldList = [];
let spotlightList = [];
var choice1 = {name: '', address: '', phonenumber: '', websiteurl: '', logo:'..images/placeholder-300x200.webp', mem_lvl: 'NP', information: ''};
var choice2 = {name: '', address: '', phonenumber: '', websiteurl: '', logo:'..images/placeholder-300x200.webp', mem_lvl: 'NP', information: ''};
var choice3 = {name: '', address: '', phonenumber: '', websiteurl: '', logo:'..images/placeholder-300x200.webp', mem_lvl: 'NP', information: ''};

fetch(requestURL)
  .then(function (response) { // returns a Promise which will be used as an argument.
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const varObj = jsonObject['activities']; // Store the results into an array since that data source is an array.
    varObj.forEach(sortMembers); // Call the forEach() method which will loop through each record to be processed.
    selectThreeSpotlights(silverGoldList); 
    displaySpotlights(choice1, choice2, choice3);
  });

function sortMembers(business) {
    // Sort each business into the corresponding list of memberships.
    let membership = business.mem_lvl;
    switch (membership) {
        case ('NP'):
            break;
        case ('Bronze'):
            bronzeList.push(business);
            break;
        case ('Silver'):
            silverGoldList.push(business);
            break;
        case ('Gold'):
            silverGoldList.push(business);
            break;
    }
}

function selectThreeSpotlights(list) {
    // Select 3 random businesses to feature from the Gold Members list.
    let currIndex;
    let prevIndex;
    let initIndex;

    for (i = 0; i < 3; i++) {
      // Get 1st business.
      currIndex = randIndex(list.length);
      spotlightList.push(list[currIndex]);
      initIndex = currIndex;
      // Get 2nd business.
      currIndex = randIndex(list.length);
      if (currIndex != initIndex) {
        spotlightList.push(list[currIndex]);
        prevIndex = currIndex;
      } else {
        currIndex = randIndex(list.length);
        spotlightList.push(list[currIndex]);
        prevIndex = currIndex;
      }
      // Get 3rd business.
      currIndex = randIndex(list.length);
      if (currIndex != initIndex && currIndex != prevIndex) {
        spotlightList.push(list[currIndex]);
      } else {
        currIndex = randIndex(list.length);
        spotlightList.push(list[currIndex]);
      }
    }
    // Set the first 3 business in the spotlight List to display in the Spotlight section.
    if (spotlightList.length > 0) {
        choice1 = spotlightList[0];
        choice2 = spotlightList[1];
        choice3 = spotlightList[2];
    }
}

function randIndex(listLength) {
    return Math.floor(Math.random() * listLength);
}

function displaySpotlights(choice1, choice2, choice3) {
    // Create elements for first spotlight.
    let image1 = document.createElement('img');
    let title1 = document.createElement('h4');
    let par1 = document.createElement('p');
    // Create elements for second spotlight.
    let image2 = document.createElement('img');
    let title2 = document.createElement('h4');
    let par2 = document.createElement('p');
    // Create elements for third spotlight.
    let image3 = document.createElement('img');
    let title3 = document.createElement('h4');
    let par3 = document.createElement('p');

    // Change the textContent property of the h2 element to contain the prophet's full name
    title1.textContent = choice1.name;
    par1.textContent = choice1.information;

    title2.textContent = choice2.name;
    par2.textContent = choice2.information;

    title3.textContent = choice3.name;
    par3.textContent = choice3.information;

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values.
    image1.setAttribute('src', choice1.image);
    image1.setAttribute('alt', 'image of ' + choice1.name);
    image1.setAttribute('width', '200');
    image1.setAttribute('height', '100');

    image2.setAttribute('src', choice2.image);
    image2.setAttribute('alt', 'image of ' + choice2.name);
    image2.setAttribute('width', '200');
    image2.setAttribute('height', '100');

    image3.setAttribute('src', choice3.image);
    image3.setAttribute('alt', 'image of ' + choice3.name);
    image3.setAttribute('width', '200');
    image3.setAttribute('height', '100');

    // Add/append the section with the created child elements.
    spotlight1.appendChild(title1);
    spotlight1.appendChild(image1);
    spotlight1.appendChild(par1);

    spotlight2.appendChild(title2);
    spotlight2.appendChild(image2);
    spotlight2.appendChild(par2);

    spotlight3.appendChild(title3);
    spotlight3.appendChild(image3);
    spotlight3.appendChild(par3);
}

// create a list of all the images.
const images = document.querySelectorAll('img[data-src]');

/* get data-src from the image, add the src attribute */
const loadImage = (img) => {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {
        img.removeAttribute('data-src');
        img.classList.add('fade-in');
    };
};

const imgOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px 0px 100px 0px'
};

if ('IntersectionObserver' in window) {
    // create the observer for each item in the list (callback, options)
    const imgObserver = new IntersectionObserver((entries, observer)=> {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return; // return if Intersection Observer is not supported.
        } else {
            const img = entry.target; 
            loadImage(img);
            // Stop observing the image as the image as already been loaded.
            observer.unobserve(img);
        }
    });
    }, imgOptions);

// loop through each image in the list.
images.forEach(img => {
    imgObserver.observe(img);
});
}