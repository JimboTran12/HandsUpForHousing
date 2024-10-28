import { auth } from "../config/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch(err) {
            setError("Invalid email or password")
        }
    }

    const createUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch(err) {
            console.error(err)
        }
    }


    return ( 
        <div>
            <h1>Hand Up Housing</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit"> Log In</button>
            </form>
        </div>
    );
};

export const logout = async () => {
    try {
        await signOut(auth)
    } catch(err) {
        console.error(err)
    }
}