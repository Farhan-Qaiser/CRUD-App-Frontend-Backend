import { useState,useEffect } from "react"
import axios from 'axios'

const API_URL = 'hhttp://localhost:3000/users'

function App() {

    const [users, setusers] = useState([]);


    const fertchUsers = async () => {
        const response = await axios.get(API_URL)
        const content = response.data
        setusers(content.data)
    }

    useEffect(() => {
        fertchUsers()
    }, []);


    return (
        <>
            <h1>CRUD Application</h1>
            <input type="text" />
        </>
    )
}

export default App
