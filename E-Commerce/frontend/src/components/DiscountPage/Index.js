import React, { useEffect, useState } from "react";
import Index from "../Header/Index";
import axios from "axios";
import { CookieCart } from "../CookieCart/Index";
import { substractPercentage } from "../../utils/utils";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

export default function Discount() {
    const [Discount, setDiscount] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:8000/product/filter", {
                discount: true,
            })
            .then((res) => {
                setDiscount(res.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    return (
        <div>
            <Index />
            <div className="bg-gray-100 font-body min-h-screen mt-16">
                <h1 className="font-title text-2xl lg:ml-16 py-5">
                    Articles en promotions
                </h1>
                <div className="mt-2 pb-5">
                    <table className="table-auto border-collapse w-90vw m-auto pb-5">
                        <thead className="hidden md:table-row-group">
                            <tr>
                                <th className="">Marque</th>
                                <th className="">Nom</th>
                                <th className="">Ancien prix</th>
                                <th className="">Nouveau prix</th>
                                <th className="">Quantité</th>
                                <th className="">Panier</th>
                            </tr>
                        </thead>
                        <tbody className="w-screen bg-white border border-gray-200 divide-y">
                            {Discount.map((item, i) => (
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
                                    <td className="flex md:table-cell text-center justify-end mr-5">
                                        <p className="float-left font-title text-3xl md:-mt-5 line-through">
                                            {item.price}{" "}
                                            <span className="text-xl">€</span>
                                        </p>
                                    </td>
                                    <td className="flex md:table-cell text-center justify-end mr-5">
                                        <p className="float-left font-title text-4xl md:-mt-5">
                                            {substractPercentage(
                                                item.price,
                                                item.discount
                                            )}{" "}
                                            <span className="text-xl">€</span>
                                        </p>
                                    </td>
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
            <ScrollUpButton />
        </div>
    );
}
