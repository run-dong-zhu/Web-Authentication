const { Pool, Client } = require('pg');

const pool = new Pool({
	user: 'zhurundong', // enter your host
	host: 'localhost',  //
	database: 'web_authen',
	password: '',
	port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log("db connected");
    }
})

const initTable = "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, firstName VARCHAR(40), lastName VARCHAR(40))";
//const initUser = "INSERT INTO users (email) VALUES ($1) SELECT ($1) WHERE NOT EXISTS (SELECT email FROM users WHERE email = ($1))";

pool.query(initTable, (err, res) => {
	if (err) {
        console.log(err.stack);
    } else {
        console.log("User Table CREATED or EXISTS");
    }
});

pool.query('SELECT email FROM users WHERE email = ($1)', ["bobbyzhu1992@gmail.com"], (err, res) => {
	console.log(err, res);
	pool.end();
})

const client = new Client({
	user: 'zhurundong',
	host: 'localhost',
	database: 'web_authen',
	port: 5432
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
	if (err) {
	  console.log(err.stack)
	} else {
	  console.log(res.rows[0])
	}
	client.end();
});