///The Weather Man Forecast Website///

//These querySelectors will target the first id in the HTML//
let weatherForm = document.querySelector('#weather-form');
let cityButtons = document.querySelector('#city-buttons');
let cityInput = document.querySelector('#example');
let showResults = document.querySelector('#show-results');
let searchTerm = document.querySelector('#show-search-term');

var APIKey ="4a416f29621f235e85749268a29c1806";

let city; 
var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(cityURl)




let formSubmission = function (event) {
    event.preventDefault(); //will cancel the event if it is cancellable//

    var cityname = cityInput.value.trim(); //take the value from cityInput variable