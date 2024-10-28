import { useState, useEffect } from 'react'
import './App.css'
import { Auth } from "./components/auth"
import { Home } from "./components/Home"
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { auth } from "./config/firebase"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user)
    })
    return unsubscribe
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" /> : <Auth />
            }
          />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
