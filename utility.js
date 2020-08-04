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

module.exports = {
    PersonCreator, DoorCreator
}