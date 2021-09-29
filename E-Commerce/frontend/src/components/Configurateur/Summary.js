import React, { useState } from "react";
import { CookieCart } from "../CookieCart/Index";
import { TrashIcon } from "@heroicons/react/solid";

export default function Summary({ panier, setPanier }) {
    const getTotalPrice = () => {
        let sum = 0;
        panier.map((product) => (sum += product.price));
        return sum.toFixed(2);
    };

    const removeItem = (index) => {
        let items = [...panier];
        items.splice(index, 1);
        setPanier(items);
    };

    const validerPanier = () => {
        panier.forEach((product) => {
            CookieCart(product.id);
        });
    };

    const viderPanier = () => {
        if (
            window.confirm("Etes vous sûr de vouloir supprimer votre config ?")
        ) {
            setPanier([]);
        }
    };

    const [recap, setRecap] = useState();

    const showRecap = (bool) => {
        let recapBloc = document.querySelector("#recap");
        let listItems = document.querySelector("#listItems");

        if (bool) {
            recapBloc.style.height = "100%";
            listItems.style.display = "block";
            recapBloc.style.transitionDuration = "0.5s";
        } else {
            recapBloc.style.height = "8%";
            listItems.style.display = "none";
            recapBloc.style.transitionDuration = "0.5s";
        }
    };

    return (
        <div
            className={`text-gray-700 absolute bottom-0 right-0 z-40 w-full h-full bg-gray-100 overflow-scroll overflow-x-hidden`}
            style={{ height: "10%" }}
            id="recap"
            onMouseLeave={() => {
                showRecap(false);
                setRecap(false);
            }}
        >
            <h1
                className="text-center text-yellow-500 font-bold p-4 border-t border-b border-yellow-500 text-xl cursor-pointer bg-gray-700"
                onMouseEnter={() => {
                    showRecap(true);
                    setRecap(true);
                }}
            >
                Récapitulatif
            </h1>
            <div id="listItems" className="p-2 hidden">
                {panier && (
                    <ul className="my-2">
                        {panier.map((product, index) => (
                            <li
                                className="flex justify-between items-center py-2"
                                key={product.id}
                            >
                                <div className="flex items-center w-96 ">
                                    <img
                                        src={`http://127.0.0.1:8000/${product.productImages[0].image}`}
                                        alt="toto"
                                        className="h-20 w-20"
                                    />
                                    <span> {product.name} </span>
                                </div>
                                <span> {product.price} € </span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-between w-full border-t border-yellow-500 font-bold text-lg py-2">
                    <span> TOTAL : </span>
                    <span> {getTotalPrice()} € </span>
                </div>
                <div className="flex justify-center my-4">
                    <button
                        className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white duration-200 p-2 rounded-md font-bold mx-2"
                        onClick={() => validerPanier()}
                    >
                        Ajouter au panier
                    </button>
                    <button
                        className="border flex items-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-200 p-2 rounded-md font-bold mx-2"
                        onClick={() => viderPanier()}
                    >
                        <TrashIcon className="h-6 w-6" />
                        Vider la sélection
                    </button>
                </div>
            </div>
        </div>
    );
}
