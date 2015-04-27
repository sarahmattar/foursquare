Package.describe({
    name: 'wehrlock:foursquare',
    summary: 'Foursquare OAuth flow',
    version: '1.0.5',
    git: "https://github.com/wehrlock/foursquare.git",
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');
    api.use('oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'client');
    api.use('templating', 'client');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);

    api.export('Foursquare');

    api.addFiles(
        ['foursquare_configure.html', 'foursquare_configure.js'],
        'client');

    api.addFiles('foursquare_server.js', 'server');
    api.addFiles('foursquare_client.js', 'client');
});
