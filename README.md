# Web-Authentication

### KEYWORDS: Node.js, RESTful APIs, OAuth2, Postgres

### SETUP:
1. Download ZIP file
2. Decompress and open forder
3. Open .yml file to see environment config
4. Open **config.js** put require information, e.g. database info, Google project info
5. Insert first user email via bash, because only a whitelist user can add another whitelist user. (Or, add setup.js in app.js)
```
const setup = require('./setup');
```
6. Open terminal run: npm install
7. Lanuch server, run: npm run start-dev

### APIs
Tools: Postman
#### POST 'users/oauth/google': OAuth2 API, 
1. Open https://developers.google.com/oauthplayground/
2. Find 'Google OAuth2 API v2', enable 'userinfo.email' and 'userinfo.profile'
3. Get accessToken, put in Postman, method: "POST", body: "raw", "JSON(application/json)". Paste accessToken in JSON.
```
{
	"access_token" : "ya29.GlvhBtDfV-ez4fJLUG6dYzgRUI-pJZB5uKVgzAa5BtIIQR4yPF4jVBUXW-ac2D14AHimF13OMaqcQEpH0SqU1iYxIrWZtYgarAgxJqHbJfs5_Cb2YLvHYrWpz_Ei"
}
```
4. Return a JWT

#### GET '/users/whitelist': Show all whitelist users API,
1. Copy 'users/oauth/google' returned JWT
2. In Postman Authorization, TYPE: "Bearer Token"; Headers, KEY: "Authorization", VALUE: "Bearer" + JWT
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXZWItQXV0aGVudGljYXRpb24iLCJzdWIiOiIxMDIzNDkxNTc3OTU0NTQ4MzQ3ODUiLCJpYXQiOjE1NTQzNzI1MTh9.0Bq1BBPQoYm2bUEQk58ff7SNtvbWY2WEeUIgqdnYimM
```
3. Return JSON file with all whitelist users

#### POST '/users/signup': Add(refer) annother user to whitelist
1. Copy 'users/oauth/google' returned JWT
2. In Postman Authorization, TYPE: "Bearer Token"; Headers, KEY: "Authorization", VALUE: "Bearer" + JWT
3. Return JSON file with status message
