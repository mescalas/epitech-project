import React, { useEffect, useState } from "react";
import axios from "axios";
import { CookieCart } from "../CookieCart/Index";
import { substractPercentage } from "../../utils/utils";

export default function Promo() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");

    useEffect(() => {
        axios
            .post("http://localhost:8000/product/filter", { discount: true })
            .then((res) => {
                let products_length = res.data.length;
                let random_number = Math.floor(Math.random() * products_length);
                setName(res.data[random_number].name);
                setDescription(res.data[random_number].description);
                setId(res.data[random_number].id);
                setImage(res.data[random_number].productImages[0].image);
                setPrice(res.data[random_number].price);
                setDiscountPrice(res.data[random_number].discount);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="bg-gray-100 pt-10 pb-20 font-body">
            <div className="ml-16 w-50vw pt-14 border-b border-black mb-12">
                <h1 className="font-title font-bold text-3xl md:text-5xl text-black pb-2">
                    Promotion
                </h1>
            </div>
            <div className="bg-white w-90vw pt-10 pb-10 m-auto flex flex-col-reverse lg:flex-row lg:flex-nowrap items-center">
                <div className="h-full w-full m-auto lg:m-0 lg:w-1/2 flex flex-col">
                    <div className="w-4/5 m-auto mb-10">
                        <h1
                            className="font-body font-bold text-3xl mb-5 hover:underline hover:cursor-pointer"
                            onClick={() => {
                                window.location.href = `/product/${id}`;
                            }}
                        >
                            {name}
                        </h1>
                        <p className="font-body text-sm">{description}</p>
                    </div>
                    <div className="w-4/5 m-auto lg:mb-0">
                        <div>
                            <p className="text-sm">Au prix de</p>
                            <p className="font-title text-4xl text-yellow-600 font-bold">{substractPercentage(price,discountPrice)} €</p>
                        </div>
                            <p className="text-sm mt-2">Au lieu de {price} €</p>
                        <input
                            onClick={() => CookieCart(id)}
                            className="mt-3 p-5 rounded-xl cursor-pointer text-white font-bold bg-yellow-600 lg:float-right md:float-right transition duration-500 ease-in-out hover:bg-orange transform hover:-translate-1 hover:scale-110"
                            type="button"
                            id={id}
                            value="Ajouter au panier"
                        />
                    </div>
                </div>
                <div className="h-full mb-7 lg:mb-0 w-10/12 lg:w-1/2 flex justify-center">
                    <img
                        src={"http://127.0.0.1:8000/" + image}
                        alt="image_product"
                        className="md:w-60"
                    />
                </div>
            </div>
        </div>
    );
}
