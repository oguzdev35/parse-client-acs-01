require('dotenv').config()
const Parse = require('parse/node');
const {
    DoorCreator, PersonCreator
} = require('../utility');

const createperson = (req, res) => {
    const { personID, name, title} = req.body;

    const person = PersonCreator(Parse).init(personID, name, title);

    person.save()
        .then( person => res.json({"msg": "person created!"}), error => res.json({"msg": "person not created"}))
}

const createdoor = (req, res) => {
    const {doorName, doorID} = req.body;

    const door = DoorCreator(Parse).init(doorID, doorName);

    door.save()
        .then( door => res.json({"msg": "door created!"}), error => res.json({"msg": "door not created"}))

}

const getdoors = (req, res) => {
    const Doors = Parse.Object.extend(process.env.DOOR_CLASSNAME);
    const query = new Parse.Query(Doors);

    query.find()
        .then( doors => res.json({"doors": doors}), err => {
            res.json({"msg": err.message})
        })
}

const getpersons = (req, res) => {
    const Person = Parse.Object.extend(process.env.PERSON_CLASSNAME);
    const query = new Parse.Query(Person);

    query.find()
        .then( persons => res.json({"persons": persons}), err => {
            res.json({"msg": err.message})
        })
}


const updateperson = (req, res) => {
    const { personID, doors, name, title} = req.body;

    const Person = Parse.Object.extend(process.env.PERSON_CLASSNAME);
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


}

const updatedoor = (req, res) => {
    const {doorName, doorID} = req.body;

    const Door = Parse.Object.extend(process.env.DOOR_CLASSNAME);
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

}

const deletedoor = (req, res) => {
    const {doorID} = req.body;

    const Door = Parse.Object.extend(process.env.DOOR_CLASSNAME);
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
    
}

const deleteperson = (req, res) => {
    const {personID} = req.body;

    const Person = Parse.Object.extend(process.env.PERSON_CLASSNAME);
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
    
}

module.exports = {
    createperson,
    createdoor,
    getdoors,
    getpersons,
    updateperson,
    updatedoor,
    deletedoor,
    deleteperson
}