import React from 'react'
import HomePropertyCard from "./HomePropertyCard"

export default function HomePropertyList(props) {
    const { housingList, deleteHouse } = props

    return (
        <div>
            {housingList.map((house, houseIndex) => (
                <HomePropertyCard {...props} key={houseIndex} house={house} deleteHouse={deleteHouse} />              
            ))
            }
        </div>
    )
}

