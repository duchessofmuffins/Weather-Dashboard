function main () {


    // Step One: check local storage for old searches
    
    var previousCitySearches = fetchFromLocalStorage();
    
    // A: there ARE previous searches

    // B: there are NOT previous searches

    if (!previousCitySearches) {
        previousCitySearches = ['Denver']
    };

    getCityData(previousCitySearches);
    
};


function setToLocalStorage (content) {

    localStorage.setItem('weatherDashboard',content); // accepts 2 argument: label and the content

};

function fetchFromLocalStorage () {

    var previousCitySearches = JSON.parse( localStorage.getItem('weatherDashboard') );

    return previousCitySearches;

};

function getCityData (cities) {

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cities[0]}&appid=55556b5c181f2a2deb6eb52781d5f5e5&units=imperial`,
        method: 'GET'
    }).then(function(res) {
        console.log('City Data response:', res)
        drawPage(res) 
    });

    // $.ajax({
    //     url: `http://api.openweathermap.org/data/2.5/forecast?q=${cities[0]}&appid=6ffc67dddc70d26fc73f570b3ef769b0&units=imperial`,
    //     method: 'GET'
    // }).then(function(res) {
    //     console.log('Forecast response:', res)
    //     drawPage(res) 
    // })

}

function drawPage(res) {

    let primaryWeatherBlock = '<div class="city row">'

    primaryWeatherBlock+= `<p>${res.name}(Today's Date)-weather icon-</p>` 
    primaryWeatherBlock+= `<p>Temperature: ${res.main.temp}</p>`
    primaryWeatherBlock+= `<p>Feels Like: ${res.main.feels_like}</p>`
    primaryWeatherBlock+= `<p>Humidity: ${res.main.humidity}</p>`
    primaryWeatherBlock+= `<p>Wind Speed: ${res.wind.speed}</p>`

    primaryWeatherBlock+= '</div>'

    const primaryWeatherTarget = $('#primary-weather-block')

    primaryWeatherTarget.html(primaryWeatherBlock);

    // let forecastWeatherBlock = '<div id="Day1">'

    // forecastWeatherBlock+= `<p>Date: ${res.list[0].dt_txt}</p>`
    // forecastWeatherBlock+= `<p>Temp: </p>`
    // forecastWeatherBlock+= `<p>Humidity: </p>`

}

$(document).ready(function() {
// when the document has loaded, perform the following function...

    // this is the first time anything actually happens on the page
    // up to this point, it has been 'reading' the 'instructions' on what to do
    // now it can do it based on the 'instructions' it was given
    main();

})