import React, { useState } from 'react'
import { validateLoginUser } from '../services/UserService'

const UserLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginUser(e) {
        e.preventDefault();

        const user = {username, password}
        console.log(user)

        validateLoginUser(user).then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div>
            <h2>Login</h2>
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

                <button onClick={loginUser}>Submit</button>
            </form>
        </div>
    )

 }

 export default UserLogin