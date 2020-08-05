const PersonCreator = (Parse) => {
    const _PERSON = Parse.Object.extend('Person', {}, {
        init: function(personID, name, title){
            const person = new _PERSON();
            person.set('personID', personID); // must be unique?
            person.set('name', name);
            person.set('title', title);
            person.set('doors', []);
            return person;
        }
    })

    return _PERSON;
}

const DoorCreator = (Parse) => {
    const _DOOR = Parse.Object.extend('Door', {}, {
        init: function(doorID, doorName){
            const door = new _DOOR();
            door.set('doorID', doorID); // must be unique?
            door.set('doorName', doorName);
            door.set('logs', [])
            return door;
        }
    })

    return _DOOR;
}

const LogsObjectCreator = (personId, personName, lastaccess, access) => {
    return ({personId, personName, lastaccess, access})
}

const LogsSendBackend = (Parse, doorID, logsObject) => {
    const Door = Parse.Object.extend("Door");
    const query = new Parse.Query(Door);

    query.equalTo("doorID", doorID);

    query.find()
        .then( doors => {
            const door = doors[0];

            door.add("logs", logsObject)

            door.save().then( doc => "logs has been send to the backend", 
                err => console.log(err.message))
        }, err => console.log(err.message))

}

module.exports = {
    PersonCreator, DoorCreator, LogsObjectCreator, LogsSendBackend
}