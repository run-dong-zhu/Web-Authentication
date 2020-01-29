module.exports = {
    'dbconfig' : {
        'user'      : 'zhurundong', // enter your host
        'host'      : 'localhost',  //
        'database'  : 'web_authen',
        'password'  : '',
        'port'      : 5432
    },

    'facebookAuth' : {
        'clientID'      : '', // Facebook App ID
        'clientSecret'  : '', // Facebook App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '',
        'clientSecret'  : '',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

}
