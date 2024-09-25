import { useState,useEffect } from "react"
import axios from 'axios'

const API_URL = 'hhttp://localhost:3000/users'

function App() {

    const [users, setusers] = useState([]);
    const [newUser, setnewUser] = useState("");
    const [updatedUser, setupdatedUser] = useState({id:"",name:''});


    const fertchUsers = async () => {
        const response = await axios.get(API_URL)
        const content = response.data
        setusers(content.data)
    }

    useEffect(() => {
        fertchUsers()
    }, []);


    const addUser = () => {
        axios.post(API_URL, {
            name: newUser,
        })
        .then(response => {
            setusers([...users, response.data])
            setnewUser("")
            fertchUsers()
        }).catch(err => console.log(err))
    }

    const updatingUserBID = (id) => {
        axios.put(`${API_URL}/${id}`, {
            name: updatedUser.name
        })
        .then(response => {
            setusers(users.map(user => user.id === id ? response.data : user))
            setupdatedUser({id:"",name:""})
            fertchUsers()
        }).catch(err => console.log(err))
    }

    return (
        <>
            <h1>User Management</h1>
            <input type="text" value={newUser} onChange={(e) => setnewUser(e.target.value)}/>
            <button onClick={addUser}>Add User</button>

            {updatedUser.id && (
                <div>
                    <input type="text" value={updatedUser.name} onChange={(e) => setupdatedUser({...updatedUser, name: e.target.value})} placeholder="Update User Name" />
                    <button onClick={() => updatingUserBID(updatedUser.id)}>Update User</button>
                </div>
            )}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                        <button onClick={() => setupdatedUser({id:user.id, name:user.name})}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
