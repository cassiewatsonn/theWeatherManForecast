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

let cityForecastEl = $('#city-forecast');
let displayForecastEl = $('#display-forecast');
let forecastCardEl = $("#forecast-card");

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
        $("#forecast-card").empty();
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
            console.log('line 122')
            for (var i = 0; i < response.list.length; i += 8) {
                console.log(response.list[i].dt_txt);

                photoIcon = response.list[i].weather[0].icon;
                    photoIconURL = "http://openweathermap.org/img/w/" + photoIcon + ".png";
                    console.log("icon", photoIconURL);

                    outsideTemp = response.list[i].main.temp;
                    console.log("temp", outsideTemp);

                    outHumidity = response.list[i].main.humidity;
                    console.log("humidity", outHumidity);

                    outWind = response.list[i].wind.speed;
                    console.log("wind", outWind);

                    outWindKM = Math.floor((outWind) * 3.6);
                    console.log("wind km", outWindKM);

                //To create elements for the 5day forecast cards
                let fiveDay = $("<div class='card text-white bg-primary'>")
                let fiveTemp = $("<p>");
                let fiveHum = $("<p>");
                let fiveForeWind = $("<p>");
                let fiveImg = $("<img>");
                let fiveDate = $("<h6>");

                //To output the variables obtained from the loop into each dynamically created card
                fiveTemp.text("Temp: " + outsideTemp + " °С")
                fiveHum.text("Humidity: " + outHumidity + "%")
                fiveForeWind.text("Wind Speed: " + outWindKM + " km/hr");
                fiveDate.text("Date: " + response.list[i].dt_txt)
                let today = dayjs();
                $('#date').text(today.format('MMM D, YYYY'));
                fiveImg.addClass("img-fluid");
                fiveImg.addClass("w-25");
                fiveImg.attr("src", "https://openweathermap.org/img/wn/" + photoIcon + "@2x.png")

                //Appending the above output to HTML under section id=display-forecast
                fiveDay.append(fiveDate);
                fiveDay.append(fiveImg);
                fiveDay.append(fiveTemp);
                fiveDay.append(fiveForeWind);
                fiveDay.append(fiveHum);
                forecastCardEl.append(fiveDay);

            }
        })
}


            
    
///Saving to local storage// 
$(".save").on("click", function(){
    //creating an array... to add inputValue in to save to local storage..
    let arrayOfCities = JSON.parse(localStorage.getItem("cities")) || []
    let inputValue = $(this).siblings("input").val();   // $(this) <== the button element clicked. // $(this).siblings('input')  <== the input element in html
    arrayOfCities.push(inputValue)
    localStorage.setItem("cities", JSON.stringify(arrayOfCities))
    });


///working on pulling cities from local storage
function loadPreviousCities(){ 
    let cityOneValue= localStorage.getItem("cities") /// retrieve array from the local storage
    console.log(cityOneValue);
    let localStorageArray = JSON.parse(localStorage.getItem("cities"))
    console.log("this localstorage", localStorageArray);

    for (let i = 0; i < localStorageArray.length; i++) { ///loop through our array of cities in here
        let button = document.createElement("button"); //create a button with javascript for the city
        //let recentCities = cities.slice(-5);   // get the 5 most recent cities   
        let cityListEl = document.getElementById('city-1'); //set the inside of the button to be equal to the city name from the list
        button.textContent = localStorageArray[i];

        //  buttons[i].addEventListener('click', function(){
        //     let data = buttons[i].dataset;
            
        //  } )     /// add the onclick to button
        //append the new button created with the city name inside of it to the div container on our html page where I want it to show up 
        cityListEl.appendChild(button);
        console.log(localStorageArray[i]);
    }
}
loadPreviousCities();













//     cities = JSON.parse(cityOneValue); /// parse the arrray from the string

//     $("#city-1 button").val(cityOneValue)
//     console.log(cityOneValue);

//     // cities = JSON.parse(cities); /// parse the arrray from the string

//         for(let i = 5; i < localStorageArray.length; i++) {  ///loop through our array of cities in here
//         let button=document.createElement("button");   //create a button with javascript for the city
//         let recentCities = cities.slice(-5);   // get the 5 most recent cities   
//             document.getElementById("city-1").innerHTML = recentCities;                 //set the inside of the button to be equal to the city name from the list
//                             //append the new button created with the city name inside of it to the div container on our html page where I want it to show up 

//         console.log(localStorageArray[i]); 
//     }
// }
// loadPreviousCities(); 



















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



