import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000
let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'wY6jx@example.com',
    }, {
        id: 2,
        name: 'Jane Doe',
        email: 'qXqoH@example.com',
    }
]


app.get('/users', (req, res) => {
    res.status(200).json({
        message: 'Fetched all users', data:users})
})

app.post('/users', (req, res) => {
    const body = req.body
    const newItem = {
        id:users.length + 1,
        ...body
    }
    users.push(newItem)
    res.status(201).json({
        message: 'Created new user', data:newItem
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})
