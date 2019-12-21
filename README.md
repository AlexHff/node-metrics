# node-metrics [![Build Status](https://travis-ci.com/AlexHff/node-metrics.svg?token=qewhLzzy4xorKFhMwTS6&branch=master)](https://travis-ci.com/AlexHff/node-metrics)

Simple web API to work on metrics

## Features

  * Authentication
  * CRUD users
  * CRUD metrics

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To build and run this app locally you will need Node.js

### Quick start

Clone the repository
```bash
git clone https://github.com/AlexHff/node-metrics.git
cd node-metrics
```

Install dependencies
```bash
npm install
```

Populate database
```bash
npm run populate
```

Build and run the project
```bash
npm run build
npm start
```

Finally, navigate to `http://localhost:8081` and you should see the project being served and rendered locally.

## Running the tests

Run unit tests
```bash
npm test
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [EJS](https://ejs.co/) - Embedded JavaScript templating
* [Level](https://github.com/Level/level) - Fast & simple storage
* [Passport](http://www.passportjs.org/docs/) - Authentication middleware for Node
* [Chart.js](https://www.chartjs.org/docs/latest/) - Simple yet flexible JavaScript charting

## Authors

* [**Alexander Hoffmann**](https://github.com/AlexHff)
* [**Hugo Fougeres**](https://github.com/LaGereFou)
* [**Jeremy Roca**](https://github.com/jeremyroca)

For more information, see the [CONTRIBUTORS](CONTRIBUTORS.md) file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Routes

* GET / Displays the homepage
* GET /login Displays the login form
* POST /login Logs the user in
* GET /logout Signs out the current out
* GET /signup Displays the signup form
* POST /signup Adds a user
* GET /user Gets the current user
* GET /metric Gets all metrics
* GET /metric/:id Gets a metric given an id
* GET /new Displays the form to add a new metric
* POST /new Adds a new metric
* POST /update Updates an existing metric
* POST /delete Deletes a metric

## Acknowledgments

* [**Sergei Kudinov**](https://github.com/sergkudinov) for providing valuable pieces of code related to this project

