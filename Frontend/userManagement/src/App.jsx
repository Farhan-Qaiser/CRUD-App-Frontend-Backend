import { useState,useEffect } from "react"
import axios from 'axios'

const API_URL = 'hhttp://localhost:3000/users'

function App() {
    const fertchUsers = async () => {
        const response = await axios.get(API_URL)
        const content = response.data
        
    }

    return (
        <>
            <h1>CRUD Application</h1>
        </>
    )
}

export default App
