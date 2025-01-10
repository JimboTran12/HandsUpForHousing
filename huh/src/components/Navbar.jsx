import React from 'react'

export default function Navbar({ logout }) {
  return (
    <nav className="navbar">
        <h2> Hand Up Housing </h2>
        <div className="links">
            <a href="/">Home</a>
            <a href="/create">New Property</a>
            <button onClick={logout}> Log Out </button>
        </div>
    </nav>
  )
}
