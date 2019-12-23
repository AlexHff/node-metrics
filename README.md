# node-metrics [![Build Status](https://travis-ci.com/AlexHff/node-metrics.svg?token=qewhLzzy4xorKFhMwTS6&branch=master)](https://travis-ci.com/AlexHff/node-metrics) [![Coverage Status](https://coveralls.io/repos/github/AlexHff/node-metrics/badge.svg?branch=master)](https://coveralls.io/github/AlexHff/node-metrics?branch=master)

<p align="center">
<a href="https://crack.wenger-systems.com/">https://crack.wenger-systems.com/</a>
</p>

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

### Run in Docker

This app can also be launched in a Docker container. Go to the directory that has your Dockerfile and run the following command to build the Docker image.
```bash
docker build -t node-metrics .
```

Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:
```bash
docker run -p 8081:8081 -d node-metrics
```

Now open `http://localhost:8081` and you should see the app running locally.

## Running the tests

Run unit tests
```bash
npm test
```

## Deployment

This application has been deployed to an Elastic Beanstalk environment on AWS.

### Deploy a Container with a Dockerfile

Use the Elastic Beanstalk CLI (EB CLI) to configure your local repository for deployment to Elastic Beanstalk.

```bash
eb init -p docker <application-name>
```

After testing your application locally, deploy it to an Elastic Beanstalk environment. Elastic Beanstalk uses the instructions in your Dockerfile to build and run the image.

Use the EB CLI to create an environment and deploy your application.

```bash
eb create <environment-name>
```

Once your environment has launched, use eb open to view it in a web browser.

```bash
eb open
```

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


| Method | Route | Description |
| - | - | - |
| GET | / | Displays the homepage |
| GET | /login | Displays the login form |
| POST | /login | Logs the user in |
| GET | /logout | Signs out the current out |
| GET | /signup | Displays the signup form |
| POST | /signup | Adds a user |
| GET | /user | Gets the current user |
| GET | /metric | Gets all metrics |
| GET | /metric/:id | Gets a metric given an id |
| POST | /new | Adds a new metric |
| POST | /update | Updates an existing metric |
| POST | /delete | Deletes a metric |

## Acknowledgments

* [**Sergei Kudinov**](https://github.com/sergkudinov) for providing valuable pieces of code related to this project
* [**startbootstrap-sb-admin-2**](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2) for the admin dashboard template

