import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Navbar () {

    const params = useParams()
    const tabActif = params.tabActif
    
    const tabs = [
        {
            label: "Mes identifiants",
            link: "/user/coordonnées"
        }, 
        {
            label: "Mes commandes",
            link: "/user/orders"
        },
        {
            label: "Mes adresses",
            link: "/user/adresses"
        }, 
        {
            label: "Moyents de paiements",
            link: "/user/paiements"
        }
    ]

    return (
        <div className="mx-auto sm:w-1/3">
            <ul className="flex sm:flex-col">
                {tabs.map((tab, index) => (
                    <li className=" border border-gray-300 h-10vh relative flex flex-col justify-center w-full" key={index}>
                        <Link to={tab.link} className={`hover:border-l-8 hover:border-yellow-600 ${tab.link.split('/')[2] === tabActif && "border-l-8 border-yellow-600" } transition-colors w-full h-full align-middle text-center flex items-center justify-center`}> {tab.label} </Link> 
                    </li>
                ))}
            </ul>
        </div>
    )
}