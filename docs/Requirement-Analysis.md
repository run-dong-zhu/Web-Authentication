# Requirement Analysis

## Summary:

Create an authentication service that will be used to authenticate and keep record of users. 

1. Users will sign in via social auth (Google, Microsoft, Github, etc.), and you will store basic information about the user - email at least, name, etc. and assign the user a unique id. 
2. Users will have to be whitelisted (ie their email is stored in the db), else throw an error saying something like "You haven't been whitelisted". A whitelisted user, upon signing in, will get a JWT for further authentication A whitelisted user, with a valid JWT, should be able to whitelist another user.

## Question:
Write a service that will let a user sign in using one Social Login with OAuth2 (You can choose). Only users who have been whitelisted can sign in, else return an error message.

You may choose to create a landing page/welcome page, but consider it extra credit.

     1. allow the user to sign in
              - user can sign in using a Social Login of your choice (Google, Microsoft, Github, etc)
              - user's email should be in the db before they are allowed to go further, else give an error

     2. populate the rest of the user's profile on first login (you choose which kind of db/tables/what info to store, e.g. email, first name, last name, etc.)
              - do this only if their email is already present (ie they have been whitelisted)

     3. return a JWT on successful sign in (https://jwt.io/)
              - if the user has signed in successfully, redirect them to the welcome page (ie return to the user their JWT somehow, the page itself can be extra credit)

     4. a registered user should be able to "whitelist" other users
              - registered user should be able to see list of all whitelisted users

Please include a Dockerfile, and the command to get started (including what environment variables are required, what port to run on, etc.) so we can run it ourselves.

Please include a README that documents your application, how to use the API, how to run it locally, dependencies etc.

You can use Javascript w/ NodeJS, or Go. You can choose any relational DB you want (MySQL/Postgres)

## Analysis

Based on requirement Analysis, this software can divided into sub-problems below:

Functional Requirements: <br/>
1. Allow user to sign in via Google, Microsoft, Github, etc
2. Store user profile in database (whitelist)
3. Using JWT for user authentication
4. User on whitelist ables to another user on whitelist

Non-functional Requirements: <br/>
1. Programming Language: Javascript w/ NodeJS, or Go
2. Database Options: MySQL/Postgres
