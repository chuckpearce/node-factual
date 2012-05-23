Node.js module for interfacing with [Factual](http://www.factual.com)'s API v3

# Install #

    npm install factual

# Pre-Check #

    Request API access: https://www.factual.com/api-keys/request
    Review documentation: http://developer.factual.com/display/docs/Factual+Developer+APIs+Version+3

# Examples #

```javascript
var factual = require("factual").createClient({
  consumer_key: "KEY", 
  consumer_secret: "SECRET"
});

factual.search({name:"McDonalds",address:"10451 Santa Monica Blvd",region:"CA",postcode:"90025"}, function(error, data) {});

factual.read({filters: {country: "US"}}, function(error, data) {});

factual.schema("global", function(error, data) {});

factual.facets({select: "locality,region",geo: {$circle:{$center:[34.06018, -118.41835],$meters:5000}}, q: "starbucks", filters: {country: "US"} }, function(error, data) {});

factual.crosswalk({factual_id: "97598010-433f-4946-8fd5-4a6dd1639d77"}, function(error, data) {});

factual.reverseGeocode(34.06021,-118.41828, function(error, data) {});

factual.geopulse(34.06021,-118.41828, "commercial_profile,income,race", function(error, data) {});
```

# References #

- [API Tester] (https://apigee.com/factual/embed/console/)
- [Resolve API] (http://developer.factual.com/display/docs/Places+API+-+Resolve)
- [Read API] (http://developer.factual.com/display/docs/Places+API+-+Read)
- [Schema API] (http://developer.factual.com/display/docs/Places+API+-+Schema)
- [Facets API] (http://developer.factual.com/display/docs/Places+API+-+Facets)
- [Crosswalk API] (http://developer.factual.com/display/docs/Places+API+-+Crosswalk)
- [Geocoder API] (http://developer.factual.com/display/docs/Places+API+-+Geocoder)
- [Geopulse API] (http://developer.factual.com/display/docs/Places+API+-+Geopulse)

# To-Do #

Add support for "Multi" API Calls