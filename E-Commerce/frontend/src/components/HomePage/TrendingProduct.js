import React, { useState, useEffect } from "react";
import axios from "axios";
import { CookieCart } from "../CookieCart/Index";
import { substractPercentage } from "../../utils/utils";

export default function TrendingProduct() {
    const [nameFeatured1, setNameFeatured1] = useState("");
    const [idFeatured1, setIdFeatured1] = useState("");
    const [imageFeatured1, setImageFeatured1] = useState("");
    const [priceFeatured1, setPriceFeatured1] = useState("");
    const [discountPriceFeatured1, setDiscountPriceFeatured1] = useState("");

    const [nameFeatured2, setNameFeatured2] = useState("");
    const [idFeatured2, setIdFeatured2] = useState("");
    const [imageFeatured2, setImageFeatured2] = useState("");
    const [priceFeatured2, setPriceFeatured2] = useState("");
    const [discountPriceFeatured2, setDiscountPriceFeatured2] = useState("");

    const [nameFeatured3, setNameFeatured3] = useState("");
    const [idFeatured3, setIdFeatured3] = useState("");
    const [imageFeatured3, setImageFeatured3] = useState("");
    const [priceFeatured3, setPriceFeatured3] = useState("");
    const [discountPriceFeatured3, setDiscountPriceFeatured3] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/featured")
            .then((res) => {
                setNameFeatured1(res.data[0].name);
                setIdFeatured1(res.data[0].id);
                setImageFeatured1(res.data[0].image);
                setPriceFeatured1(res.data[0].price);
                setDiscountPriceFeatured1(res.data[0].discount);

                setNameFeatured2(res.data[1].name);
                setIdFeatured2(res.data[1].id);
                setImageFeatured2(res.data[1].image);
                setPriceFeatured2(res.data[1].price);
                setDiscountPriceFeatured2(res.data[1].discount);

                setNameFeatured3(res.data[2].name);
                setIdFeatured3(res.data[2].id);
                setImageFeatured3(res.data[2].image);
                setPriceFeatured3(res.data[2].price);
                setDiscountPriceFeatured3(res.data[2].discount);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="bg-gray-100 pt-20 pb-20">
            <div className="ml-16 w-50vw pt-14 border-b border-black mb-12">
                <h1 className="font-title font-bold text-3xl md:text-5xl text-black pb-2">
                    Produits du moment
                </h1>
            </div>
            <div className="w-90vw m-auto flex flex-col md:flex-row md:flex-nowrap justify-between">
                <div className="w-11/12 m-auto md:m-0 mb-12 md:w-31p h-full bg-white border border-gray-300 shadow-md">
                    <div className="w-4/5 h-48 m-auto mt-5 mb-5 flex justify-center">
                        <img
                            src={"http://127.0.0.1:8000/" + imageFeatured1}
                            alt="image_product"
                            className="h-full"
                        />
                    </div>
                    <div className="bg-gray-100 border-t border-gray-300">
                        <div className=" flex flex-col w-4/5 h-32 m-auto justify-start ">
                            <button
                                onClick={() => CookieCart(idFeatured1)}
                                id={idFeatured1}
                                className="float-right -mt-10 w-20 h-20 bg-orange p-5 rounded-full transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                            >
                                <i className="fas fa-cart-arrow-down text-white text-4xl pr-1"></i>
                            </button>
                            <p
                                className="font-bold text-2xl text-center mt-5 hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    window.location.href = `/product/${idFeatured1}`;
                                }}
                            >
                                {nameFeatured1}
                            </p>
                        </div>
                        {discountPriceFeatured1 > 0 ? (
                            <div className="m-auto lg:py-6 md:py-6 py-14 flex flex-col items-center">
                                <span className="font-title font-bold text-3xl text-yellow-600 lg:mb-0">
                                    {substractPercentage(
                                        priceFeatured1,
                                        discountPriceFeatured1
                                    )}{" "}
                                    €
                                </span>
                                <span className="text-sm">
                                    Au lieu de {priceFeatured1} €
                                </span>
                            </div>
                        ) : (
                            <div className="m-auto py-10 flex justify-center">
                                <p className="font-title font-bold text-3xl text-yellow-600 lg:mb-0">
                                    {priceFeatured1} €
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-11/12 m-auto md:m-0 mb-12 md:w-31p h-full bg-white border border-gray-300 shadow-md">
                    <div className="w-4/5 h-48 m-auto mt-5 mb-5 flex justify-center">
                        <img
                            src={"http://127.0.0.1:8000/" + imageFeatured2}
                            alt="image_product"
                            className="h-full"
                        />
                    </div>
                    <div className="bg-gray-100 border-t border-gray-300 ">
                        <div className="flex flex-col w-4/5 h-32 m-auto justify-start ">
                            <button
                                onClick={() => CookieCart(idFeatured2)}
                                id={idFeatured2}
                                className="float-right -mt-10 w-20 h-20 bg-orange p-5 rounded-full transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                            >
                                <i className="fas fa-cart-arrow-down text-white text-4xl pr-1"></i>
                            </button>
                            <p
                                className="font-bold text-2xl text-center mt-5 hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    window.location.href = `/product/${idFeatured2}`;
                                }}
                            >
                                {nameFeatured2}
                            </p>
                        </div>
                        {discountPriceFeatured2 > 0 ? (
                            <div className="m-auto lg:py-6 md:py-6 py-14 flex flex-col items-center">
                                <span className="font-title font-bold text-3xl text-yellow-600 lg:mb-0">
                                    {substractPercentage(
                                        priceFeatured2,
                                        discountPriceFeatured2
                                    )}{" "}
                                    €
                                </span>
                                <span className="text-sm">
                                    Au lieu de {priceFeatured2} €
                                </span>
                            </div>
                        ) : (
                            <div className="m-auto py-10 flex justify-center">
                                <p className="font-title font-bold text-3xl text-yellow-600 lg:mb-0">
                                    {priceFeatured2} €
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-11/12 m-auto md:m-0 mb-12 md:w-31p h-full bg-white border border-gray-300 shadow-md">
                    <div className="w-4/5 h-48 m-auto mt-5 mb-5 flex justify-center">
                        <img
                            src={"http://127.0.0.1:8000/" + imageFeatured3}
                            alt="image_product"
                            className="h-full"
                        />
                    </div>
                    <div className="bg-gray-100 border-t border-gray-300">
                        <div className="flex flex-col w-4/5 h-32 m-auto justify-start ">
                            <button
                                onClick={() => CookieCart(idFeatured3)}
                                id={idFeatured3}
                                className="float-right -mt-10 w-20 h-20 bg-orange p-5 rounded-full transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                            >
                                <i className="fas fa-cart-arrow-down text-white text-4xl pr-1"></i>
                            </button>
                            <p
                                className="font-bold lg:text-2xl text-xl text-center mt-5 hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    window.location.href = `/product/${idFeatured3}`;
                                }}
                            >
                                {nameFeatured3}
                            </p>
                        </div>
                        {discountPriceFeatured3 > 0 ? (
                            <div className="m-auto lg:py-6 md:py-6 py-14 flex flex-col items-center">
                                <span className="font-title font-bold text-3xl text-yellow-600 lg:mb-0">
                                    {substractPercentage(
                                        priceFeatured3,
                                        discountPriceFeatured3
                                    )}{" "}
                                    €
                                </span>
                                <span className="text-sm">
                                    Au lieu de {priceFeatured3} €
                                </span>
                            </div>
                        ) : (
                            <div className="m-auto py-10 flex justify-center">
                                <p className="font-title font-bold text-3xl text-yellow-600 lg:mb-0">
                                    {priceFeatured3} €
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
