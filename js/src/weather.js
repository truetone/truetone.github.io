var Forecast = {
        self: this,
        lat: "44.972845",
        lon: "-93.235055",
        cardinalValues: null,
        cardinalDirections:  [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
        ],

        setCoords: function(position) {
            "use strict";
            var self = Forecast;
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;
            self.init();
        },

        cardinalBuilder: function() {
            "use strict";
            /**
             * Cardinal values taken from
             * http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
             */
            var gtValues = [
                    348.75,
                    11.25,
                    33.75,
                    56.25,
                    78.75,
                    101.25,
                    123.75,
                    146.25,
                    168.75,
                    191.25,
                    213.75,
                    236.25,
                    258.75,
                    281.25,
                    303.75,
                    326.25
                ],
                $dfd = $.Deferred(),
                cardinals = [];
            
            $.each(gtValues, function(k, v) {
                var ltValue;

                if (typeof gtValues[k + 1] !== "undefined"){
                    ltValue = gtValues[k + 1] + 0.01;
                } else {
                    ltValue = gtValues[0] - 0.01;
                }
                cardinals.push([v, ltValue]);
            });
            this.cardinalValues = cardinals;
            console.log(cardinals);
            $('#forecast').append('<p>Calculating cardinal wind directions...</p>');
            return $dfd.promise();
        },

        getCardinalDirection: function(degreeValue) {
            "use strict";
            var result;
            $.each(this.cardinalValues, function(k, v) {
                if (k === 0) {
                    if (degreeValue > v[0] || degreeValue < v[1]) {
                        result = Forecast.cardinalDirections[k];
                        return false;
                    }
                } else {
                    if (degreeValue > v[0] && degreeValue < v[1]) {
                        result =  Forecast.cardinalDirections[k];
                        return false;
                    }
                }
            });
            return result;
        },

        parseWeather: function(data) {
            "use strict";
            var current_source = $("#current-conditions-template").html(),
                current_template = Handlebars.compile(current_source),
                current_html = current_template(data);
            $('#forecast').html(current_html);

            console.log(data);
        },

        requestFailed: function(data, status) {
            "use strict";
            console.log("data: " + data + " status: " + status);
        },

        sendRequest: function(lat, lon) {
            "use strict";
            var self = Forecast,
                $request = $.ajax({
                url: "http://forecast-truetone.rhcloud.com/" +
                                                   lat + "/" +
                                                   lon + "/",
                type: "GET",
                dataType: "jsonp"
            });
            console.log(lat + '/' + lon);
            $('#forecast').append('Command center responded with data...');
            $request.done(self.parseWeather)
                    .fail(self.requestFailed);
        },

        init: function() {
            "use strict";
            var self = Forecast;
            console.log("Running init.");
            self.cardinalBuilder();
            $('#forecast').append('<p>Requesting data from forecast command center...</p>');
            self.sendRequest(self.lat, self.lon);
        }
    };

$('#forecast').append('<p>Initializing Forecast engine...</p>');

navigator.geolocation.getCurrentPosition(Forecast.setCoords);

Handlebars.registerHelper('getCardinalDirection', function(degreeValue) {
    "use strict";
    return Forecast.getCardinalDirection(degreeValue);
});

Handlebars.registerHelper('floatToPercent', function(v) {
    "use strict";
    return parseInt(v * 100) + "%";
});

Handlebars.registerHelper('toInt', function(v) {
    "use strict";
    return parseInt(v);
});

Handlebars.registerHelper('intToDay', function(v) {
    "use strict";
    var today = moment().get('day'),
        day = moment().day(today + v);
    return day.format('dddd');
});

Handlebars.registerHelper('intToHour', function(v) {
    "use strict";
    var hr = moment().get('hour'),
        hour = moment().hour(hr + v);
    return hour.format('ha');
});

Handlebars.registerHelper('intToTime', function(v) {
    "use strict";
    var time = moment().minute(v);
    return time.format('h:mma');
});

Handlebars.registerHelper('timestampToHour', function(v) {
    "use strict";
    var date = moment.unix(v);
    return date.format('h') + date.format('a');
});

Handlebars.registerHelper('timestampToTime', function(v) {
    "use strict";
    var date = moment.unix(v);
    return date.format('h') + ":" + date.format('mm') +  date.format('a');
});

Handlebars.registerHelper('amountOfSunlight', function(sunrise, sunset) {
    "use strict";
    var diff = (parseInt(sunset) - parseInt(sunrise)),
        hours = parseInt((diff/60)/60),
        mnRemainder = diff - ((hours * 60) * 60),
        minutes = parseInt(mnRemainder / 60),
        seconds = mnRemainder - (minutes * 60);
    return hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds';
});

Handlebars.registerHelper('multiplyByOneHundred', function(v) {
    "use strict";
    return v * 100;
});

Handlebars.registerHelper('getMoonPhase', function(v) {
    "use strict";
    var borderSide = "left",
        moonWidth = 50,
        value = parseInt(moonWidth * v) + 'px;';

    if (parseFloat(v) > .50) {
        borderSide = "right";
        value = (parseInt(moonWidth * v)) + 'px;';
    }
    return "border-" + borderSide + ":solid white " + value;
});

