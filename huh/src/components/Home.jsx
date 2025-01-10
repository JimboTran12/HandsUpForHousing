import { react, useEffect, useState } from "react"
import { logout } from "../components/auth"
import { db, auth } from "../config/firebase"
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import HomeCreateProperty from "./HomeCreateProperty"
import HomePropertyList from "./HomePropertyList"


export const Home = () => {
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
            setHousingList((prevList) => prevList.filter((house) => house.id !== id))

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
        <>
            <div>
                <h2> Home Page </h2>
                <button onClick={logout}> Log Out </button>
            </div>

            
            <div>
                <HomeCreateProperty onSubmitHouse={onSubmitHouse} setNewHousingAddress={setNewHousingAddress}
                setNewBedrooms={setNewBedrooms} setNewBathrooms={setNewBathrooms} handleCheckbox={handleCheckbox} 
                newHousingAddress={newHousingAddress} newBedrooms={newBedrooms} newBathrooms={newBathrooms} 
                newPetsAllowed={newPetsAllowed} setNewPetsAllowed={setNewPetsAllowed} />
            </div>

            
            <div>
                <HomePropertyList housingList={housingList} deleteHouse={deleteHouse} />
            </div>
        </>
    )
}

