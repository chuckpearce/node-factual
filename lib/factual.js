// TO-DO: Implement "Multi" from Core API

var OAuth = require('oauth').OAuth;

var Client = function(oauth_config) {  
  this.oauth = new OAuth(
    null,
    null,
    oauth_config.consumer_key,
    oauth_config.consumer_secret,
    "1.0",
    null,
    'HMAC-SHA1'
  );

  return this;
};

var base_url = "http://api.v3.factual.com/";

Client.prototype.get = function(resource, callback) {
  console.log(base_url + resource);
  return this.oauth.get(
    base_url + resource,
    null,
	null,
    function(error, data, response) {
      if(!error) data = JSON.parse(data);
      callback(error, data, response);
    }
  );
}

/*
Exampe:
factual.search({name:"McDonalds",address:"10451 Santa Monica Blvd",region:"CA",postcode:"90025"}, function(error, data) {});

@see http://developer.factual.com/display/docs/Places+API+-+Resolve
*/
Client.prototype.resolve = function(params, callback) {
  return this.get('places/resolve/?values=' + encodeURIComponent(JSON.stringify(params)), callback);
}

/*
Exampe:
factual.read({filters: {country: "US"}}, function(error, data) {});

@see http://developer.factual.com/display/docs/Core+API+-+Read
*/
Client.prototype.read = function(params, callback) {
	var url = 't/';
        
	if (params['table']) {
        url += params['table'];
	} else {
        url += 'global';
	}
    
    url += '?';
    
	// Filters require nested objects to be read by JSON
	// Filters are also used to access the Crosswalk for Products API
	// @see http://developer.factual.com/display/docs/Core+API+-+Row+Filters
    if (params['filters']) {
        url += 'filters=' + encodeURIComponent(JSON.stringify(params['filters'])) + "&";
    }
	
    if (params['include_count'] == true) {
        url += 'include_count=' + params['include_count'] + "&";
	}
    
	// GEO references require nested objects to be read by JSON
	// @see http://developer.factual.com/display/docs/Core+API+-+Geo+Filters
	// ex. {$circle:{$center:[35.001,-18.221],$meters:5000}}
    if (params['geo']) {
        url += 'geo=' + encodeURIComponent(JSON.stringify(params['geo'])) + "&";
    }
    
    if (params['limit'] > 0) {
        url += 'limit=' + params['limit'] + "&";
    }
	    
	// Full text search
	// @see http://developer.factual.com/display/docs/Core+API+-+Search+Filters
    if (params['q']) {
        url += 'q=' + params['q'] + "&";
    }
        
    if (params['offset'] > 0) {
        url += 'offset=' + params['offset'] + "&";
    }    
        
    if (params['select']) {
        url += 'select=' + params['select'] + "&";
    }
        
    if (params['sort']) {
        url += 'sort=' + params['sort'] + "&";
    }
    
  return this.get(url, callback);
}

/*
Exampe:
factual.schema("global", function(error, data) {});

@see http://developer.factual.com/display/docs/Core+API+-+Schema
*/
Client.prototype.schema = function(table, callback) {
  return this.get('t/' + table + '/schema', callback);
}

/*
Exampe:
factual.facets({select: "locality,region",geo: {$circle:{$center:[34.06018, -118.41835],$meters:5000}}, q: "starbucks", filters: {country: "US"} }, function(error, data) {});

The select parameter is required.

@see http://developer.factual.com/display/docs/Core+API+-+Facets
*/
Client.prototype.facets = function(params, callback) {
	var url = '';
            
    if (params['select']) {
        url += 'select=' + params['select'] + "&";
    }
	
	// Filters require nested objects to be read by JSON
	// @see http://developer.factual.com/display/docs/Core+API+-+Row+Filters
    if (params['filters']) {
        url += 'filters=' + encodeURIComponent(JSON.stringify(params['filters'])) + "&";
    }
	
	// GEO references require nested objects to be read by JSON
	// @see http://developer.factual.com/display/docs/Core+API+-+Geo+Filters
	// ex. {$circle:{$center:[35.001,-18.221],$meters:5000}}
    if (params['geo']) {
        url += 'geo=' + encodeURIComponent(JSON.stringify(params['geo'])) + "&";
    }
	
    if (params['include_count'] == true) {
        url += 'include_count=' + params['include_count'] + "&";
	}  
    
    if (params['limit'] > 0) {
        url += 'limit=' + params['limit'] + "&";
    }
	
	// Full text search
	// @see http://developer.factual.com/display/docs/Core+API+-+Search+Filters
    if (params['q']) {
        url += 'q=' + params['q'] + "&";
    }
        
    if (params['min_count'] > 0) {
        url += 'min_count=' + params['min_count'] + "&";
    }
    
  return this.get('t/global/facets?' + url, callback);
}

/*
Exampe:
factual.crosswalk({factual_id: "97598010-433f-4946-8fd5-4a6dd1639d77"}, function(error, data) {});

@see http://developer.factual.com/display/docs/Core+API+-+Crosswalk
*/
Client.prototype.crosswalk = function(params, callback) {
	var url = '';
            
    if (params['factual_id']) {
        url += 'factual_id=' + params['factual_id'] + "&";
    }
	
    if (params['limit'] > 0) {
        url += 'limit=' + params['limit'] + "&";
    }
	
    if (params['namespace']) {
        url += 'namespace=' + params['namespace'] + "&";
    }
	
    if (params['namespace_id']) {
        url += 'namespace_id=' + params['namespace_id'] + "&";
    }
	
    if (params['only']) {
        url += 'only=' + params['only'] + "&";
    }
	
  return this.get('places/crosswalk?' + url, callback);
}

/*
Exampe:
factual.reverseGeocode(34.06021,-118.41828, function(error, data) {});

@see http://developer.factual.com/display/docs/Core+API+-+Geocoder
*/
Client.prototype.reverseGeocode = function(lat, lng, callback) {
  var url = encodeURIComponent(JSON.stringify({"$point":[lat,lng]}));
  return this.get('places/geocode?geo=' + url, callback);
}

/*
Exampe:
factual.geopulse(34.06021,-118.41828, "commercial_profile,income,race", function(error, data) {});

@see http://developer.factual.com/display/docs/Core+API+-+Geopulse
*/
Client.prototype.geopulse = function(lat, lng, params, callback) {
  var url = encodeURIComponent(JSON.stringify({"$point":[lat,lng]}));
  
  if (params['select']) {
    url += '&select=' + params['select'];
  }
	
  return this.get('places/geopulse?geo=' + url, callback);
}

// @see http://developer.factual.com/display/docs/Core+API+-+Oauth
module.exports.createClient = function(oauth_config) {
  return new Client(oauth_config);
};