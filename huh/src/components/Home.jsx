import { react, useEffect, useState } from "react"
import { logout } from "../components/auth"
import { db, auth } from "../config/firebase"
import HomeCreateProperty from "./HomeCreateProperty"
import HomePropertyList from "./HomePropertyList"
import Navbar from "./Navbar"
import "../App.css"


export const Home = (props) => {
    const { onSubmitHouse, setNewHousingAddress, setNewBedrooms, setNewBathrooms, 
            handleCheckbox, newHousingAddress, newBedrooms, newBathrooms, 
            newPetsAllowed, setNewPetsAllowed, housingList, deleteHouse, logout } = props

    return (
        <>
            <div>
                <Navbar {...props} />
            </div>
            
            <div>
                <HomePropertyList {...props} />
            </div>
        </>
    )
}

