module.exports = {
    'dbconfig' : {
        'user'      : 'zhurundong', // enter your host
        'host'      : 'localhost',  //
        'database'  : 'web_authen',
        'password'  : '',
        'port'      : 5432
    },

    'email' : "bobbyzhu1992@gmail.com",

    'facebookAuth' : {
        'clientID'      : '304712910195776', // Facebook App ID
        'clientSecret'  : '774e9016b9e7107c702bd11c4292e07f', // Facebook App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '110724480328-nb9bgc6t8dlqt68b73g42if3onvrnkok.apps.googleusercontent.com',
        'clientSecret'  : '73_rbqG59qhyH4sgxZfab91N',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }
}