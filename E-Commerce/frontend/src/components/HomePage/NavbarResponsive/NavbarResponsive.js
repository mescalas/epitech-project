import React from 'react';

export default function NavbarResponsive ({showMenuRes, categories}) {
    return (
        <div className={`absolute left-0 top-24 ${showMenuRes ? "" : "hidden"}`}>
            <ul>
                {categories.map((categorie, index) => (
                    <li>
                        {categorie}
                    </li>
                ))}
            </ul>
        </div>
    )
}