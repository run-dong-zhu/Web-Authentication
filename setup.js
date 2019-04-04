const config = require('./config');
const { Pool, Client } = require('pg');

const pool = new Pool({
	user: config.dbconfig.user, // enter your host
	host: config.dbconfig.host,  //
	database: config.dbconfig.database,
	password: config.dbconfig.password,
	port: config.dbconfig.port
});

const email = config.email;

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log("db connected");
    }
})

const initTable = "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, firstName VARCHAR(40), lastName VARCHAR(40))";

pool.query(initTable, (err, res) => {
	if (err) {
        console.log(err.stack);
    } else {
        console.log("User Table CREATED or EXISTS");
    }
});

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
    console.log("User:" + email + " has been CREATED or EXISTS");
});