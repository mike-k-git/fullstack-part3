const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((p) => p.id === id)

  if (!person) {
    return response.status(404).send('Person not Found')
  }

  response.json(person)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = {
    id: Math.floor(Math.random() * 10000) + 1000,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((p) => p.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(`
    <div>
    <p>Phonebook has info for ${persons.length} persons</p>
    <p>${new Date()}</p>
    </div>
  `)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
