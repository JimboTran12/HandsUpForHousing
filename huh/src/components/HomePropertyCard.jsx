import React from 'react'

export default function HomePropertyCard(props) {
    const { house, deleteHouse } = props

    const allowedPets = house.pets ? "Yes" : "No"

    return (
        <div>
            <h2>{house.address}</h2>
            <p> Bedrooms: {house.bedrooms}</p>
            <p> Bathrooms: {house.bathrooms}</p>
            <p> Pets Allowed: {allowedPets}</p>

            <button onClick={() => deleteHouse(house.id)}> Delete House</button>

        </div>
    )
}
