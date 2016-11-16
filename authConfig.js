var configForDevelopment = {
    endpoint: 'auth',
    configureEndpoints: ['auth', 'protected-api'],
    loginUrl: 'login',  
    signupUrl: 'users',
    profileUrl: 'me',
    unlinkUrl: 'me/unlink',
    loginOnSignup: false,
    storageChangedReload: true,    // ensure secondary tab reloading after auth status changes
    expiredRedirect: 1,            // redirect to logoutRedirect after token expiration
    providers: {
        google: {
            clientId: '1028833733426-1c9p82ath1ho224kv6gkclsgnc8gmiqp.apps.googleusercontent.com'
        }
        ,
        linkedin:{
            clientId:'778mif8zyqbei7'
        },
        facebook:{
            clientId:'1452782111708498'
        }
    }
};

var configForProduction = {
    providers: {
        google: {
            clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
        }
        ,
        linkedin:{
            clientId:'7561959vdub4x1'
        },
        facebook:{
            clientId:'1653908914832509'
        }

    }
};
var config;


if (window.location.hostname==='localhost') {
    config = configForDevelopment;
}
else{
    config = configForProduction;
}

config.endpoint = 'auth';                   // '' for the default endpoint
config.configureEndpoints = ['auth', 'public-api']; // '' for the default endpoint

export default config;