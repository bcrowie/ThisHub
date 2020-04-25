# Fullstack Web App Spec

## Intro

We want to create a fullstack web app using the exact same technologies you would find in a
production application at a silicon valley tech company. The actual product can be anything you'd
like, but we have a number of requirements regarding technology that we want to adhere to.

## Product Requirements

- Users should be able to create an account and log in using a username and password
- The application must be reasonable intuitive to use, styled nicely, and provide some utility

## Technical Requirements

- The application should have a frontend and a backend component, communicating via REST endpoints
- The frontend should use [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
  and use modern React for the UI layer. This means SFCs + hooks.
- The backend should use Node and [Express](https://www.npmjs.com/package/express) as a web server
- The backend should also use [Sequelize](https://sequelize.org/) as an ORM layer on top of Postres.
  It may be useful to install [Postico](https://eggerapps.at/postico/) or it's Window's equivalent
  to make interacting with the database easier.
- You may use any additional utility libraries you find useful
- The data model should have at least 3 tables, with at least 1 1-1 relation ship, and one 1-many or
  many-many relationship between rows in associated tables. For example, a User could have a 1-1
  relationship with BillingDetail, and a 1-many relationship with comments.
- The database should be maintained using incremental migrations.
- `npm run migrations` should execute all database migrations.
- `npm start` should start up the whole app, assuming Postgres is running and migrated. Bonus points
  if you create a script that starts Postgres, runs migrations if they haven't already, and runs the
  app.
