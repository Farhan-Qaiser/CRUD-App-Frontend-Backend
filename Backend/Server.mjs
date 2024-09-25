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

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})
