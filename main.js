const api = {
  key: "8735b01840608035506e93d1c68962b7",
  base: "https://api.openweathermap.org/data/2.5/"
}
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const search = document.querySelector('.search');
search.addEventListener('keypress', set);

function set(event) {
  if (event.keyCode == 13)
    get(search.value);
}

function get(location) {
  fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(display);
}

function display(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = now.toLocaleDateString("en-US", options);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weatherevent = document.querySelector('.current .weather');
  weatherevent.innerText = weather.weather[0].main;

  let iconid = document.querySelector('.weather-icon');
  let iconcode = weather.weather[0].icon;
  iconid.innerHTML = `<img src="icons/${iconcode}.png" alt=" ">`;
}