const weather = document.querySelector(".js-weather");
const COORDS = "location";
const API_KEY= "558bd5b0a19af0c219f3abcfcc45a482";

function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then(function(response) {  // then >> data가 완전히 들어온 다음에 함수를 호출! 여기서 response는 변수이름
        return response.json();
    })
       .then(function(json) {
         const temperature = json.main.temp;
         const place = json.name;
         weather.innerText = `${Math.floor(temperature) + "℃"} ${"in"} ${place}`
  });
}

function handleGeoSucces(position){ //getCurrentPosition의 첫번쨰 requirement. 좌표가져오는데 성공했을 때 함수
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude, // latitude:latitude
      longitude //longitude:longitude
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
