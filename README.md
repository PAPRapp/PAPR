# PAPR

PAPR is an educational web trading application designed for newbies to trade on the financial markets. The application is geared towards teachers and students, where teachers can create a room with a particular set of companies for students to trade virtual money. On creation of the room a unique URL is generated which then teachers can send out to students to join the room automatically. 

![Demo Animation](../assets/createfourm.gif?raw=true)


Inside the rooms, live stock market data is used to render and update the bar charts, candle charts, and ticker information in real time. Additionally, the platform provides news information and a sentiment analyzer which lets the students know if that article is neutral, positive or negative about that company. With all this information the students can make a informed buy or sell decision. 

![Demo Animation](../assets/screencast.gif?raw=true)

Each students portfolio is updated in real time based on the current holdings. Their portfolio value is displayed in USD in a leader board in the room so that other students can check their rankings in real time against fellow peers associated with that room.


## Getting Started

To run locally on your machine, simply clone the repository, download postgresQL and create a database named PAPR and NPM install.

![image](../assets/createdb.png?raw=true)


![image](../assets/npminstall.png?raw=true)

or simply visit https://papr-app.herokuapp.com/

## Built With
Technologies used to build this application include:
* [React](https://reactjs.org/) - Front-end framework used to build components
* [Redux](https://redux.js.org/) - Front-end framework used to manage state 
* [Socket.IO](https://socket.io/) - Library used to stream information in real-time
[IEX API](https://iextrading.com/developer/) - Stock market API with live up to date information on the market
[React-Vis](https://uber.github.io/react-vis/) - Uber’s D3 Library for charting
[Material-UI](https://material-ui.com/) - Google’s design library used for styling forms
* [NodeJS](https://nodejs.org/en/) - Server side environment used to set up router 
* [ExpressJS](https://expressjs.com/) - Server used to communicate with client side and PostgresQL database 
* [Sequelize](http://docs.sequelizejs.com/) - Library used to create models and query database for relevant information
* [FireBase](https://firebase.google.com/) -  Cloud database and service used for user authentication
* [PostgresQL](https://www.postgresql.org/) -  Relational database used to store all data that is not realtime data


## Authors
* Joe Lee <br/> <img src="../assets/0-1.png" alt="joe" width="100"/>
* Kevin Duarte <br/> <img src="../assets/0-2.png" alt="kevin" width="100"/>
* Aaron Ludwin <br/> <img src="../assets/0.png" alt="aaron" width="100"/>
* Matthew Hoover <br/> <img src="../assets/0-3.png" alt="matt" width="100"/>

## Acknowledgments
Thank you to all the instructors and fellows at Fullstack Academy for their support 
