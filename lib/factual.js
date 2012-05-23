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

Client.prototype.get = function(resource, params, callback) {
  return this.oauth.get(
    base_url + resource + encodeURIComponent(JSON.stringify(params)),
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
  return this.get('places/resolve/?values=', params, callback);
}

/*
Exampe:
factual.read({name:"McDonalds",address:"10451 Santa Monica Blvd",region:"CA",postcode:"90025"}, function(error, data) {});

@see http://developer.factual.com/display/docs/Places+API+-+Resolve
*/
Client.prototype.read = function(params, callback) {
	var table = 'global';
	if (params['table']) table = params['table'];
	
	console.log(table);
  return this.get('t/' + table + '?filters=', params, callback);
}

// @see http://developer.factual.com/display/docs/Core+API+-+Oauth
module.exports.createClient = function(oauth_config) {
  return new Client(oauth_config);
};
