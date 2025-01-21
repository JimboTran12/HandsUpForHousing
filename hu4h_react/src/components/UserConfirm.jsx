import React, { useState } from 'react'
import { adminConfirmUser } from '../services/UserService'

const UserConfirm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmUsername, setConfirmUsername] = useState('')

    function saveConfirmUser(e) {
        e.preventDefault();

        const user = {username, password, confirmUsername}
        console.log(user)

        adminConfirmUser(user).then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div>
            <h2>Confirm</h2>
            <form>
                <div>
                    <label>Admin Username: </label>
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

                <div>
                    <label>Confirm Username: </label>
                    <input
                        type='text'
                        placeholder='Enter username'
                        name='confirmUsername'
                        value={confirmUsername}
                        onChange={(e) => setConfirmUsername(e.target.value)}
                    >
                    </input>
                </div>

                <button onClick={saveConfirmUser}>Submit</button>
            </form>
        </div>
    )

 }

 export default UserConfirm