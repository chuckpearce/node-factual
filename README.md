Node.js module for interfacing with [Factual](http://www.factual.com)'s API v3

# Install #

    npm install factual

# Usage #

    // Request API access: http://developer.factual.com/display/docs/Factual+Developer+APIs+Version+3

    var factual = require("factual").createClient({
      consumer_key: "consumer-key", , 
      consumer_secret: "consumer-secret",
    });
    
    // See http://developer.factual.com/display/docs/Places+API+-+Resolve
    yelp.resolve({name:"McDonalds",address:"10451 Santa Monica Blvd",region:"CA",postcode:"90025"}, function(error, data) {
      console.log(data);
    });
    
# References #

- [Resolve API](http://developer.factual.com/display/docs/Places+API+-+Resolve)
