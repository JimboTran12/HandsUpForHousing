import { react, useEffect, useState } from "react"
import { logout } from "../components/auth"
import { db, auth } from "../config/firebase"
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore"


export const Home = () => {
    const [housingList, setHousingList] = useState([])

    // New house states
    const [newHousingAddress, setNewHousingAddress] = useState("")
    const [newBedrooms, setNewBedrooms] = useState(0)
    const [newBathrooms, setNewBathrooms] = useState(0)

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
        const houseDoc = doc(db, "housing", id)
        await deleteDoc(houseDoc)
    };

    const onSubmitHouse = async () => {
        try {
        await addDoc(housingCollectionRef, {
            address: newHousingAddress, 
            bedrooms: newBedrooms,
            bathrooms: newBathrooms,
            userId: auth?.currentUser?.uid, 
        });
        getHousingList()
    } catch (err) {
            console.err(err)
    }
    }

    return (
        <>
            <div>
                <h2> Home Page </h2>
                <button onClick={logout}> Log Out </button>
            </div>

            
            <div>
                <input placeholder="House address" onChange={(e) => setNewHousingAddress(e.target.value)}/>
                <input placeholder="Bedroooms" type="number" onChange={(e) => setNewBedrooms(Number(e.target.value))}/>
                <input placeholder="Bathrooms" type="number" onChange={(e) => setNewBathrooms(Number(e.target.value))}/>
                <button onClick={onSubmitHouse}> Submit House </button>
            </div>

            
            <div>
                {housingList.map((house) => (
                    <div>
                        <h2>{house.address}</h2>
                        <p> Bedrooms: {house.bedrooms}</p>
                        <p> Bathrooms: {house.bathrooms}</p>
                    
                        <button onClick={() => deleteHouse(house.id)}> Delete House</button>

                    </div>
                ))}
            </div>
        </>
    )
}

