import {React, useState} from 'react'

export default function Tab (props) {

    const [showModale, setShowModale] = useState()

    return (
        <div 
            className="p-4 border border-gray-500 my-2"
            onClick={() => setShowModale(!showModale)}
        >
            {props.subCategory.name}
        </div>
    )
}