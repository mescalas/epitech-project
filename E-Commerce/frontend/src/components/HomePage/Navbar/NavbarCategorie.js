import React, { useState, useEffect } from 'react';
import NavbarComposants from './NavbarComposants'

const {
    showMenu,
    hiddenMenu, 
    getOngletActif
} = require('../../utils/events')

export default function NavbarCategorie ({name, subCategory}) {
    const [ongletActif, setOngletActif] = useState(false);
    
    return (
            <li className=" w-full list-none h-full text-xl text-white" onMouseOver={() => setOngletActif(name)} onMouseLeave={() => setOngletActif(false)}>
                <a href={"/" + name} className="w-full h-full flex justify-center items-center font-body text-xl md:text-xl text-orange p-2 border-r-2 border-orange"> 
                    {name} 
                </a>
                <NavbarComposants ongletActif={ongletActif} name={name} setOngletActif={setOngletActif} subCategory={subCategory} />
            </li>

    )
}