import React, { useState } from 'react'
import { createUser } from '../services/UserService'

const UserRegister = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)

    function saveUser(e) {
        e.preventDefault();

        const user = {username, email, password, role}
        console.log(user)

        createUser(user).then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div>
            <h2>Register</h2>
            <form>
                <div>
                    <label>Username: </label>
                    <input
                        type='text'
                        placeholder='Enter username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </input>
                </div>

                <div>
                    <label>Email: </label>
                    <input
                        type='text'
                        placeholder='Enter email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <div>
                    <label>Role: </label>
                    <input
                        type='number'
                        placeholder='Enter role'
                        name='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                    </input>
                </div>

                <button onClick={saveUser}>Submit</button>
            </form>
        </div>
    )

 }

 export default UserRegister