import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/category/")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                return error;
            })
            .then(() => {});
    }, []);

    return (
        <footer className="text-white font-body bg-darkbrown">
            <div className="container px-5 lg:px-24 py-10 mx-auto flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
                    <a
                        className="flex font-title font-medium items-center md:justify-start justify-center text-orange"
                        href="/"
                    >
                        <span className="text-xl">Lor'N Tech</span>
                    </a>
                    <p className="mt-2 text-sm text-white">
                        Votre e-commerce de produits informatiques préféré
                    </p>
                </div>
                <div className="flex-grow flex flex-wrap -mb-10 md:text-left text-center order-first">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-title font-medium text-orange text-sm mb-3">
                            CATEGORIES
                        </h2>
                        <nav className="list-none mb-10">
                            {categories.map((categorie) => (
                                <li
                                    key={categorie.id}
                                    className="hover:underline hover:cursor-pointer"
                                >
                                    <a
                                        key={categorie.id}
                                        href={"/category/" + categorie.id}
                                        className="text-white"
                                    >
                                        {categorie.name}
                                    </a>
                                </li>
                            ))}
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-title font-medium text-orange text-sm mb-3">
                            SERVICE CLIENT
                        </h2>
                        <nav className="list-none mb-10">
                            <li className="hover:underline hover:cursor-pointer">
                                <a href="/delivery">Livraison</a>
                            </li>
                            <li className="hover:underline hover:cursor-pointer">
                                <a>Aide</a>
                            </li>
                            <li className="hover:underline hover:cursor-pointer">
                                <a>Suivi de commande</a>
                            </li>
                            <li className="hover:underline hover:cursor-pointer">
                                <a>Contactez-nous</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-title font-medium text-orange text-sm mb-3">
                            INFORMATIONS
                        </h2>
                        <nav className="list-none mb-10">
                            <li className="hover:underline hover:cursor-pointer">
                                <a>CGV</a>
                            </li>
                            <li className="hover:underline hover:cursor-pointer">
                                <a>Conditions de livraison</a>
                            </li>
                            <li className="hover:underline hover:cursor-pointer">
                                <a>
                                    Politique de protection des données
                                    personnelles
                                </a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-2 px-5 lg:px-28 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © 2021 Lor'N Tech — Tous droits réservés
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a
                            className="text-orange"
                            href="http://www.facebook.com"
                        >
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a
                            className="ml-3 text-orange"
                            href="http://www.twitter.com"
                        >
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a
                            className="ml-3 text-orange"
                            href="http://www.instagram.com"
                        >
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    width="20"
                                    height="20"
                                    x="2"
                                    y="2"
                                    rx="5"
                                    ry="5"
                                ></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a
                            className="ml-3 text-orange"
                            href="http://www.linkedin.com"
                        >
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="0"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                ></path>
                                <circle
                                    cx="4"
                                    cy="4"
                                    r="2"
                                    stroke="none"
                                ></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
