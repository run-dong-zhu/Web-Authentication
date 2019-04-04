const express = require('express');
const router = express.Router();
const passport = require('passport');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'zhurundong',
    host: 'localhost',
    database: 'web_authen',
    port: 5432
});

/* GET users listing. */
router.get('/signin', (req, res, next) => {
	var messages = req.flash('error');
	res.render('user/signin', {
		messages: messages
	});
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

router.post('/signin', passport.authenticate('facebook'));

module.exports = router;
