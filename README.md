
# TurnUp

TurnUp is an app that allows users to search for free events either nearby or from a search query. Click here to see the deployed site: https://production.d3hv43jagk7qg5.amplifyapp.com/

## Tech Stack

In this project we used React to take advantage of it's versitality as well as our familiarity with the framework. Due to the time constraint we also sparingly used the Material UI library (mainly for the buttons) and AWS component library to personalise our Cognito log-in page. Google Maps API is used to display the map and introduce the auto-complete for place search when user is creating an event. Cypress is used for end-to-end testing.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation

Before executing the steps below, you'll need to clone and start a server from [final-project_back-end-slack-ops](https://github.com/SchoolOfCode/final-project_back-end-slack-ops).
This is a step by step guide that will tell you how to get the development environment up and running.

```
$ Clone this repository
$ Change the google API key in src/components/MapContainer.js and src/components/Places.js
$ npm i to download the necessary libraries
```

## Deployment

To deploy the website on your machine you need to type the following command into the console after completing the instalation:

```
$ npm start
```

### Server

* Live: https://production.d3hv43jagk7qg5.amplifyapp.com/
* Development: localhost:3000

### Branches

* Master: main
* Development: dev2-revelations

Any feedback is appreciated. If you have any questions, get in touch with the team: 

[Kal Hollywood](https://github.com/kalhollywood)
[Jordan Flash](https://github.com/flashjdn)
[Simon Bowen](https://github.com/sibowen535)
[Owen Bovill](https://github.com/OwenB-HamD)
[Patryk Kielsa](https://github.com/MightyKielsa)
