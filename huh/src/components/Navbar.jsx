import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ logout }) {
  return (
    <nav className="navbar">
        <h2> Hand Up Housing </h2>
        <div className="links">
            <Link to="/home">Home</Link>
            <Link to="/create">New Property</Link>
            <button onClick={logout}> Log Out </button>
        </div>
    </nav>
  )
}
