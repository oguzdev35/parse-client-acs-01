const Parse = require('parse/node')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const {
    PersonCreator, DoorCreator, LogsObjectCreator, LogsSendBackend
} = require('./utility');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Parse configuration
Parse.initialize("myAppID", null, "myMasterKey");
Parse.serverURL = "http://localhost:2000/parse";

app.post('/createperson', function(req, res){
    const { personID, name, title} = req.body;

    const person = PersonCreator(Parse).init(personID, name, title);

    person.save()
        .then( person => res.json({"msg": "person created!"}), error => res.json({"msg": "person not created"}))
})

app.post('/createdoor', function(req, res){
    const {doorName, doorID} = req.body;

    const door = DoorCreator(Parse).init(doorID, doorName);

    door.save()
        .then( door => res.json({"msg": "door created!"}), error => res.json({"msg": "door not created"}))

})


app.get('/getdoors', function(req, res){
    const Doors = Parse.Object.extend('Door');
    const query = new Parse.Query(Doors);

    query.find()
        .then( doors => res.json({"doors": doors}), err => {
            res.json({"msg": err.message})
        })
})

app.get('/getpersons', function(req, res){
    const Person = Parse.Object.extend('Person');
    const query = new Parse.Query(Person);

    query.find()
        .then( persons => res.json({"persons": persons}), err => {
            res.json({"msg": err.message})
        })
})


app.post('/updateperson', function(req, res){
    const { personID, doors, name, title} = req.body;

    const Person = Parse.Object.extend("Person");
    const query = new Parse.Query(Person);

    query.equalTo("personID", personID);

    query.find()
        .then( person => {
            const _person = person[0];
            const objectId = _person.id;
            query.get(objectId)
                .then( person => {
                    if(name) person.set("name", name);
                    if(title) person.set("title", title);
                    if(doors) person.set("doors", doors);
                    person.save().then( doc => res.json({"msg": "Person has been changed"}),
                    err => res.json({"msg": err.message}))
                }, err => res.json({"msg": "objectId not found"}))
        }, err =>{
            res.json({"msg": err.message})
        })


})

app.post('/updatedoor', function(req, res){
    const {doorName, doorID} = req.body;

    const Door = Parse.Object.extend('Door');
    const query = new Parse.Query(Door);

    query.equalTo("doorID", doorID);

    query.find()
        .then( door => {
            const _door = door[0];
            const objectId = _door.id;
            query.get(objectId)
                .then( door => {
                    door.set("doorName", doorName);
                    door.save().then( doc => res.json({"msg": "doorName has been changed"}), 
                    err => res.json({"msg": err.message}))
                }, err => res.json({"msg": "objectId not found"}))
            
        }, err => {
            res.json({"msg": err.message})
        })

})

app.post('/deletedoor', function(req, res){
    const {doorID} = req.body;

    const Door = Parse.Object.extend('Door');
    const query = new Parse.Query(Door);

    query.equalTo("doorID", doorID);

    query.find()
        .then( door => {
            const _door = door[0];
            const objectId = _door.id;
            query.get(objectId)
                .then( door => {
                    door.destroy().then((destroyedDoor) => res.json({"msg":"door object destroyed"}), 
                        err => res.json({"msg": err.message}))
                }, err => res.json({"msg": "objectId not found"}))
            
        }, err => {
            res.json({"msg": err.message})
        })
    
})

app.post('/deleteperson', function(req, res){
    const {personID} = req.body;

    const Person = Parse.Object.extend('Person');
    const query = new Parse.Query(Person);

    query.equalTo("personID", personID);

    query.find()
        .then( person => {
            const _person = person[0];

            const objectId = _person.id;
            query.get(objectId)
                .then( person => {
                    person.destroy().then((destroyedPerson) => res.json({"msg":"person object destroyed"}), 
                        err => res.json({"msg": err.message}))
                }, err => res.json({"msg": "objectId not found"}))
            
        }, err => {
            res.json({"msg": err.message})
        })
    
})

app.post('/access', function (req, res) {
  const { personID, doorID } = req.body;

  const Person = Parse.Object.extend("Person");
  const query1 = new Parse.Query(Person);
  const query2 = new Parse.Query(Person);

  query1.equalTo("personID", personID);
  query1.equalTo("doors", doorID);

  query1.find()
    .then( persons => {
        if(persons.length !== 0){
            const person = persons[0];
            LogsSendBackend(Parse, doorID, LogsObjectCreator(person.get('personID'), person.get('name'), (new Date()).toDateString(), true))
            res.json({"response": "authorized"})
        } else {
            query2.equalTo("personID", personID)
            query2.find()
                .then( persons => {
                    const person = persons[0];
                    LogsSendBackend(Parse, doorID, LogsObjectCreator(person.get('personID'), person.get('name'), (new Date()).toDateString(), false))
                }, err => console.log(err.message))
            
            res.json({"response": "not-authorized"})
        }
        
    }, err => res.json({"msg": err.message}))

})


app.listen(3000, err => {
    console.log('server established at 3000 port.')
})
