import { useState, useEffect } from "react";
import axios from 'axios';
import { TextField, Button, Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:3000/users';

function App() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState("");
    const [updatedUser, setUpdatedUser] = useState({ id: "", name: '' });

    const fetchUsers = async () => {
        const response = await axios.get(API_URL);
        const content = response.data;
        setUsers(content.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = () => {
        axios.post(API_URL, {
            name: newUser,
        })
        .then(response => {
            setUsers([...users, response.data]);
            setNewUser("");
            fetchUsers();
        }).catch(err => console.log(err));
    };

    const updateUserById = (id) => {
        axios.put(`${API_URL}/${id}`, { name: updatedUser.name })
        .then(response => {
            setUsers(users.map(user => user.id === id ? response.data : user));
            setUpdatedUser({ id: "", name: "" });
            fetchUsers();
        }).catch(err => console.log(err));
    };

    const deleteUser = (id) => {
        axios.delete(`${API_URL}/${id}`)
        .then(() => {
            setUsers(users.filter(user => user.id !== id));
            fetchUsers();
        }).catch(err => console.log(err));
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
            <Typography variant="h4" gutterBottom>User Management</Typography>

            <TextField
                label="New User"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={addUser}
                style={{ marginBottom: "20px" }}
            >
                Add User
            </Button>

            {updatedUser.id && (
                <div>
                    <TextField
                        label="Update User Name"
                        value={updatedUser.name}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => updateUserById(updatedUser.id)}
                        style={{ marginBottom: "20px" }}
                    >
                        Update User
                    </Button>
                </div>
            )}

            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => setUpdatedUser({ id: user.id, name: user.name })}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => deleteUser(user.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default App;
