///The Weather Man Forecast Website///
const APIKey ="4a416f29621f235e85749268a29c1806";

window.addEventListener('load', () => {}); 
    let long = 0; 
    let lat = 0; 

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>  {
long = position.coords.longitude; 
lat = position.coords.latitude; 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`
console.log(apiUrl); 

fetch(apiUrl).then((response) => {
    return response.json(); 
})
.then(function(data){
    console.log(data);
})
    });
}

// //These querySelectors will target the first id in the HTML//
// const weatherForm = document.querySelector('#weather-form');
// const cityButtons = document.querySelector('#city-buttons');
// const cityInput = document.querySelector('#example');
// const showResults = document.querySelector('#show-results');
// const searchTerm = document.querySelector('#show-search-term');

// let newCity  = document.querySelector("#cityresults");   
// let temp = document.querySelector("temp"); 
// let wind = document.querySelector("wind"); 
// let humidity = document.querySelector("humidity");         







// btn.addEventListener('click', function(){
//     fetch(getCityAPI)
//     .then(function (response){
//         console.log(getCityAPI)
//     })

// }) 




// let city; 
// let cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity.value + "&appid=" + APIKey;

// let getWeatherInfo = function (city) {
//     let getCityAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=orillia,6094325&limit=8&appid=' + APIKey; 

//   fetch(getCityAPI)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (weather) {
//           displayWeather(weather, city);
//           console.log(response)
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to The Weather Man.');
//     });
// };

// let displayWeather = function (repos, searchTerm) {
//   if (repos.length === 0) {
//     showResults.textContent = 'No repositories found.';
//     return;
//   }





// let formSubmission = function (event) {

// }
//     event.preventDefault(); //will cancel the event if it is cancellable//

//     var cityname = cityInput.value.trim(); //take the value from cityInput variable

