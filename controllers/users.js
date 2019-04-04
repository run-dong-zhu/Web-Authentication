const jwt = require('jsonwebtoken');
const config = require('../config');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: config.dbconfig.user,
  host: config.dbconfig.host,
  database: config.dbconfig.database,
  password: config.dbconfig.password,
  port: config.dbconfig.port,
});

signToken = (user) => {
  return jwt.sign({
    iss: 'Web-Authentication',
    sub: user.id,
    //iat: new Date().getTime(), // current time
    //exp: 3600 // 1h
  }, config.jwt_secret);
}

// verifyToken = (token) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: 'Auth failed'
//     });
//   }
// }

module.exports = {
  signUp: async (req, res, next) => {
    const email = req.body.email;

    pool.query("SELECT * FROM users WHERE email = ($1)", [email], (error, result) => {
      if(error) {
        throw error;
        return res.status(500).json({error: error.message});
      }
      if(result.rows.length == 0) {
        pool.query("INSERT INTO users (email) VALUES ($1)", [email], (error, results) => {
          if(error) {
            throw error;
          }
          return res.status(201).json({
            msg: email + "is on whitelist now!"
          });
        });
      }
      else {
        return res.status(403).json({
            msg: email + "is already on whitelist!"
        });
      }
    });
  },

  signIn: async (req, res, next) => {
    const email = req.body.email;

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if(error) {
        throw error;
      }

      const token = signToken(results.rows[0]);

      res.status(200).json({token});
    });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log(req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },


  whitelist: async (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if(error) {
        throw error;
      }
      res.status(200).json({users: results.rows});
    });
  }
}