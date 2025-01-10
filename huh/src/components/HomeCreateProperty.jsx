import React from 'react'

export default function HomeCreateProperty(props) {
    const { onSubmitHouse, setNewHousingAddress, setNewBedrooms, setNewBathrooms, handleCheckbox, newHousingAddress,
            newBedrooms, newBathrooms, newPetsAllowed } = props

    return (
        <div className="createListing">
            <input placeholder="House Address" value={newHousingAddress} onChange={(e) => setNewHousingAddress(e.target.value)} />
            <input placeholder="Bedroooms" value={newBedrooms} type="number" onChange={(e) => setNewBedrooms(Number(e.target.value))} />
            <input placeholder="Bathrooms" value={newBathrooms} type="number" onChange={(e) => setNewBathrooms(Number(e.target.value))} />
            <label>Pets Allowed <input type="checkbox" checked={newPetsAllowed} onChange={handleCheckbox} /></label>
            <button onClick={() => {onSubmitHouse()}}> Submit House </button>
        </div>
    )
}
