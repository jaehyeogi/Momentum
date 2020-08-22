const weather = document.querySelector(".js-weather");
const none = document.querySelector(".none")
const COORDS = "location";
const API_KEY= "558bd5b0a19af0c219f3abcfcc45a482";

function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then(function(response) {
        return response.json();
    })
       .then(function(json) {
         const temperature = json.main.temp;
         const place = json.name;
         const description = json.weather[0].description;
         const icon = json.weather[0].icon;
         const weatherImg = document.createElement("img");
         weatherImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
         none.appendChild(weatherImg);
         weather.innerText = `${Math.floor(temperature) + "℃"} ${place}, ${description}`
       });
}

function handleGeoSucces(position){ 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude
    };
      saveCoords(coordsObj);
      getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Can\'t access geo location.');
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
      } else {
        const parsedCoords = JSON.parse(loadedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
      }
    }


function init(){
    loadCoords();
}
init();
