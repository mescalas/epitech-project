import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../Header/Index";
import jwt_decode from "jwt-decode";
import Footer from "../Footer/Footer";
import { substractPercentage } from "../../utils/utils";

const serialize = require("form-serialize-improved");

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function phonenumber(number) {
    let phoneno = /^\d{10}$/;
    return phoneno.test(number);
}

function postcode(number) {
    let postcode = /^\d{5}$/;
    return postcode.test(number);
}

export default function Example() {
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState("");
    const [Products, setProducts] = useState([]);
    const [Cart, setCart] = useState({});
    const [Price, setPrice] = useState(0);
    const [SelectQuantity, setSelectQuantity] = useState([]);
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
            if (JSON.stringify(UserCookie) !== JSON.stringify(Cart)) {
                setCart(UserCookie);
            }
        } else {
            window.location.href = "/panier";
        }

        if (localStorage.getItem("SESSID")) {
            let token = localStorage.getItem("SESSID");
            let decoded_token = jwt_decode(token);
            setUser(decoded_token.username);
            setConnected(true);
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
        if (Object.size(UserCookie) === 0) window.location.href = "/";
        cookie.set("UserCart", UserCookie, {
            path: "/",
            expires: new Date(Date.now() + 4 * 3600 * 1000),
        });
        setCart(UserCookie);
    }
    function submitForm(e) {
        e.preventDefault();
        let form = document.getElementById("id-form");
        var obj = serialize(form, { hash: true });
        Object.keys(obj).forEach(
            (k) => (obj[k] = typeof obj[k] == "string" ? obj[k].trim() : obj[k])
        );

        let flag = true;
        if (user !== "") {
            obj.user = user;

            if (!obj.user || !validateEmail(obj.user)) {
                document
                    .getElementById("email")
                    .classList.add("border-red-500", "bg-red-100");
                flag = false;
            } else {
                document
                    .getElementById("email")
                    .classList.remove("border-red-500", "bg-red-100");
                localStorage.setItem("orderEmail", obj.user);
            }
        } else {
            if (!obj.email || !validateEmail(obj.email)) {
                document
                    .getElementById("email")
                    .classList.add("border-red-500", "bg-red-100");
                flag = false;
            } else {
                document
                    .getElementById("email")
                    .classList.remove("border-red-500", "bg-red-100");
                localStorage.setItem("orderEmail", obj.email);
            }
        }

        if (!obj.fullname) {
            document
                .getElementById("fullname")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("fullname")
                .classList.remove("border-red-500", "bg-red-100");
        }

        if (!obj.address1) {
            document
                .getElementById("address1")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("address1")
                .classList.remove("border-red-500", "bg-red-100");
        }

        if (!obj.city) {
            document
                .getElementById("city")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("city")
                .classList.remove("border-red-500", "bg-red-100");
        }

        if (!obj.postcode || !postcode(obj.postcode)) {
            document
                .getElementById("postcode")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("postcode")
                .classList.remove("border-red-500", "bg-red-100");
            obj.postcode = Number(obj.postcode);
        }

        if (!obj.phone || !phonenumber(obj.phone)) {
            document
                .getElementById("phone")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("phone")
                .classList.remove("border-red-500", "bg-red-100");
        }
        console.log(obj);
        if (flag) {
            axios
                .post("http://localhost:8000/address", obj)
                .then((res) => {
                    let orderAddress = res.data;
                    localStorage.setItem("orderAddress", orderAddress);
                    window.location.href = `/panier/checkout/delivery/`;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="bg-gray-50 font-body mt-10">
            <Header />
            <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    <h1 className="sr-only">Checkout</h1>

                    <form
                        id="id-form"
                        method="POST"
                        className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
                    >
                        <div>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Information de contact
                                </h2>

                                <div className="mt-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Adresse Mail
                                    </label>
                                    {connected ? (
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={user}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange focus:outline-none caret-orange p-2 sm:text-sm"
                                                disabled
                                                required
                                            />
                                        </div>
                                    ) : (
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                pattern="/\S+@\S+\.\S+/"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange focus:outline-none caret-orange p-2 sm:text-sm"
                                                required
                                            />
                                            <p className="text-lg font-medium text-gray-900 mt-5 text-center">
                                                ou
                                            </p>
                                            <button
                                                type="button"
                                                className="mt-5 w-full bg-orange border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-darkorange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-lightorange"
                                                onClick={(e) => {
                                                    window.location.href =
                                                        "/login";
                                                }}
                                            >
                                                Se connecter
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Informations de livraison
                                </h2>

                                <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-2 gap-x-4">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="fullname"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Prénom et Nom
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="fullname"
                                                name="fullname"
                                                autoComplete="family-name"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="address1"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Adresse
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="address1"
                                                id="address1"
                                                autoComplete="street-address"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange focus:outline-none caret-orange p-2 sm:text-sm"
                                                required
                                                maxlength="35"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="address2"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Autre informations...
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="address2"
                                                id="address2"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange focus:outline-none caret-orange p-2 sm:text-sm"
                                                maxlength="35"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Pays
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="country"
                                                name="country"
                                                autoComplete="country"
                                                value="France"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                                disabled
                                            ></input>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ville
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="postcode"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Code Postal
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="postcode"
                                                id="postcode"
                                                max="5"
                                                required
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Numéro de téléphone
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                required
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="mt-10 lg:mt-0">
                            <h2 className="text-lg font-medium text-gray-900">
                                Votre commande
                            </h2>

                            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <h3 className="sr-only">
                                    Produit dans votre panier
                                </h3>
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200"
                                >
                                    {Products.map((product) => (
                                        <li
                                            key={product.id}
                                            className="flex py-6 px-4 sm:px-6"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        "http://localhost:8000/" +
                                                        product.productImages[0]
                                                            .image
                                                    }
                                                    alt="image_product"
                                                    className="w-20 rounded-md"
                                                />
                                            </div>

                                            <div className="ml-6 flex-1 flex flex-col">
                                                <div className="flex">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-sm">
                                                            <a
                                                                href={`/product/${product.id}`}
                                                                className="font-medium text-gray-700 hover:text-gray-800 hover:underline"
                                                            >
                                                                {product.name}
                                                            </a>
                                                        </h4>
                                                    </div>

                                                    <div className="ml-4 flex-shrink-0 flow-root">
                                                        <button
                                                            type="button"
                                                            className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                                            onClick={() => {
                                                                deleteProduct(
                                                                    product.id
                                                                );
                                                            }}
                                                        >
                                                            <span className="sr-only">
                                                                Supprimer
                                                            </span>
                                                            <TrashIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex-1 pt-2 flex items-end justify-between">
                                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                                        {product.discount
                                                            ? substractPercentage(
                                                                  product.price,
                                                                  product.discount
                                                              )
                                                            : product.price}{" "}
                                                        €
                                                    </p>

                                                    <div className="ml-4">
                                                        <label
                                                            htmlFor="quantity"
                                                            className="sr-only"
                                                        >
                                                            Quantité
                                                        </label>
                                                        <select
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
                                                            className="rounded-md border border-gray-300 text-base font-medium text-gray-700 bg-gray-100 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-orange focus:border-orange p-1 sm:text-sm"
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
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Sous-total</dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {Price} €
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">
                                            Frais de port
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            0 €
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-base font-medium">
                                            Total
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {Price} €
                                        </dd>
                                    </div>
                                </dl>

                                <div
                                    className="border-t border-gray-200 py-6 px-4 sm:px-6"
                                    id="submit-button"
                                >
                                    <button
                                        type="submit"
                                        className="w-full bg-orange border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-darkorange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-lightorange"
                                        onClick={(e) => {
                                            submitForm(e);
                                        }}
                                    >
                                        Procéder au paiement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
