import React, { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useParams } from "react-router-dom";
import FilterMenu from "./FilterMenu";
import Header from "../Header/Index";
import { CookieCart } from "../CookieCart/Index";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Footer from "../Footer/Footer";
import { substractPercentage } from "../../utils/utils";

export default function Index() {
    const { id } = useParams();

    const breadcrumbs = useBreadcrumbs();
    const [subCategory, setSubCategory] = useState("");
    const [Category, setCategory] = useState({});
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/subcategory/${id}`)
            .then((res) => {
                setCategory(res.data.category);
                setSubCategory(res.data.name);
                setProduct(res.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <Header />
            <div className="bg-gray-100 font-body min-h-screen">
                <nav
                    className="flex ml-5 md:ml-10 pt-20"
                    aria-label="Breadcrumb"
                >
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <div>
                                <a
                                    href="/"
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <HomeIcon
                                        className="flex-shrink-0 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Home</span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="flex-shrink-0 h-5 w-5 text-orange"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <p
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                    onClick={() => {
                                        window.location.href = `/category/${Category.id}`;
                                    }}
                                >
                                    {Category.name}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="flex-shrink-0 h-5 w-5 text-orange"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <p className="ml-4 text-sm font-medium text-gray-500 hover:cursor-default">
                                    {subCategory}
                                </p>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="flex flex-col sm:flex-row lg:mt-10 md:mt-10 mt-5 ml-5 lg:ml-10 md:ml-10">
                    <div className="z-10 mx-5">
                        <FilterMenu setProducts={setProduct} />
                    </div>
                    <table className="table-auto border-collapse w-90vw pb-5 mb-5 lg:mr-5 md:mr-5">
                        <thead className="hidden md:table-row-group">
                            <tr>
                                <th className="">Marque</th>
                                <th className="">Nom</th>
                                <th className="">Prix</th>
                                <th className="">Disponibilité</th>
                                <th className="">Quantité</th>
                                <th className="">Panier</th>
                            </tr>
                        </thead>
                        <tbody className="w-screen bg-white border border-gray-200 divide-y">
                            {Product.map((item, i) => (
                                <tr key={i} className="mb-5">
                                    <td className="flex md:table-cell text-center justify-start m-3">
                                        <p className="font-bold text-xl md:m-5">
                                            {item.brand}
                                        </p>
                                    </td>
                                    <td className="flex text-center">
                                        <img
                                            src={
                                                "http://127.0.0.1:8000/" +
                                                item.productImages[0].image
                                            }
                                            alt="image_product"
                                            className="w-32 md:m-5"
                                        />
                                        <p
                                            className="mt-10 md:m-5 md:pt-10 hover:underline hover:cursor-pointer"
                                            onClick={() => {
                                                window.location.href = `/product/${item.id}`;
                                            }}
                                        >
                                            {item.name}
                                        </p>
                                    </td>
                                    {item.discount
                                    ?<td className="flex flex-col md:table-cell text-center justify-end mr-5">
                                        <p className="font-title text-3xl md:-mt-5 text-orange">
                                        {substractPercentage(item.price,item.discount)} €
                                        </p>
                                        <span className="text-xs">au lieu de {item.price} €</span>
                                    </td>
                                    :<td className="flex md:table-cell text-center justify-end mr-5">
                                        <p className="float-left font-title text-3xl md:-mt-5">
                                            {item.price} €
                                        </p>
                                    </td>}
                                    <td className="flex md:table-cell text-center justify-end m-5 whitespace-nowrap">
                                        {item.quantity > 0 ? (
                                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                                En stock
                                            </span>
                                        ) : (
                                            <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                                Rupture de stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="flex md:table-cell text-center justify-end m-5 whitespace-nowrap">
                                        <span className="invisible md:visible lg:visible">{item.quantity}</span>
                                    </td>
                                    <td className="flex md:table-cell justify-start ml-5">
                                        {item.quantity > 0 ? (
                                            <button
                                                id={item.id}
                                                className="-mt-20 md:m-5 bg-orange p-5 w-16 h-16 rounded-full transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                                                onClick={() => {
                                                    CookieCart(item.id);
                                                }}
                                            >
                                                <i className="fas fa-cart-arrow-down text-white text-2xl w-full h-full -mt-1 -ml-1"></i>
                                            </button>
                                        ) : (
                                            <button
                                                id={item.id}
                                                className="disabled:bg-gray-100 disabled:cursor-not-allowed -mt-20 md:m-5 bg-orange p-5 w-16 h-16 rounded-full transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                                                disabled
                                            >
                                                <i className="fas fa-cart-arrow-down text-white text-2xl w-full h-full -mt-1 -ml-1"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}
