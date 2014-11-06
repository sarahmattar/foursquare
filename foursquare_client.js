Foursquare = {};

// Request Foursquare credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Foursquare.requestCredential = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'foursquare'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
            new ServiceConfiguration.ConfigError());
        return;
    }

    var credentialToken = Random.secret();

    var loginStyle = OAuth._loginStyle('foursquare', config, options);

    var loginUrl =
        'https://foursquare.com/oauth2/authenticate' +
        '?client_id=' + config.clientId +
        '&response_type=code' +
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/foursquare') +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken);

    OAuth.launchLogin({
        loginService: "foursquare",
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken,
        popupOptions: {width: 900, height: 450}
    });
};