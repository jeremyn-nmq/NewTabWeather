// get date
var today = new Date();
var hour = today.getHours();
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  $('.time').html(h + ':' + m + ':' + s);
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  } // add zero in front of numbers < 10
  return i;
}
document.addEventListener('DOMContentLoaded', startTime());
var weekDay = '';
switch (today.getDay()) {
  case 0:
    weekDay = 'Sonntag';
    break;
  case 1:
    weekDay = 'Montag';
    break;
  case 2:
    weekDay = 'Dienstag';
    break;
  case 3:
    weekDay = 'Mittwoch';
    break;
  case 4:
    weekDay = 'Donnerstag';
    break;
  case 5:
    weekDay = 'Freitag';
    break;
  case 6:
    weekDay = 'Samstag';
    break;
}

var date =
  weekDay +
  String.fromCharCode(160) +
  String.fromCharCode(160) +
  String.fromCharCode(160) +
  today.getDate() +
  '-' +
  (today.getMonth() + 1) +
  '-' +
  today.getFullYear();

// Fill current date
$('.date').text(date);

// set bg color and sun's position depend on time
var bgColor = 'linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)';
if (hour > 5 && today.getHours() <= 7) {
  bgColor = 'linear-gradient(to right, #2c3e50, #3498db)';
  $('.sun').css('transform', 'rotate(-150deg) translate(40vw) rotate(-150deg)');
} else if (hour <= 10) {
  bgColor =
    'linear-gradient(to right, #34a4ca 0%, #59d7dd 28%, #a8f2f0 59%, #d0f8ef 84%, #d6f6e1 100%)';
  $('.sun').css('transform', 'rotate(-120deg) translate(40vw) rotate(-120deg)');
} else if (hour <= 14) {
  bgColor = 'linear-gradient(to left, #e65c00, #f9d423)';
  $('.sun').css({
    transform: 'rotate(-90deg) translate(40vw) rotate(-90deg)',
    background: 'linear-gradient(to left, #ede574, #e1f5c4)',
  });
} else if (hour <= 16) {
  bgColor =
    'linear-gradient(135deg, #ffe3c8 0%, #efad9e 45%, #c79797 65%, #a78a92 85%, #857d8d 100%)';
  $('.sun').css('transform', 'rotate(-60deg) translate(40vw) rotate(-60deg)');
  $('.weather').css('left', '10%');
} else if (hour <= 17) {
  bgColor =
    'linear-gradient(135deg, #536a97 11%, #8087ad 35%, #bca391 72%, #bd968a 96%, #a38b8a 100%)';
  $('.weather').css('left', '10%');
  $('.sun').css('transform', 'rotate(-30deg) translate(40vw) rotate(-30deg)');
} else if (today.getHours() >= 18 || today.getHours() <= 5) {
  bgColor = 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)';
  $('.sun').css('transform', 'rotate(-90deg) translate(40vw) rotate(-90deg)');
  $('.sun').css('background', 'linear-gradient(30deg, #dae2f8, #d6a4a4)');
  $('.date').css('color', '#e6dde4');
  $('.time').css('color', '#e6dde4');
  $('.google a').css('color', '#e6dde4');
  $('.google path').css('fill', '#e6dde4');
}
$('.container').css('background', bgColor);

// icon set: https://www.iconfinder.com/iconsets/weather-color-2
var cloudy = '<img src="images/cloudy.png">';
var foggy = '<img src="images/foggy.png">';
var heavy_rain = '<img src="images/heavy_rain.png">';
var light_rain = '<img src="images/light_rain.png">';
var light_sun = '<img src="images/light_sun.png">';
var moderate_rain = '<img src="images/moderate.png">';
var rainy_sun = '<img src="images/rainy_sun.png">';
var snowy = '<img src="images/snowy.png">';
var storm = '<img src="images/storm.png">';
var sun_foggy = '<img src="images/sun_foggy.png">';
var sunny = '<img src="images/sunny.png">';
var sun_windy = '<img src="images/sun_windy.png">';
var tornado = '<img src="images/tornado.png">';
var thunder = '<img src="images/thunder.png">';
var windy = '<img src="images/windy.png">';
var hail_rain = '<img src="images/hail_rain.png">';

