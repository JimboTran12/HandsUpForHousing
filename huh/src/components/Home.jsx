import { react } from "react"
import { logout } from "../components/auth"

export const Home = () => {
    return (
        <div>
            <h2> Home Page </h2>
            <button onClick={logout}> Log Out </button>
        </div>
    )
}

