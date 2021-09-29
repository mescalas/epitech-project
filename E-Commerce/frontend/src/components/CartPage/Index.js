import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import Header from "../Header/Index";
import Cookies from "universal-cookie";
import axios from "axios";
import { substractPercentage } from "../../utils/utils";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

export default function Example() {
    const [Products, setProducts] = useState([]);
    const [Cart, setCart] = useState({});
    const [Price, setPrice] = useState(0);
    const [SelectQuantity, setSelectQuantity] = useState([]);
    let Cart_Quantity = 0;
    let SelectQuantity_Temp = [];
    let Cart_Temp = {};
    let Price_Temp = 0;
    let Products_Temp = [];

    let cookie = new Cookies();

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    useEffect(() => {
        if (cookie.get("UserCart")) {
            const UserCookie = cookie.get("UserCart");
            Cart_Quantity = Object.size(UserCookie);
            if (JSON.stringify(UserCookie) !== JSON.stringify(Cart)) {
                setCart(UserCookie);
            }
        }
    }, []);

    useEffect(() => {
        if (Object.size(Cart) > 0) {
            async function fetchData() {
                for (const [key, value] of Object.entries(Cart)) {
                    await axios
                        .get(`http://localhost:8000/product/${key}`)
                        .then((res) => {
                            res.data.cart_quantity = value;
                            Products_Temp[res.data.id] = res.data;
                            if (res.data.discount) {
                                Price_Temp +=
                                    substractPercentage(
                                        res.data.price,
                                        res.data.discount
                                    ) * Number(res.data.cart_quantity);
                            } else {
                                Price_Temp +=
                                    Number(res.data.price) *
                                    Number(res.data.cart_quantity);
                            }
                            SelectQuantity_Temp[res.data.id] =
                                res.data.cart_quantity;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                setSelectQuantity(SelectQuantity_Temp);
                setProducts(Products_Temp);
                setPrice(Price_Temp.toFixed(2));
            }
            fetchData();
        } else {
            setProducts([]);
            setPrice(0);
        }
    }, [Cart]);

    function handleChange(e, id) {
        let User_Cookie = cookie.get("UserCart");
        User_Cookie[id] = e.target.value;
        SelectQuantity_Temp[id] = Number(e.target.value);
        setSelectQuantity(SelectQuantity_Temp);
        Cart_Temp[id] = Number(e.target.value);

        cookie.set("UserCart", User_Cookie, {
            path: "/",
            expires: new Date(Date.now() + 4 * 3600 * 1000),
        });
        setCart(User_Cookie);
    }

    function deleteProduct(id) {
        let UserCookie = cookie.get("UserCart");
        delete UserCookie[id];
        cookie.set("UserCart", UserCookie, {
            path: "/",
            expires: new Date(Date.now() + 4 * 3600 * 1000),
        });
        setCart(UserCookie);
    }

    return (
        <div className="bg-white mt-10">
            <Header />
            {Products.length > 0 ? (
                <div className="md:w-70vw max-w-2xl mx-auto py-6 px-4 sm:py-12 sm:px-6 lg:px-0">
                    <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
                        Votre panier
                    </h1>

                    <form className="mt-12">
                        <section aria-labelledby="cart-heading">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul
                                role="list"
                                className="border-t border-b border-gray-200 divide-y divide-gray-200"
                            >
                                {Products.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={
                                                    "http://localhost:8000/" +
                                                    product.productImages[0]
                                                        .image
                                                }
                                                alt="image_product"
                                                className="w-24 h-24 border rounded-md object-center object-cover sm:w-32 sm:h-32"
                                            />
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h4 className="text-sm">
                                                        <p
                                                            className="font-medium text-gray-700 hover:text-gray-800 hover:underline hover:cursor-pointer text-2xl"
                                                            onClick={() => {
                                                                window.location.href = `/product/${product.id}`;
                                                            }}
                                                        >
                                                            {product.name}
                                                        </p>
                                                        <select
                                                            id={`quantity-${product.id}`}
                                                            name={`quantity-${product.id}`}
                                                            value={
                                                                SelectQuantity[
                                                                    product.id
                                                                ]
                                                            }
                                                            onChange={(e) => {
                                                                handleChange(
                                                                    e,
                                                                    product.id
                                                                );
                                                            }}
                                                            className="mt-2 max-w-full rounded-md border border-gray-300 py-1.5 px-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-orange focus:border-orange  sm:text-sm"
                                                        >
                                                            <option value={1}>
                                                                1
                                                            </option>
                                                            <option value={2}>
                                                                2
                                                            </option>
                                                            <option value={3}>
                                                                3
                                                            </option>
                                                            <option value={4}>
                                                                4
                                                            </option>
                                                            <option value={5}>
                                                                5
                                                            </option>
                                                            <option value={6}>
                                                                6
                                                            </option>
                                                            <option value={7}>
                                                                7
                                                            </option>
                                                            <option value={8}>
                                                                8
                                                            </option>
                                                        </select>
                                                    </h4>
                                                    <p className="ml-4 font-medium text-gray-900 text-xl whitespace-nowrap">
                                                        {product.discount
                                                            ? substractPercentage(
                                                                  product.price,
                                                                  product.discount
                                                              )
                                                            : product.price}{" "}
                                                        €
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex-1 flex items-end justify-between">
                                                <p className="flex items-center text-sm text-gray-700 space-x-2">
                                                    <CheckIcon
                                                        className="flex-shrink-0 h-5 w-5 text-green-500"
                                                        aria-hidden="true"
                                                    />
                                                    <span>En stock</span>
                                                </p>
                                                <div className="ml-4">
                                                    <button
                                                        type="button"
                                                        className="text-sm font-medium text-orange hover:text-lightorange"
                                                        onClick={() => {
                                                            deleteProduct(
                                                                product.id
                                                            );
                                                        }}
                                                    >
                                                        <span>Supprimer</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-10"
                        >
                            <h2 id="summary-heading" className="sr-only">
                                Order summary
                            </h2>

                            <div>
                                <dl className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-base font-medium text-gray-900">
                                            Sous-total
                                        </dt>
                                        <dd className="ml-4 font-medium text-gray-900 text-2xl whitespace-nowrap">
                                            {Price} €
                                        </dd>
                                    </div>
                                </dl>
                                <p className="mt-1 text-sm text-gray-500">
                                    Les frais de port et les taxes sont calculés
                                    lors du paiement.
                                </p>
                            </div>

                            <div className="mt-10">
                                <button
                                    type="button"
                                    className="w-full bg-orange border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-darkorange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange"
                                    onClick={() => {
                                        window.location.href =
                                            "/panier/checkout";
                                    }}
                                >
                                    Passer au paiement
                                </button>
                            </div>

                            <div className="mt-6 text-sm text-center">
                                <p>
                                    ou{" "}
                                    <a
                                        href="/"
                                        className="text-orange font-medium hover:text-lightorange"
                                    >
                                        Continuer mes achats
                                        <span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </p>
                            </div>
                        </section>
                    </form>
                </div>
            ) : (
                <h1 className="m-20 text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
                    Votre panier est vide...
                </h1>
            )}
            <ScrollUpButton />
        </div>
    );
}
