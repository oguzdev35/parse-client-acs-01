const Parse = require('parse/node');

const {
    LogsObjectCreator, LogsSendBackend,
    LastAccessConstructor
} = require('../utility');

const access = (req, res) => {
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
              LogsSendBackend(Parse, doorID, LogsObjectCreator(person.get('personID'), person.get('name'), LastAccessConstructor(), true))
              res.json({"response": "authorized"})
          } else {
              query2.equalTo("personID", personID)
              query2.find()
                  .then( persons => {
                      const person = persons[0];
                      LogsSendBackend(Parse, doorID, LogsObjectCreator(person.get('personID'), person.get('name'), LastAccessConstructor(), false))
                  }, err => console.log(err.message))
              
              res.json({"response": "not-authorized"})
          }
          
      }, err => res.json({"msg": err.message}))
}

module.exports = {
    access: access
}