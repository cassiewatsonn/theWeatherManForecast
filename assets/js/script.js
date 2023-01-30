// ///The Weather Man Forecast Website///

//Global variables
let citySearchForm = $('#city-search');
let cityInputHere = $('#city-input');

//troubleshooting link problem...<- issue is with the input section of it 
var linkForm = document.getElementsByClassName("form-input");

let city = document.querySelector('#city');
let date = document.querySelector('#date');
let temp = document.querySelector('#temp');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');

const APIKey ="4a416f29621f235e85749268a29c1806";
let currentDay = "";
let lat;
let lon;

// To save the user's inputed city name for the currentWeather fetch
$("#city-Search").on("submit", function (event) {
    event.preventDefault();

            // get name of city searched
            linkForm = $("#city-input").val(); 
            console.log(linkForm); 

    if (linkForm === "" || linkForm == null) {  //stop from putting nothing in field
        //send alert to enter a city to continue
        alert("Please enter a city name to recieve your weather");
        event.preventDefault();
    }
    else {
        currentWeather(linkForm);  
    }
});

function currentWeather() {

    var inputBox = document.getElementById("city-input");
    var city = inputBox.value; 

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=1&units=metric&appid=" + APIKey; 
    
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

            //Declaring the variables values from the above json response
            lat = response.coord.lat;
            lon = response.coord.lon;
            icon = response.weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            temp = response.main.temp;
            humidity = response.main.humidity;
            wind = response.wind.speed;
            //To confirm that the right information has been logged
            console.log("lat", lat);
            console.log("lon", lon);
            console.log("icon", iconURL);
            console.log("temp", temp);
            console.log("humidity", humidity);
            console.log("wind", wind);
            windKM = Math.floor((wind) * 3.6);

            //This is displaying the city date and time//
            document.getElementById("city").innerHTML = city;
            let today = dayjs();
            $('#date').text(today.format('MMM D, YYYY'));

            // This will display the weather ICON
            let iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + ".png")
            $("#city").append(iconImg);

            //This will display the temp, wind and humidity
            document.getElementById("temp").innerHTML = "Temp: " + temp + " °С";
            document.getElementById("wind").innerHTML = "Wind: " + windKM + " km/hr";
            document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";

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
            forecastFunction();
        });
    
}

function forecastFunction() {
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + APIKey;
    ///request data from openweather and returns data in json
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        /// go through list of responses in the array
        .then(function (response) {
            for (var i = 4; i < response.list.length; i += 8) {
                console.log('line 123')
                console.log(response.list[i].dt_txt);
            }
        });
}          
    
  


///Working on saving to local storage// 
$(".save").on("click", function(){
    // $(this) <== the button element clicked.
    // $(this).siblings('input')  <== the input element in html
    // $(this).parent() <== form element which is the parent element of input.
    let inputValue = $(this).siblings("input").val();
    let formId = $(this).parent().attr('section');
    ///add text value to the local storage///
    localStorage.setItem(formId, inputValue);
    localStorage.setItem("cities", inputValue); 

    // if there is a key in the localstorage called cities, 
    //then let the arrayofcities equal the array stored from local storage. 
    //if it doesnt exist, array of cities should be an empty array
    let arrayOfCities = []
    if (localStorage.getItem("cities")) {
       arrayOfCities = JSON.parse(localStorage.getItem("cities"))
       arrayOfCities.push(inputValue)
    } else {
       arrayOfCities = []
    }
    // arrayOfCities.push(inputValue)
    localStorage.setItem("cities", JSON.stringify(arrayOfCities))
  })















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



