const mongoose = require('mongoose')

const action =
  process.argv.length === 3 ? 'get' : process.argv.length === 5 ? 'create' : ''

if (!action) {
  console.log(`
  Usage:
   To get all persons: node mongo.js <password>
   To add a new person: node mongo.js <password> <name> <number>
  `)
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@sandbox.apig1.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

switch (action) {
  case 'get':
    Person.find({}).then((result) => {
      console.log('phonebook:')
      result.forEach((r) => console.log(r.name, r.number))
      mongoose.connection.close()
    })
    break

  case 'create': {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    person.save().then((result) => {
      const { name, number } = result
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    break
  }
}
