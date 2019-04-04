const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const auth = require('./auth');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: auth.dbconfig.user,
    host: auth.dbconfig.host,
    database: auth.dbconfig.database,
    passport: auth.dbconfig.passport,
    port: 5432
});

passport.serializeUser((user, done) => {
    //done(null, user.id);
    done(null, user);
});

passport.deserializeUser((id, done) => {
    // User.findById(id).then((user) => {
    //     done(null, user);
    // });
    done(null, user);
});

// Google Auth2
passport.use(new GoogleStrategy({
    clientID: auth.googleAuth.clientID,
    clientSecret: auth.googleAuth.clientSecret,
    callbackURL: auth.googleAuth.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    var email = profile.emails[0].value;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        if(results.rows.length == 0) {
            return done(null, false, {msg: 'This email not on the whitelist'});
        }

        return done(null, profile);
    });
}));

//Facebook Auth2
passport.use(new FacebookStrategy({
    clientID: auth.facebookAuth.clientID,
    clientSecret: auth.facebookAuth.clientSecret,
    callbackURL: auth.facebookAuth.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    var email = "bobbygroup17@163.com";
    console.log(profile);
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        // console.log(results);
        // console.log(results.rows[0]);
        if(results.rows.length == 0) {
            return done(null, false, {msg: 'This email not on the whitelist'});
        }
        return done(null, profile);
    });
}));