

(function(){
    'use strict';
})();

    let $myCity = $('#inputCity');
    let $myState = $('#inputState');
    let $myWind = $('#btnWind');
    let $myWeather = $('#btnReport');
    var $myforecastDetails = $('#forecastDetails');
    let urlAPI;
    
   $myWind.on('click', (event) => {
       remove()
       $myCity = $('#inputCity')[0].value
       if($myCity == "") throw "City is Empty";
       $myState = $('#inputState')[0].value
       if($myState == "") throw "State is Empty";
       urlAPI = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${$myCity}%2C%20${$myState}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
        
        $.ajax({url: urlAPI, success: function(result) {
            $myforecastDetails.append($(`<h2>${result.query.results.channel.location.city}, ${result.query.results.channel.location.region}</h2>`))
            console.log(result)
            weatherCode(result.query.results.channel.wind)
        }});

    });

    $myWeather.on('click', (event) => {
       remove()
       $myCity = $('#inputCity')[0].value
       if($myCity == "") throw "City is Empty";
       $myState = $('#inputState')[0].value
       if($myState == "") throw "State is Empty";
       urlAPI = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${$myCity}%2C%20${$myState}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

         $.ajax({url: urlAPI, success: function(result) {
            $myforecastDetails.append($(`<h2>${result.query.results.channel.location.city}, ${result.query.results.channel.location.region}</h2>`))
            console.log(result)
            weatherCode(result.query.results.channel.item.forecast[1])
        }});
    });

    function weatherCode(val){
        console.log(val)
        for (var property in val){
            if (val.hasOwnProperty(property)){
                $myforecastDetails.append($(`<h4>${property}: ${val[property]}</h4>`))
            }
        }
    }

    function remove(){
        $("h2").remove();
        $("h4").remove();
    }



