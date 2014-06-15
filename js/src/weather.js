function Forecast() {
    "use strict";
    // Start at the center of the universe.
    this.lat = "44.972845";
    this.lon = "-93.235055";
    this.cardinalValues = null;
    this.cardinalDirections = [
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
    ];
}

Forecast.prototype = {
    setCoords: function(position) {
        "use strict";
        var $dfd = $.Deferred();
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        $dfd.resolve();
        return $dfd.promise();
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

        $dfd.resolve();
        return $dfd.promise();
    },

    getCardinalDirection: function(degreeValue) {
        "use strict";
        var result,
            cds = this.cardinalDirections;

        $.each(this.cardinalValues, function(k, v) {
            if (k === 0) {
                if (degreeValue > v[0] || degreeValue < v[1]) {
                    result = cds[k];
                    return false;
                }
            } else {
                if (degreeValue > v[0] && degreeValue < v[1]) {
                    result =  cds[k];
                    return false;
                }
            }
        });
        return result;
    },

    parseWeather: function(data) {
        "use strict";
        console.log("Running parseWeather");
        var current_source = $("#current-conditions-template").html(),
            current_template = Handlebars.compile(current_source),
            current_html = current_template(data);
        $('#forecast-container').html(current_html);
    },

    requestFailed: function(data, status) {
        "use strict";
        console.log("data: " + data + " status: " + status);
    },

    sendRequest: function(lat, lon, timestamp) {
        "use strict";
        var self = this,
            path = lat + "/" + lon + "/";

        if (typeof timestamp !== 'undefined') {
            path = path + "/" + timestamp;
        }
        
        var $request = $.ajax({
            url: "http://forecast-truetone.rhcloud.com/" + path,
            type: "GET",
            dataType: "jsonp"
        });

        console.log(lat + '/' + lon);

        $('#forecast').append('Command center responded with data...');

        $request.done(function(data) {
            var current_source = $("#current-conditions-template").html(),
                current_template = Handlebars.compile(current_source),
                current_html = current_template(data);

            $('#forecast-container').html(current_html);

            self.parseWeather(data);

            })
            .fail(function() {
                self.requestFailed();
            });
    },

    init: function(lat, lon) {
        "use strict";
        var $dfd = $.Deferred();

        console.log('lat: ', lat, 'lon: ', lon);

        if (typeof lat !== 'undefined' && typeof lon !== 'undefined') {
            this.lat = lat;
            this.lon = lon;
        }

        console.log("Running init.");

        this.cardinalBuilder()

        .done(function() {
            $('#forecast').append('<p>Requesting data from forecast command center...</p>');
        });

        $dfd.resolve();
        return $dfd.promise();
    }
};


$('#forecast').append('<p>Initializing Forecast engine...</p>');

var f = new Forecast();
f.init();

navigator.geolocation.getCurrentPosition(function(position) {
    f.setCoords(position)

    .done(function() {
        "use strict";
        var $request = $.ajax({
            url: "http://forecast-truetone.rhcloud.com/" +
                                                f.lat + "/" +
                                                f.lon + "/",
            type: "GET",
            dataType: "jsonp"
        })

        .done(function(data) {
            
            console.log(data);

            var current_source = $("#current-conditions-template").html(),
                current_template = Handlebars.compile(current_source),
                current_html = current_template(data);
            
            $('#forecast-container').html(current_html);

            $('#forecast').append('Command center responded with data...');
        })

        .fail(function() {
            f.requestFailed();
        });
    });
});

Handlebars.registerHelper('getCardinalDirection', function(degreeValue) {
    "use strict";
    return f.getCardinalDirection(degreeValue);
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
        leftValue = parseInt(moonWidth * v) + 'px;',
        rightValue,
        rightStyle;

    if (parseFloat(v) < 0.5) {
        return "border-" + borderSide + ":solid white " + leftValue;
    } else {
        rightValue = (parseInt(moonWidth * v));

        // Fixes instances of rounding up to 26
        if (rightValue > 25) {
            rightValue = 25;
        }

        rightStyle = rightValue + 'px;';
        return "border-" + borderSide + ":solid white " + leftValue + " border-right: solid black " + rightStyle;
    }
});

Handlebars.registerHelper('floatToProbabilityPhrase', function(v) {
    "use strict";
    if (v > 0.7) {
        return "Count on it.";
    } else if (v > 0.6) {
        return "Pret-tay, pret-tay, pret-tay...good.";
    } else if (v > 0.5) {
        return "Pretty good.";
    } else if (v > 0.4) {
        return "Plan for it.";
    } else if (v > 0.3) {
        return "Mmm. Maybe.";
    } else if (v > 0.2) {
        return "Could happen.";
    } else if (v > 0.1) {
        return "Not likely.";
    }
    return "Not happening.";
});

/* Google Maps API */

var geocoder,
    map;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(f.lat, f.lon);
    var mapOptions = {
        zoom: 8,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress() {
    var address = document.getElementById('address').value;

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });

            console.log(results[0].geometry.location);

            f.init(results[0].geometry.location['k'], results[0].geometry.location['A'])

            .done(function() {
                f.sendRequest(results[0].geometry.location['k'], results[0].geometry.location['A']);
            });

        } else {
            alert('Geocode was not successful for the following reason. Here is some mumbo jumbo only developers will care about: ' + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

var $picker = $('#datepicker').pickadate({
        format: 'm/d/yyyy',
    }),
    picker = $picker.pickadate('picker');

picker.on({
    set: function(v) {
        console.log(f.lat, f.lon, v.select/1000);
        f.sendRequest(f.lat, f.lon, v.select/1000);
    }
});

