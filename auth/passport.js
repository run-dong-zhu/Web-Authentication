const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('../config');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: config.dbconfig.user,
  host: config.dbconfig.host,
  database: config.dbconfig.database,
  password: config.dbconfig.password,
  port: config.dbconfig.port,
});


// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('profile', profile);
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
  try {
    // Should have full user profile over here
    //console.log('profile', profile);
    //console.log('accessToken', accessToken);
    //console.log('refreshToken', refreshToken);

    const google = {
      email: profile.emails[0].value,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      gid: profile.id
    }

    console.log(google);

    pool.query('SELECT FROM users WHERE email = $1', [google.email], (error, results) => {
      if(error) {
        throw error;
      }
      if(results.rows[0].length == 0) {
        return done(null, false);
      }
      else{
        pool.query('UPDATE users SET firstname = $1, lastname = $2 WHERE email = $3', [google.firstname, google.lastname, google.email], (error, results) => {
          if (error) {
            throw error;
          }
        });
        const user = { 
          id: google.gid
        }
        return done(null, user);
      }
    });

    /*
    console.log(existingUser);
    
    if (existingUser) {
      console.log("exists!");
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
    */
  } catch(error) {
    done(error, false, error.message);
  }
}));

/*
passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message);
  }
}));
*/