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
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    var display = mobile ? 'touch' : 'webpopup';

    var loginStyle = OAuth._loginStyle('foursquare', config, options);

    var loginUrl =
        'https://foursquare.com/oauth2/authenticate' +
        '?client_id=' + config.clientId +
        '&response_type=code' +
        '&display=' + display +
        '&redirect_uri=' + OAuth._redirectUri('foursquare', config);

    OAuth.launchLogin({
        loginService: 'foursquare',
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken,
        popupOptions: {width: 900, height: 450}
    });
};