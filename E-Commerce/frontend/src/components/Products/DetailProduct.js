import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tabs from "./Tabs";
import Footer from "../Footer/Footer";
import Index from "../Header/Index";
import CarouselProductDetail from "../Carousel/CarouselProductDetail";
import { CookieCart } from "../CookieCart/Index";
import { HomeIcon } from "@heroicons/react/solid";
import { substractPercentage } from "../../utils/utils";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

export default function DetailProduct() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const description = product.description;
    const characteristics = [product.characteristic][0];
    const reviews = product.reviews;
    const [subCategory, setSubCategory] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [Category, setCategory] = useState({});

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/product/" + id)
            .then((res) => {
                setProduct(res.data);
                axios
                    .get(
                        `http://localhost:8000/subcategory/${res.data.sub_category.id}`
                    )
                    .then((res) => {
                        setCategory(res.data.category);
                        setSubCategory(res.data.name);
                        setSubCategoryId(res.data.id);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 500) {
                    window.location.href = "/404";
                    return;
                } else {
                    return err;
                }
            });
    }, [id]);

    return (
        <div>
            <Index />
            <nav className="flex ml-5 md:ml-10 pt-20" aria-label="Breadcrumb">
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
                            <p
                                className="ml-4 text-sm font-medium text-gray-500 hover:cursor-pointer"
                                onClick={() => {
                                    window.location.href = `/subcategory/${subCategoryId}`;
                                }}
                            >
                                {subCategory}
                            </p>
                        </div>
                    </li>
                </ol>
            </nav>
            <section className="text-gray-600 font-body overflow-hidden">
                <div className="container px-5 lg:py-20 md:py-20 sm:py-8 mx-auto mt-24 lg:mt-0 md:mt-0">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                        <div className="lg:w-1/2 w-full lg:pr-14 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {product.brand}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                {product.name}
                            </h1>
                            <Tabs
                                color="yellow"
                                product={product}
                                description={description}
                                characteristics={characteristics}
                                reviews={reviews}
                            />
                            <div className="flex border-t border-b mb-2 border-gray-200 py-2 justify-between">
                                <span className="text-gray-500">Poids</span>
                                <div>{product.weight} kgs</div>
                            </div>
                            <div className="flex border-t border-b mb-2 border-gray-200 py-2 justify-between">
                                <span className="text-gray-500">
                                    Disponibilité
                                </span>
                                {product.quantity > 0 ? (
                                    <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs ml-auto">
                                        En stock
                                    </span>
                                ) : (
                                    <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs ml-auto">
                                        Rupture de stock
                                    </span>
                                )}
                            </div>
                            {product.quantity < 10 ? (
                                <div className="flex border-t border-b mb-2 border-gray-200 py-2 justify-between">
                                    <span className="text-gray-500">
                                        Produits restants
                                    </span>
                                    <div>{product.quantity}</div>
                                </div>
                            ) : null}
                            {product.quantity > 0 ? (
                                <div className="flex border-t border-b mb-2 border-gray-200 py-2 justify-between">
                                    <span className="text-gray-500">
                                        Quantité
                                    </span>
                                    <div>
                                        <select className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                            ) : null}
                            <div className="flex">
                                {product.discount 
                                ?<div>
                                <p className="title-font font-medium text-2xl text-gray-900">
                                    {substractPercentage(product.price,product.discount)} €</p>
                                    <span className="text-xs">au lieu de {product.price} €</span>
                                </div>
                                :<p className="title-font font-medium text-2xl text-gray-900">
                                    {product.price}€
                                </p>
                                }
                                
                                <button
                                    onClick={() => CookieCart(product.id)}
                                    className="flex ml-auto text-white bg-yellow-500 border-0 px-6 focus:outline-none hover:bg-yellow-600 rounded items-center"
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                        <CarouselProductDetail />
                    </div>
                </div>
            </section>
            <Footer />
            <ScrollUpButton />
        </div>
    );
}
