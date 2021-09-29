import React from 'react'
import { Link } from "react-router-dom"

export default function ProductSheet ({productSelected}) {

    return (
        <div className=" w-full text-gray-700 p-2 h-70vh bg-gray-100 border-yellow-500 overflow-x-hidden hidden lg:block">
            <div className="w-full flex justify-center m-2 h-64">
                <img 
                    src={`http://127.0.0.1:8000/${productSelected.productImages[0].image}`} 
                    alt="image_produit" 
                />
            </div>
            <h1 className="font-bold"> 
                {productSelected.name}
            </h1>
            <p className="h-28">
                {Object.keys(productSelected.characteristic).splice(0, 4).map(k => (
                    <span key={productSelected.characteristic.id}> {k} {productSelected.characteristic[k]} - </span>
                ))}
            </p>
            <div className=" flex justify-center m-2 text-md mt-6 ">
                <Link to={`product/${productSelected.id}`} className="btn-md" target="_blank">
                    Fiche produit
                </Link>
            </div>
        </div>
    )
}