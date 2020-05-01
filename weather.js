var cityName = $(".cityName");
var cityTemp = $(".temp");
var cityHumidity = $(".humidity");
var cityWindSpeed = $(".windSpeed");
var cityUvIndex = $(".uvIndex");
var cityLat = "";
var cityLon = "";
// Declaring variables for the 5-day forecast
var firstDate = $(".firstDate");
var secondtDate = $(".secondDate");

var thirdDate = $(".thirdDate");
var fourthDate = $(".fouthDate");
var fifthDate = $(".fifthDate");
var firstImage = $(".firstImg");
var secondImage = $(".secondImg");
var thirdImage = $(".thirdImg");
var fourthImage = $(".fourthImg");
var fifthImage = $(".fifthImg");
var firstTemp = $(".firstTemp");
var secondTemp = $(".secondTemp");
var thirdTemp = $(".thirdTemp");
var fourthTemp = $(".fourthTemp");
var fifthTemp = $(".fifthTemp");
var firstHumidity = $(".firstHumidity");
var secondHumidity = $(".firstHumidity");
var thirdHumidity = $(".firstHumidity");
var forthHumidity = $(".firstHumidity");
var firstHumidity = $(".firstHumidity");

$("#find-city").on("click", function (event) {
  event.preventDefault();
  //console.log("me clicked");

  var city = $("#city-input").val();

  var apiKey = "bbe5da90d55bd39816823c09143d06b8";
  var queryurl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryurl,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    var actualTemp = Math.floor((response.main.temp - 273.15) * 1.8 + 32);

    cityName.html(response.name);
    cityTemp.html("Temp : " + actualTemp);
    cityHumidity.html("humidity : " + response.main.humidity);
    cityWindSpeed.html("Windspeed : " + response.wind.speed);
    cityLat = response.coord.lat;
    cityLon = response.coord.lon;

    var uvQueryUrl =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat=" +
      cityLat +
      "&lon=" +
      cityLon;
    $.ajax({
      url: uvQueryUrl,
      method: "GET",
    }).then(function (uvRes) {
      //console.log(uvRes);

      cityUvIndex.html("UV Index : " + uvRes.value);

      var fiveDayQueryUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        apiKey;
      $.ajax({
        url: fiveDayQueryUrl,
        method: "GET",
      }).then(function (fivedayRes) {
        console.log(fivedayRes.list);
        for (var i = 0; i < fivedayRes.list.length; i++) {
          if (fivedayRes.list[i].dt_txt.indexOf("12:00:00") !== -1) {
            var date = fivedayRes.list[i].dt_txt;
            date = moment.parseZone(date).format("MMM Do");
            var tempF = Math.floor(
              (fivedayRes.list[i].main.temp - 273.15) * 1.8 + 32
            );
            var humidityFive = fivedayRes.list[i].main.humidity;
            var wrapper = $("<div>");
            wrapper.attr("class", "col-md-2");
            var fiveDate = $("<p>");
            fiveDate.text(date);
            var fiveImage = $("<img>");
            fiveImage.attr("src", "");
            var fiveTemp = $("<p>");
            fiveTemp.text("Temp: " + tempF);
            var fiveHumidity = $("<p>");
            fiveHumidity.text("Humidity: " + humidityFive);
            wrapper.append(fiveDate, fiveImage, fiveTemp, fiveHumidity);
            $(".fiveDayRow").append(wrapper);
          }
        }
      });
    });
  });
});
