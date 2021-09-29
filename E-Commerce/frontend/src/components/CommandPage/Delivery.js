import { Fragment, useRef, useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../Header/Index";
import jwt_decode from "jwt-decode";
import Footer from "../Footer/Footer";
import { substractPercentage } from "../../utils/utils";

const serialize = require("form-serialize-improved");

const deliveryMethods = [
    {
        id: 1,
        title: "Standard",
        turnaround: "4 à 10 jours ouvrable",
        price: "loading ...",
    },
    {
        id: 2,
        title: "Express",
        turnaround: "2 à 5 jours ouvrable",
        price: "loading ...",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function creditcard(number) {
    let creditcard = /^\d{16}$/;
    return creditcard.test(number);
}

function cvc(number) {
    let cvc = /^\d{3}$/;
    return cvc.test(number);
}

export default function Delivery() {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
        deliveryMethods[0]
    );
    const [deliveryPrice, setDeliveryPrice] = useState();
    const [Products, setProducts] = useState([]);
    const [Cart, setCart] = useState({});
    const [Price, setPrice] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(Price);
    const [SelectQuantity, setSelectQuantity] = useState([]);
    const [PricePerProduct, setPricePerProduct] = useState({});
    const [DiscountPerProduct, setDiscountPerProduct] = useState({});
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState("");
    const [UniqueID, setUniqueID] = useState(0);
    let Cart_Quantity = 0;
    let SelectQuantity_Temp = [];
    let Cart_Temp = {};
    let Price_Temp = 0;
    let Products_Temp = [];
    let weight = 0;
    let ShippingInfo = {};
    let PricePerProduct_ = {};
    let DiscountPerProduct_ = {};

    let cookie = new Cookies();

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    async function createOrder(
        order,
        Cart,
        PricePerProduct,
        uniqueID,
        deliveryPrice,
        DiscountPerProduct
    ) {
        let orderID = null;

        await axios
            .post("http://localhost:8000/order", order)
            .then((res) => {
                orderID = Number(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        let order_item = {};
        order_item.orderId = orderID;
        order_item.products = Cart;
        order_item.currentPrice = PricePerProduct;
        order_item.shippingPrice = deliveryPrice;
        order_item.currentDiscount = DiscountPerProduct;

        axios
            .post("http://localhost:8000/orderItem", order_item)
            .then(() => setOpen(true))
            .catch((err) => {
                console.log(err);
            });

        document.cookie =
            "UserCart=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    useEffect(() => {
        if (!localStorage.getItem("orderAddress"))
            window.location.href = "/404";
        if (cookie.get("UserCart")) {
            const UserCookie = cookie.get("UserCart");
            Cart_Quantity = Object.size(UserCookie);
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
                            weight += Number(res.data.weight) * value;
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
                            PricePerProduct_[res.data.id] = res.data.price;
                            SelectQuantity_Temp[res.data.id] =
                                res.data.cart_quantity;
                            DiscountPerProduct_[res.data.id] =
                                res.data.discount;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                ShippingInfo.weight = weight;
                ShippingInfo.address = Number(
                    localStorage.getItem("orderAddress")
                );
                await axios
                    .get(
                        `http://127.0.0.1:8000/shipping?id=${ShippingInfo.address}&weight=${ShippingInfo.weight}`
                    )
                    .then((res) => {
                        if (Number.isInteger(res.data)) {
                            setDeliveryPrice(res.data);
                            deliveryMethods[0].price = res.data;
                            deliveryMethods[1].price = res.data;
                        } else {
                            setDeliveryPrice(res.data[0]);
                            deliveryMethods[0].price = res.data[0];
                            deliveryMethods[1].price = res.data[1];
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                setPricePerProduct(PricePerProduct_);
                setDiscountPerProduct(DiscountPerProduct_);
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

    useEffect(() => {
        let TP = Number(deliveryPrice) + Number(Price);
        setTotalPrice(Number(TP).toFixed(2));
    }, [deliveryPrice, Price]);

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

        if (!obj.CreditcardNumber || !creditcard(obj.CreditcardNumber)) {
            document
                .getElementById("CreditcardNumber")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("CreditcardNumber")
                .classList.remove("border-red-500", "bg-red-100");
        }
        if (!obj.fullname) {
            document
                .getElementById("name_on_card")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("name_on_card")
                .classList.remove("border-red-500", "bg-red-100");
        }
        console.log(obj);
        if (!obj.CreditcardExpiration) {
            document
                .getElementById("CreditcardExpiration")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("CreditcardExpiration")
                .classList.remove("border-red-500", "bg-red-100");
        }
        if (!obj.cvc || !cvc(obj.cvc)) {
            document
                .getElementById("cvc")
                .classList.add("border-red-500", "bg-red-100");
            flag = false;
        } else {
            document
                .getElementById("cvc")
                .classList.remove("border-red-500", "bg-red-100");
        }

        delete obj.quantity;
        if (flag) {
            let order = {};
            let uniqueID = Math.floor(Math.random() * Date.now());
            setUniqueID(uniqueID);
            order.reference = uniqueID;
            order.addressId = Number(localStorage.getItem("orderAddress"));
            order.status = "En cours de préparation";
            if (connected) {
                order.userId = user;
            } else {
                let userId = localStorage.getItem("orderEmail");
                order.userId = userId;
                localStorage.removeItem("orderEmail");
            }

            if (connected) {
                let payment_info = obj;
                payment_info.user = user;
                delete payment_info.cvc;
                const token = localStorage.getItem("SESSID");

                axios
                    .post(
                        "http://localhost:8000/api/payment_method",
                        payment_info,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .catch((err) => {
                        console.log(err);
                    });
            }

            createOrder(
                order,
                Cart,
                PricePerProduct,
                uniqueID,
                deliveryPrice,
                DiscountPerProduct
            );
        }
    }

    return (
        <div className="bg-gray-50 font-body mt-10">
            <Header />
            <main className="max-w-7xl mx-auto pt-12 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    <h1 className="sr-only">Checkout</h1>

                    <form
                        id="id-form"
                        method="POST"
                        className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
                    >
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                Information de paiement
                            </h2>
                            <div className="mt-5 border-t border-gray-200 pt-10">
                                <RadioGroup
                                    value={selectedDeliveryMethod}
                                    onChange={setSelectedDeliveryMethod}
                                >
                                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                                        Méthode de livraison
                                    </RadioGroup.Label>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        {deliveryMethods.map(
                                            (deliveryMethod) => (
                                                <RadioGroup.Option
                                                    key={deliveryMethod.id}
                                                    value={deliveryMethod}
                                                    className={({
                                                        checked,
                                                        active,
                                                    }) =>
                                                        classNames(
                                                            checked
                                                                ? "border-transparent"
                                                                : "border-gray-300",
                                                            active
                                                                ? "ring-2 ring-orange"
                                                                : "",
                                                            "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                                                        )
                                                    }
                                                >
                                                    {({ checked, active }) => (
                                                        <>
                                                            <div
                                                                className="flex-1 flex"
                                                                onClick={() => {
                                                                    setDeliveryPrice(
                                                                        deliveryMethod.price
                                                                    );
                                                                }}
                                                            >
                                                                <div className="flex flex-col">
                                                                    <RadioGroup.Label
                                                                        as="span"
                                                                        className="block text-sm font-medium text-gray-900"
                                                                    >
                                                                        {
                                                                            deliveryMethod.title
                                                                        }
                                                                    </RadioGroup.Label>
                                                                    <RadioGroup.Description
                                                                        as="span"
                                                                        className="mt-1 flex items-center text-sm text-gray-500"
                                                                    >
                                                                        {
                                                                            deliveryMethod.turnaround
                                                                        }
                                                                    </RadioGroup.Description>
                                                                    <RadioGroup.Description
                                                                        as="span"
                                                                        className="mt-6 text-sm font-medium text-gray-900"
                                                                    >
                                                                        {
                                                                            deliveryMethod.price
                                                                        }{" "}
                                                                        €
                                                                    </RadioGroup.Description>
                                                                </div>
                                                            </div>
                                                            {checked ? (
                                                                <CheckCircleIcon
                                                                    className="h-5 w-5 text-orange"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : null}
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "border"
                                                                        : "border-2",
                                                                    checked
                                                                        ? "border-orange"
                                                                        : "border-transparent",
                                                                    "absolute -inset-px rounded-lg pointer-events-none"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            )
                                        )}
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Payment */}
                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Information de paiement
                                </h2>
                                <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                                    <div className="col-span-4">
                                        <label
                                            htmlFor="creditcard_number"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Numéro de carte
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="CreditcardNumber"
                                                name="CreditcardNumber"
                                                autoComplete="cc-number"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label
                                            htmlFor="name-on-card"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nom présent sur la carte
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="name_on_card"
                                                name="fullname"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3">
                                        <label
                                            htmlFor="creditcard_expiration"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Date d'expiration
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="month"
                                                name="CreditcardExpiration"
                                                id="CreditcardExpiration"
                                                min="2021-09"
                                                required
                                                className="block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="cvc"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            CVC
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="cvc"
                                                id="cvc"
                                                autoComplete="csc"
                                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange py-2 sm:text-sm"
                                                required
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
                                                            : product.price}
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
                                                            name="quantity"
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
                                                            className="rounded-md border border-gray-300 text-base font-medium bg-gray-100 text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-orange focus:border-orange p-1 sm:text-sm"
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
                                            {deliveryPrice} €
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-base font-medium">
                                            Total
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {TotalPrice} €
                                        </dd>
                                    </div>
                                </dl>

                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    {deliveryPrice === 0 ? (
                                        <button
                                            type="submit"
                                            className="w-full bg-orange border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-darkorange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-lightorange disabled:bg-gray-300"
                                            disabled
                                        >
                                            Confirmer votre achat
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="w-full bg-orange border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-darkorange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-lightorange"
                                            onClick={(e) => {
                                                submitForm(e);
                                            }}
                                        >
                                            Confirmer votre achat
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-50vw sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Paiement effectué
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Votre paiement a bien été
                                                effectué. Merci de votre achat
                                                chez Lor'N Tech !
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange text-base font-medium text-white hover:bg-darkorange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightorange sm:col-start-2 sm:text-sm"
                                        onClick={() => {
                                            setOpen(false);
                                            window.location.href = `/order/${UniqueID}`;
                                            cookie.set(
                                                "UserCart",
                                                {},
                                                {
                                                    path: "/",
                                                    expires: new Date(
                                                        Date.now() +
                                                            4 * 3600 * 1000
                                                    ),
                                                }
                                            );
                                        }}
                                    >
                                        Détails Commande
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => {
                                            setOpen(false);
                                            window.location.href = "/";
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        Accueil
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Footer />
        </div>
    );
}
