# Eventonica

Eventonica is a Event management app with a React frontend, Node/Express backend, and Postgres database.

## User Story :

**User Management**

- Add a new User
- Delete a User

**Event Management**

Event Management exercise is left to the participants.

### Technologies used

- React
- JavaScript / NodeJs
- Express
- Postgres

## Setup

First, clone the project and move inside the directory

next move into the server and install dependencies and start the server. Later import [seed.sql](./server/db/seed.sql) file.

```bash
cd server
npm install
npm start
```

Open another terminal then cd into the client, install dependencies and start the server

```bash
cd client
npm install
npm start
```

Note: Server runs on http://localhost:4001 and client on http://localhost:3000

## Room for Improvement

- write unit test using jest

https://sammeechward.com/mocking-a-database-with-jest-in-javascript/

https://medium.com/geoblinktech/postgres-and-integration-testing-in-node-js-apps-2e1b52af7ffc

https://css-tricks.com/react-integration-testing-greater-coverage-fewer-tests/

// https://handsonreact.com/docs/labs/js/T6-TestingForms

// https://community.redwoodjs.com/t/testing-forms-using-testing-library-user-event/2058/8
