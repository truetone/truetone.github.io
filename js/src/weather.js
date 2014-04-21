var Forecast = {
        self: this,
        lat: "44.972845",
        lon: "-93.235055",

        setCoords: function(position) {
            "use strict";
            var self = Forecast;
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;
        },

        parseWeather: function(data) {
            "use strict";
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
            $request.done(self.parseWeather)
                    .fail(self.requestFailed);
        },

        init: function() {
            "use strict";
            var self = Forecast;
            navigator.geolocation.getCurrentPosition(self.setCoords);
            self.sendRequest(self.lat, self.lon);
        }
    };

Forecast.init();

