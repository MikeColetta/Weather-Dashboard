$(document).ready(function () {
    var currentDate = moment().format("M/D/YYYY")
    var currentWeather = $("#currentWeather");

    //Grabs local storage.
    var savedCityHistory = JSON.parse(localStorage.getItem("savedCityHistory")) || []

    //Loops and displays previous searched cities in local storage.
    for (i = 0; i < savedCityHistory.length; i++) {
        displayCitySearch(savedCityHistory[i])
    }

    //Initiates search
    $("#searchButton").on("click", function () {
        var citySearch = $("#citySearch").val();
        printCurrentWeather(citySearch)
        clearPage()
        displayCitySearch(citySearch)
    });

    //Grabs current weather based on city search.
    function printCurrentWeather(citySearch){
        var requestCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&apikey=09a0aab280840ec6d582b6d7445e4771";
        saveCitySearch();
        fetch(requestCurrentUrl)
            .then(function (response) {
                return response.json();
            })

            //Grabs the current weather information.
            .then(function (data) {
                var currentWeatherCard = $(`
        <div class="card px-3 currentCard" id="currentCard">
                    <h1>${citySearch} - ${currentDate} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h1>
                    <p>Temperature: ${data.main.temp} ºF</p>
                    <p>Humidity: ${data.main.humidity}</p>
                    <p>Wind: ${data.wind.speed} MPH</p>
                    </div>
                    <h1>5-Day Forecast</h1>`)
                currentWeather.append(currentWeatherCard);

                //Grabs the UV index data.
                var lat = data.coord.lat
                var lon = data.coord.lon
                var requestUVURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&apikey=09a0aab280840ec6d582b6d7445e4771";
                fetch(requestUVURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        currentUV = data.current.uvi
                        var uVIndexElement = $(`
                    <p>UV Index: <button class="btn" id="uVStatusColor">${currentUV}</button></p>
                `)
                        $("#currentCard").append(uVIndexElement);
                        checkUVStatus(currentUV)
                        printFiveDay(citySearch)
                    })
            })
        }

    //Pull weather data from history
    $("#searchHistory").on("click", "li", function (event) {
        clearPage()
        var citySearch = event.target.innerHTML;
        printCurrentWeather(citySearch);
    })

    //Prints the five day forecast onto small cards in the div.
    function printFiveDay(citySearch) {
        var requestForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&apikey=09a0aab280840ec6d582b6d7445e4771";
        fetch(requestForecastUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var numberOfDays = 5
                var index = 0
                for (var i = 0; i < numberOfDays; i++) {
                    var forecastCard = $(`
                    <div class="card forecastCard">
                        <p>${moment(data.list[index].dt_txt).format("M/D/YYYY")}</p>
                        <img src="http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png" class="iconImage">
                        <p>Temp: ${data.list[index].main.temp} ºF</p>
                        <p>Humidity: ${data.list[index].main.humidity}%</p>
                    </div>`)
                    $("#fiveDayForecast").append(forecastCard)
                    index += 8
                }
            })
    }

    //Get local storage function
    function saveCitySearch(citySearch) {
        var citySearch = $("#citySearch").val();
        if (savedCityHistory.includes(citySearch)) return
        savedCityHistory.push(citySearch);
        localStorage.setItem("savedCityHistory", JSON.stringify(savedCityHistory));
    }

    //Displays the city into the history
    function displayCitySearch(citySearch) {
        var searchedCity = $("<li class='cityHistory'></li>");
        $(searchedCity).addClass("list-group-item");
        $(searchedCity).text(citySearch);
        $("#searchHistory").prepend(searchedCity);
    }

    //Clears the divs when you search again.
    function clearPage() {
        $("#currentWeather").html("")
        $("#fiveDayForecast").html("")
        return
    }

    //Checks the UV status and gives a color indicator.
    function checkUVStatus(currentUV) {
        if (currentUV <= 2) {
            $("#uVStatusColor").addClass("btn-success")
        }
        else if (currentUV > 2 && currentUV < 8) {
            $("#uVStatusColor").addClass("btn-warning")
        }
        else {
            $("#uVStatusColor").addClass("btn-danger")
        }    
    }
})