// ///The Weather Man Forecast Website///

//Global variables
let citySearchForm = $('#city-search');
let cityInputHere = $('#city-input');


//troubleshooting link problem...<- issue is with the input section of it 
var linkForm = document.getElementsByClassName("form-input");

const city = document.querySelector('#city');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

const APIKey ="4a416f29621f235e85749268a29c1806";
let currentDay = "";
let lat;
let lon;


// API call Open Weather
// let dayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + linkForm + "&APPID=" + APIKey; 


// To save the user's inputed city name for the currentWeather fetch
$("#city-search").on("submit", function (event) {  
    event.preventDefault();

    // citySearchForm.addEventListener('submit', function(event) { //// capture the data from the form
    //     event.preventDefault();	
    //     let linkForm = document.ElementById('city-input').value;
    //     currentWeather(linkForm);
    //     });

    if (linkForm === "" || linkForm == null) {  //stop from putting nothing in field
        //send alert to enter a city to continue
        alert("Please enter a city name to recieve your weather");
        event.preventDefault();
    }
    else {
        currentWeather(linkForm);  
    }
            // get name of city searched
            linkForm = $("#city-input").val(); 
            console.log(linkForm); 

});

currentWeather(linkForm); 


function currentWeather() {

    var inputBox = document.getElementsByClassName("input-form");
    var city = inputBox.value; 

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=1&units=metric&appid=" + APIKey; 
    /// used Element.form-input to grab class of input from html as I was having issues with using linkForm///
    
    // API call to get current weather conditions
    // let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + linkForm + "&appid=" + APIKey;
    
    // get name of city searched
    linkForm = $("form-input").val(); 
    console.log(linkForm); 

    
    fetch(queryURL)
        .then(function (response) {
            if (response.ok){
                return response.json();
    }})
        .then(function (response) {
            console.log(response)
            lat = response.coord.lat;
            lon = response.coord.lon;
            console.log("lat", lat)
            console.log("lon", lon)

            fiveDayForecast(); 
        })

};




function fiveDayForecast() {
    console.log(lat,lon);
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + APIKey;
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        });
}



























// // $("#city-search").on("search", function(event) {
// //     // Get the ID of the form from the HTML
// //     event.preventDefault();
// //     // Get the name of the city searched
// //     var cityName = $("#city-input").val();
// //     // Get the ID of the label from the HTML
// //     console.log(cityName);
// //     // Check to see if it is taking in data from the form
// //     if (cityName === "" || cityName == null) {
// //         // Prevent no data entry by the user
// //         alert("Please enter a city name");
// //         event.preventDefault();
// //     } else {
// //         // Function would need to go here to run the whole thing
// //     }
// // });


// // Get the current weather conditions from Open Weather Map
// const currentWeatherRequest = new Request('api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=' +APIKey);
// fetch(currentWeatherRequest)
//   .then(response => response.json())
//   .then(data => {
//     // Save the current weather information
//     const currentWeather = data;
//   });

// // Get the 5 day forecast information from Open Weather Map
// const fiveDayForecastRequest = new Request('api.openweathermap.org/data/2.5/forecast?q=CITY_NAME&appid=' + APIKey);
// fetch(fiveDayForecastRequest)
//   .then(response => response.json())
//   .then(data => {
//     // Save the 5 day forecast information
//     const fiveDayForecast = data;
//   });

// // Display the 5 day forecast
// for (let i = 0; i < fiveDayForecast.cnt; i++) {
//   console.log('Day ' + (i + 1) + ':');
//   console.log('Description: ' + fiveDayForecast.list[i].weather[0].description);
//   console.log('Temperature: ' + fiveDayForecast.list[i].main.temp);
// }






//   let fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + newCity.lat + "&lon=" + newCity.lon + "&appid=" + APIKey + "&units=metric";

//   console.log(fiveDayURL);
  
//   fetch(fiveDayURL) 
//     .then(function (response){
//       return response.json();
//     }) 
//     .then(function (fiveday){
//       console.log(fiveday);
//     });


//     if(response.ok){
//         response.json().then(function (displayWeather){
//             console.log(displayWeather); 
//         })
//     }
//     return response.json();
// })
   


// let fiveDayForecast = function (cityname){

// }

// let getWeatherInfo = function (city) {
//     let getCityAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=orillia,6094325&limit=8&appid=' + APIKey; 
// }


  
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

// let data = {
//     city: 'ExampleCity',
//     date: ' ',
//     temp: 0,
//     feelsLike: 0,
//     wind: 0,
//     humidity: 0,
//     picture: '',
//   }

// // Function to make API call
// function getWeather(dayForecast){
//     fetch(dayForecast, {
//         method: 'GET', 
//     })
//     .then(response => response.json())
//     .then(weather => {
//         //Update current/future weather conditions
//         data.picture = weather.weather[0].picture
//         data.temp = Math.floor(weather.main.temp);
//         data.feelsLike = Math.floor(weather.main.feels_like);
//         // convert wind speed from m/s to km/h
//         data.wind = Math.floor((weather.wind.speed) * 3.6);
//         data.humidity = weather.main.humidity;
//         data.date = new Date(weather.dt * 1000).toLocaleString()
//         // console.log(new Date(weather.dt * 1000).toLocaleString())
//         data.city = weather.name;
//         showCurrentWeather(data);
//       });
//     }
//     })
//     .catch(error => {
//         //Handle error
//         console.log(getWeather);
//     });
// }
// // Add city to search history in Local Storage
// let searchHistory = localStorage.getItem('searchHistory');
// if (searchHistory == null) {
//     let cities = [];
//     cities.push(city);
//     localStorage.setItem('searchHistory', JSON.stringify(cities));
// } else {
//     let cities = JSON.parse(searchHistory);
//     cities.push(city);
//     localStorage.setItem('searchHistory', JSON.stringify(cities));
// }


// let newCity  = document.querySelector("#city"); 
// let = 0;'4a416f29621f235e85749268a29c1806';

// newCity.addEventListener('load', () => {}); 
//     let long = 0; 
//     let lat = 0; 

//     if (navigator.geolocation){
//         navigator.geolocation.CurrentPosition((position) =>  {
// long = position.coords.longitude; 
// lat = position.coords.latitude; 
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`
// console.log(apiUrl); 

// fetch(apiUrl)
// .then(function (response) {
//     return response.json(); 
// })
// .then(function(current){
//     console.log(current);
// })
// });
// }

