Package.describe({
    summary: "Foursquare OAuth flow",
    version: "0.1",
    git: "https://github.com/msamoylov/foursquare.git"
});

Package.on_use(function(api) {
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'client');
    api.use('templating', 'client');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);

    api.export('Foursquare');

    api.add_files(
        ['foursquare_configure.html', 'foursquare_configure.js'],
        'client');

    api.add_files('foursquare_server.js', 'server');
    api.add_files('foursquare_client.js', 'client');
});