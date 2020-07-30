# artGarden
Full-stack application designed to help artists connect with art-lovers.  

## [Visit artGarden!](https://bit.ly/artgardengv) 

## Project Description

artGarden™ is for new artists who have trouble breaking into the art sphere. artGarden gives equal opportunity for paid gigs to new and established artists by allowing them to connect to potential clients through a unique bidding platform. Unlike other gig marketplace platforms, artGarden allows any registered artist to view and bid on user art commissions, giving the client the ability to set the price point while also giving lesser known artists a chance at taking on a commission that otherwise might not be accessible.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. They will also give an overview of some of the app's functionality. 

### Prerequisites

You will need MongoDB installed if you want to run this application locally. For help installing MongoDB, visit
````
https://docs.mongodb.com/manual/installation/
````

Once installed, make sure the MongoDB daemon is running with the following command line command:
````
$ mongod
````

### Installing

Git clone the repository to your local machine: 

HTTPS:
```
$ git clone https://github.com/gusvalenzuela/art-garden-bc.git
```
SSH:
````
$ git clone git@github.com:gusvalenzuela/art-garden-bc.git
````

Next, cd into the repository you cloned and install the necessary dependencies by running (or package manager of your choice):
````
$ npm install
````

You will then be able to start the app locally by runnning:
````
$ npm start
````
or 
````
$ npm run dev
````

## Built With

* [Sequelize](https://sequelize.org/) - MySQL Database
* [Express.js](https://expressjs.com/) - Node.js framework
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Handlebars.js](https://handlebarsjs.com/) - HTML Rendering
* [NPM](https://www.npmjs.com/) - Dependency management
* [Materialize](https://materializecss.com/) - CSS framework
* [Passport](http://www.passportjs.org/) - Authentication platform

## Authors / Team
- Mark Ohanesian: @markohanesian
- Anthony Pillow: @SquidDOTjpeg
- Gus Valenzuela: @gusvalenzuela

See the full list of [contributors](https://github.com/gusvalenzuela/art-garden-bc/graphs/contributors) who participated in this project along with individual commit history. 

## Planned updates

At the moment, this app is the minimum viable product. We hope to make updates to improve the UI/UX, and add more bidding functionality as well as features (such as setting a contract bidding, contract negotiations, pricing model, etc).
