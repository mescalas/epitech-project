import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid";
import axios from "axios";
import Header from "../Header/Index";
import Footer from "../Footer/Footer";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

export default function Index() {
    const { id } = useParams();

    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/category/${id}`)
            .then((res) => {
                setCategory(res.data.name);
                setSubCategory(res.data.subCategories);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <Header />
            <div className="bg-gray-100 ">
                <nav
                    className="flex ml-5 md:ml-10 pt-10"
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
                                <p className="ml-4 text-sm font-medium text-gray-500 hover:cursor-default">
                                    {category}
                                </p>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="w-90vw m-auto mt-10 md:flex md:flex-wrap">
                    {subCategory.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col text-center align-center md:w-31p m-auto bg-white rounded mb-10 cursor-pointer shadow-md"
                            onClick={() => {
                                window.location.href = `/subcategory/${item.id}`;
                            }}
                        >
                            <h1 className="m-5 font-body font-bold text-3xl pb-2 border-b border-orange">
                                {item.name}
                            </h1>
                            <img
                                src={"data:image/png;base64," + item.image}
                                alt="image_product"
                                className="m-auto mt-5 mb-5 w-40"
                            />
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
            <ScrollUpButton />
        </div>
    );
}
