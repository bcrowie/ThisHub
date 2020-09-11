# ThisHub

## About

ThisHub is a simple reddit clone written in Javascript with Express to provide RESTful API and React for the front-end. It it built using functional components in React and uses PostgreSQL as backend database.

## Requirements

- PostgreSQL: Database must be created and database name, username and password must be entered into ./config/database.js and ./config/config.json to configure Sequelize:

### database.js

```
module.exports = new Sequelize("DATABASE NAME", "USERNAME", "PASSWORD", {
  host: "localhost",
  dialect: "postgres"
});
```

### config.json

```
    "username": "",
    "password": "",
    "database": "",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
```

## Usage

- After configuring database variables above, run npx run migrations to build database models and tables.
- Run server in root of project with node server.
- Finally, start the React development environment with npm start.

## Features

- User registration and login with validation.
- Users that have registered and logged in have permissions to create new posts, comment and upvote and downvote posts and comments.
- If a user has not registered and logged in, they will be prompted to do so.
- Posts are scored just as with Reddit. Upvoting adds one point. Downvoting subtracts one point.
- Each user has an account activity page where they can see all posts they have Upvoted, Downvoted, as well as posts and comments they have personally made.
- Settings page with forms to change email, password and to delete account with validations is available.
