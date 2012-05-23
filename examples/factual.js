var factual = require("factual").createClient({
  consumer_key: "KEY", 
  consumer_secret: "SECRET"
});

factual.resolve({name:"McDonalds",address:"10451 Santa Monica Blvd",region:"CA",postcode:"90025"}, function(error, data) {console.log(data)});

factual.read({filters: {country: "US"}}, function(error, data) {console.log(data)});

factual.schema("global", function(error, data) {console.log(data)});

factual.facets({select: "locality,region",geo: {$circle:{$center:[34.06018, -118.41835],$meters:5000}}, q: "starbucks", filters: {country: "US"} }, function(error, data) {console.log(data)});

factual.crosswalk({factual_id: "97598010-433f-4946-8fd5-4a6dd1639d77"}, function(error, data) {console.log(data)});

factual.reverseGeocode(34.06021,-118.41828, function(error, data) {console.log(data)});

factual.geopulse(34.06021,-118.41828, "commercial_profile,income,race", function(error, data) {console.log(data)});