require('dotenv').config()
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
Parse.initialize(process.env.APPID, null, process.env.MASTERKEY);
Parse.serverURL = process.env.SERVERURL;

// localmachine route
app.use('/', localMachineRoute);
app.use('/', remoteMachineRoute);


const port = process.env.PORT || 3000;

app.listen(port, err => {
    console.log(`Server established at port ${port}`)
})