// get weather
$(document).ready(function () {
  var city = '';
  var weather = [];
  const actions = new Map([
    [200, [thunder, 'add_thunder_rain']],
    [201, [thunder, 'add_thunder_rain']],
    [202, [thunder, 'add_thunder_heavy_rain']],
    [210, [thunder, 'add_thunder']],
    [211, [thunder, 'add_thunder']],
    [212, [thunder, 'add_thunder']],
    [221, [thunder, 'add_thunder']],
    [230, [thunder, 'add_thunder_rain']],
    [231, [thunder, 'add_thunder_rain']],
    [232, [thunder, 'add_thunder_rain']],

    [300, [light_rain, 'add_rain']],
    [301, [light_rain, 'add_rain']],
    [302, [light_rain, 'add_rain']],
    [310, [light_rain, 'add_rain']],
    [311, [light_rain, 'add_rain']],
    [312, [light_rain, 'add_rain']],
    [313, [light_rain, 'add_rain']],
    [314, [light_rain, 'add_rain']],
    [321, [light_rain, 'add_rain']],

    [500, [light_rain, 'add_rain']],
    [501, [moderate_rain, 'add_rain']],
    [502, [heavy_rain, 'increase_rain_width']],
    [503, [heavy_rain, 'increase_rain_width']],
    [504, [heavy_rain, 'increase_rain_width']],
    [511, [heavy_rain, 'increase_rain_width']],
    [520, [heavy_rain, 'increase_rain_width']],
    [521, [heavy_rain, 'increase_rain_width']],
    [522, [heavy_rain, 'increase_rain_width']],
    [531, [heavy_rain, 'increase_rain_width']],

    [/^[600-622]$/, [snowy, 'add_snow']],

    [701, [windy, 'add_mist']],
    [702, [windy, 'add_mist']],
    [703, [windy, 'add_mist']],
    [704, [windy, 'add_mist']],
    [731, [foggy, 'add_fog']],
    [741, [foggy, 'add_fog']],
    [771, [hail_rain, 'add_headvy_rain']],
    [781, [tornado, 'add_headvy_rain']],

    [800, [sunny, '']],
    [801, [light_sun, '']],
    [802, [cloudy, '']],
    [803, [cloudy, '']],
    [804, [cloudy, '']],

    ['default', [sunny, '']],
  ]);
  function icon(icon_name) {
    $('.weather .icon').html(icon_name);
  }
  function doWeather(action) {
    switch (action) {
      case 'add_thunder_rain':
        $('.lightning').css('display', 'block');
        $('.layer-1 .rain-drop').css('display', 'block');
        break;
      case 'add_thunder_heavy_rain':
        $('.thunder').css('display', 'block');
        $('.rain-drop').css('display', 'block');
        $('.rain-drop').css('width', '2px');
        break;
      case 'add_thunder':
        $('.thunder').css('display', 'block');
        break;
      case 'add_rain':
        $('.layer-1 .rain-drop').css('display', 'block');
        break;
      case 'increase_rain':
        $('.rain-drop').css('display', 'block');
        $('.rain-drop').css('width', '2px');
        break;
      case 'add_snow':
        $('.snowflakes .snowflake').css('display', 'block');
        break;
      case 'add_mist':
        $('.fog').css('display', 'block');
        break;
      case 'add_fog':
        $('.fog').css('display', 'block');
        $('.fog').css('filter', 'blur(20px)');
        break;
      default:
        $('.sterne .snowflake').css('display', 'block');
    }
  }

  function checkWeather(status) {
    let action = actions.get(status) || actions.get('default');
    icon(action[0]);
    doWeather(action[1]);
  }
  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: {},
    url:
      'https://api.openweathermap.org/data/2.5/weather?id=city-id&appid=app-id&units=metric&lang=de',
    success: function (data) {
      weather.date = moment.unix(data.dt).format('MM/DD/YYYY');
      weather.time = moment.unix(data.dt).format('HH:MM');
      weather.city = data.name;
      weather.weather = data.weather[0].description;
      weather.weather_id = data.weather[0].id;
      checkWeather(weather.weather_id);
      weather.temp = data.main.temp;
      weather.feels_like = data.main.feels_like;
      weather.maxTemp = data.main.temp_max;
      weather.minTemp = data.main.temp_min;
      $('.weather .city').html('Saigon'); //html(weather.city);
      $('.weather .curr-temp span').html(weather.temp);
      $('.weather .description').html(weather.weather);
      $('.weather .feel').html(Math.round(weather.feels_like));
    },
  });
});
