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
        drawMainPage(res) 
    });

    // added function??
    // $.ajax({
    //     url: `hereiswheretheURLwillgoforthecall`
    //     method: 'GET'
    // }).then(function(res) {
    //     console.log('Five Day Forecast response:', res)
    //     drawForecast(res)
    // });
}

// separate function??
// function getFiveDayData (fiveDays) {

//     $.ajax({
//         url: `hereiswheretheURLwillgoforthecall`
//         method: 'GET'
//     }).then(function(res) {
//         console.log('Five Day Forecast response:', res)
//         drawForecast(res)
//     });
// }

function drawMainPage(res) {

    let primaryWeatherBlock = '<div class="city row">'

    primaryWeatherBlock+= `<p>${res.name}(Today's Date)-weather icon-</p>` 
    primaryWeatherBlock+= `<p>Temperature: ${res.main.temp}</p>`
    primaryWeatherBlock+= `<p>Feels Like: ${res.main.feels_like}</p>`
    primaryWeatherBlock+= `<p>Humidity: ${res.main.humidity}</p>`
    primaryWeatherBlock+= `<p>Wind Speed: ${res.wind.speed}</p>`

    primaryWeatherBlock+= '</div>'

    const primaryWeatherTarget = $('#primary-weather-block')

    primaryWeatherTarget.html(primaryWeatherBlock);

}

// separate draw page??
// function drawForecast(res) {

//     let forecastWeatherBlock = '<div class="forecast row">'

//     forecastWeatherBlock+= `name`
//     forecastWeatherBlock+= `temp`
//     forecastWeatherBlock+= `humidity`
//     forecastWeatherBlock+= `precipitation`
// }

$(document).ready(function() {
// when the document has loaded, perform the following function...

    // this is the first time anything actually happens on the page
    // up to this point, it has been 'reading' the 'instructions' on what to do
    // now it can do it based on the 'instructions' it was given
    main();

})