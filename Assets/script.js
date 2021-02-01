var cityHistory = []



$("#searchButton").on("click", function() {
    var citySearch = $("#citySearch").val()
    console.log(citySearch)
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=metric&apikey=09a0aab280840ec6d582b6d7445e4771";
    console.log(requestUrl)

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      })
    });




//Write HTML - Use JavaScript to write the HTML in an empty div by creating the element and adding bootstrap classes to it. 

//Basic CSS

//JavaScript - GET API KEY!!!
/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
    1. Search Form - event listener on the submit button
    2. Add that city to local storage.
THEN I am presented with current and future conditions for that city and that city is added to the search history
    1. Fetch to get weather data from that city using OpenWeather API.
    2. put the data from that fetch into my HTML using $(html element).text("TEXT") pulls with JSON.
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    1.  Pull different pieces of information from the API. Check for free API.
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    1. Color code the button to be different colors based on the UV Index (Probably a danger button for severe, then different colors.)
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    1. 5 bootstrap cards that are made and display API information
    2. Check to see if weather is partly cloudy, sunny, etc. add FA icon to element.
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
    1. When we pull localStorage we are going to create buttons or links that then search that city. Since it's just one city I'll use an array.
    Our links will run the same function that our initial search runs just with a different city name.*/