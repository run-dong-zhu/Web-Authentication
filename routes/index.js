const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'zhurundong',
    host: 'localhost',
    database: 'web_authen',
    port: 5432
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Web Authentication' });
});

router.get('/login', (req, res, next) => {
    res.render('oauth');
});

router.post('/login', (req, res, next) => {
    var email = req.body.email;

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        }
        //console.log(results.rows);
        if(results.rows.length < 1) {
            console.log("invaild email address");
            res.redirect('/');
        }
        else {
            //res.render('signin', { title: "Login with Facebook"});
            res.redirect('/login');
        }
    });
});

router.get('/whitelist', (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error;
        }
            // create jwt
        const token = jwt.sign(
          {
            email: 'bobbyzhu@gmail.com',
            test: "Test"
          },
          "secret",
          {
            expiresIn: 3600
          }
        );

        res.cookie('auth', token);

        res.render('whitelist', {token : token, whitelist: results.rows});
    });
});

router.post('/add-user', isWhite, (req, res, next) => {
    var email = req.body.email;
    console.log(email);
    pool.query("SELECT * FROM users WHERE email = ($1)", [email], (error, result) => {
        if(error) {
            throw error;
        }
        if(result.rows.length == 0) {
            pool.query("INSERT INTO users (email) VALUES ($1)", [email], (error, results) => {
                if(error) {
                    throw error;
                }
            });
        }
        res.redirect('/whitelist');
    });
});

/*
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope : ['email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/signin',
    failureRedirect: '/'
}));
*/

router.get('/auth/google', passport.authenticate('google', {
    scope : ['email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    session: false,
    successRedirect: '/whitelist',
    failureRedirect: '/'
}));

/*
router.get('/db', (req, res, next) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if(err) {
            console.log(err);
        }
        res.render('whitelist', {
            users: results.rows
        });
    });
});
*/

module.exports = router;

function isWhite(req, res, next) {
    try {
        var token = req.cookies.auth;
        var decode = jwt.verify(token, "secret");
        req.userData = decode;
        next();
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}
