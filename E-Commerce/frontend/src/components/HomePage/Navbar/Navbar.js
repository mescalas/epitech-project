import { React, useEffect, useState } from 'react';
import NavbarCategorie from './NavbarCategorie';
import NavbarComposants from './NavbarComposants';
const axios = require('axios').default;

export default function Navbar () {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/category/')
        .then(response => {
            setCategories(response.data)
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {
    
        })
    }, [])

    return (
        <header className="">
            <div className="">
                <ul className="flex items-center h-full"> 
                    {categories.map((categorie, index) => (
                        <NavbarCategorie name={categorie.name} key={index} subCategory={categorie.subCategories}/>
                    ))}
                </ul>
            </div>
        </header>
    )
}