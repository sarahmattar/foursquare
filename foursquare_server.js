Foursquare = {};

OAuth.registerService('foursquare', 2, null, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);

    return {
        serviceData: {
            id: identity.id,
            accessToken: OAuth.sealSecret(accessToken),
            email: identity.email,
            username: identity.login
        },
        options: {profile: {name: identity.name}}
    };
});

var getAccessToken = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'foursquare'});
    if (!config)
        throw new ServiceConfiguration.ConfigError();

    var response;
    try {
        response = HTTP.get(
            "https://foursquare.com/oauth2/access_token", {
                params: {
                    client_id: config.clientId,
                    client_secret: OAuth.openSecret(config.secret),
                    grant_type: 'authorization_code',
                    redirect_uri: OAuth._redirectUri('foursquare', config),
                    code: query.code
                }
            });
    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Foursquare. " + err.message),
            {response: err.response});
    }
    if (!response.data.errorType) { // if the http response was a json object with an errorType attribute
        throw new Error("Failed to complete OAuth handshake with Foursquare. " + response.data.errorType);
    } else {
        return response.data.access_token;
    }
};

var getIdentity = function (accessToken) {
    try {
        return HTTP.get(
            "https://api.foursquare.com/v2/users/self", {
                params: {access_token: accessToken}
            }).data;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from Foursquare. " + err.message),
            {response: err.response});
    }
};


Github.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};