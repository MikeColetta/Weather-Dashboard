# Weather Dashboard

## Project Description
I wanted to create a weather dashboard that would display both the current weather and the five day forecast for a searched city. The Open Weather API was used to pull and display the city weather information. The UV index also gives you a color coded warning based on the severity level of the index. The user's search history is then saved in local storage. 

## Process

I started by building the site HTML and CSS. Two divs were also built to eventually hold the current weather and the five day forecast. I used the grid system built into bootstrap to lineup the rows and columns of information. 

After that was finished, I set up the fetch for the current weather. I didn't style it, I just wanted to get the information on the page. 

I worked in a study group with my fellow classmates to set up local storage. The shortcut I learned at the top of the code to either set the cities to the array of saved or null was a new method I never would've thought of. Before that I would always make an if/else statement. 

After I got that to work I added the five day forecast. Initially I used JQuery to add the data into an HTML element. My tutor then introduced me to template literals. That was not only easier, but also saved me a lot of lines of code. My tutor also helped me set up the loop to put the forecast cards into the div.

The last JavaScript features I added were to fix a scoping problem for the UV index. I initially had my UV index in a separate function because I didn't know I could include multiple fetches in one function. I then added the .includes method onto the array of city history in the saveCitySearch function so I wouldn't display repeat cities. The final JavaScript feature I added was to use an if, else if, else statment to add the bootstrap button color to the UV index based on the severity level. 


## Project Link
[Deployed Link](https://mikecoletta.github.io/Weather-Dashboard/)

## Screenshots

![Screenshot 1](Images/Screenshot1.JPG)

![Screenshot 2](Images/Screenshot2.JPG)


## Credits
Creating a search input with button (https://stackoverflow.com/questions/45696685/search-input-with-an-icon-bootstrap-4)

Add uppercase to one letter in JQuery (https://www.sitepoint.com/jquery-convert-text-uppercaselowercase/)

UV index scale (https://www.epa.gov/sunsafety/uv-index-scale-0)