const Parse = require('parse/node')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();



const localMachineRoute = require('./routes/localmachine.route');
const remoteMachineRoute = require('./routes/remotemachine.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Parse configuration
Parse.initialize("myAppID", null, "myMasterKey");
Parse.serverURL = "http://localhost:2000/parse";

// localmachine route
app.use('/', localMachineRoute);
app.use('/', remoteMachineRoute);



app.listen(3000, err => {
    console.log('server established at 3000 port.')
})
