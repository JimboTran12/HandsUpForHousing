import { useState, useEffect } from 'react'
import './App.css'
import { Auth, logout } from "./components/auth"
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import { Home } from "./components/Home"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { db, auth } from "./config/firebase"
import HomeCreateProperty from './components/HomeCreateProperty'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user)
    })
    return unsubscribe
  }, [])

  const [housingList, setHousingList] = useState([])

  // New house states
  const [newHousingAddress, setNewHousingAddress] = useState("")
  const [newBedrooms, setNewBedrooms] = useState(null)
  const [newBathrooms, setNewBathrooms] = useState(null)
  const [newPetsAllowed, setNewPetsAllowed] = useState(false)

  const housingCollectionRef = collection(db, "housing")

  const getHousingList = async () => {
    // Read the date
    // Set housing list
    try {
      const data = await getDocs(housingCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHousingList(filteredData)
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getHousingList()
  }, []);

  const deleteHouse = async (id) => {
    try {
      // Optimistically update state
      setHousingList((prevList) => prevList.filter((house) => house.id !== id))

      // Delete listing from database
      const houseDoc = doc(db, "housing", id)
      await deleteDoc(houseDoc)
    } catch (err) {
      console.error("Error deleting property listing", error)
    }
  };

  const onSubmitHouse = async () => {
    try {
      await addDoc(housingCollectionRef, {
        address: newHousingAddress,
        bedrooms: newBedrooms,
        bathrooms: newBathrooms,
        pets: newPetsAllowed,
        userId: auth?.currentUser?.uid,
      });
      getHousingList()

      // Reset input fields subsequent to submission
      setNewHousingAddress("");
      setNewBedrooms("");
      setNewBathrooms("");
      setNewPetsAllowed(false);
    } catch (err) {
      console.err(err)
    }
  }

  const handleCheckbox = (e) => {
    setNewPetsAllowed(e.target.checked)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              isAuthenticated ? <Home onSubmitHouse={onSubmitHouse} setNewHousingAddress={setNewHousingAddress}
              setNewBedrooms={setNewBedrooms} setNewBathrooms={setNewBathrooms} handleCheckbox={handleCheckbox} 
              newHousingAddress={newHousingAddress} newBedrooms={newBedrooms} newBathrooms={newBathrooms} 
              newPetsAllowed={newPetsAllowed} setNewPetsAllowed={setNewPetsAllowed} housingList={housingList} 
              deleteHouse={deleteHouse} logout={logout}/> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? <HomeCreateProperty onSubmitHouse={onSubmitHouse} setNewHousingAddress={setNewHousingAddress}
              setNewBedrooms={setNewBedrooms} setNewBathrooms={setNewBathrooms} handleCheckbox={handleCheckbox} 
              newHousingAddress={newHousingAddress} newBedrooms={newBedrooms} newBathrooms={newBathrooms} 
              newPetsAllowed={newPetsAllowed} setNewPetsAllowed={setNewPetsAllowed} logout={logout}/> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <Auth />
            }
          />
          <Route
            path="*"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <Auth />
            }
          />
        </Routes>
      </Router>

    </div>
  )
}

export default App
