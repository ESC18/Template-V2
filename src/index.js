//This is the main JS file - Not recommended to delete imports.
import './assets/images/SC.png';
import './assets/fonts.css';
import './css/styles.css';
//EX: import Blank from '/.js/secondary.js';

function getWeather(city, state) {
    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${process.env.API_KEY}`;

    request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
            printElements(response, city, state);
        }
    });

    request.open("GET", url, true);
    request.send();
}

// UI Logic

function printElements(apiResponse, city, state) {
    document.querySelector('#showResponse').innerText = `The humidity in ${city}, ${state} is ${apiResponse.main.humidity}%.
    The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
}

function handleFormSubmission(event) {
    event.preventDefault();
    const city = document.querySelector('#location').value;
    document.querySelector('#location').value = null;
    getWeather(city);
}

window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
});