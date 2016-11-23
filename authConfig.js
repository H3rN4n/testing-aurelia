export default {
    endpoint: 'api',
    configureEndpoints: ['api'],
    loginUrl: 'login',  
    signupUrl: 'users',
    profileUrl: 'me',
    unlinkUrl: 'me/unlink',
    loginOnSignup: false,
    storageChangedReload: true,    // ensure secondary tab reloading after auth status changes
    expiredRedirect: 1,            // redirect to logoutRedirect after token expiration
    providers: {
        google: {
          name: 'google',
          url: '/auth/google/callback',
          clientId: '1028833733426-1c9p82ath1ho224kv6gkclsgnc8gmiqp.apps.googleusercontent.com',
          //authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          authorizationEndpoint: 'http://aurelia-dev.com:2112/auth/google',
          redirectUri: window.location.origin,
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display', 'state'],
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          display: 'popup',
          oauthType: '2.0',
          popupOptions: { width: 452, height: 633 },
          state: function() {
            let rand = Math.random().toString(36).substr(2);
            return encodeURIComponent(rand);
          }
        },
        twitter: {
          name: 'twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          redirectUri: window.location.origin,
          oauthType: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        facebook:{
          url: 'facebook',
          clientId: '1465278217541708498'
        }
    }
};