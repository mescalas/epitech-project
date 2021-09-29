import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Categories from "./Categories";
import { substractPercentage } from "../../utils/utils";

export default function Index() {
    const [UserCookie, setUserCookie] = useState(undefined);
    const [Cart, setCart] = useState({});
    const [cartElement, setCartElement] = useState([]);
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    let username;
    let role;
    let cartQuantity = 0;
    let var1 = [];
    const cookies = new Cookies();
    const sessid = localStorage.getItem("SESSID");

    if (sessid) {
        const decoded = jwt_decode(sessid);
        username = decoded.username;
        role = decoded.roles[0];
    }

    function logOut() {
        localStorage.clear();
        window.location.href = "/";
    }

    // Fonction pour compter le nombre de clés dans un object, afin de faire le nombre total de produits dans le panier.
    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            size += obj[key];
        }
        return size;
    };

    useEffect(() => {
        setInterval(() => {
            if (cookies.get("UserCart")) setUserCookie(cookies.get("UserCart"));
        }, 1000);
    }, []);

    if (UserCookie) {
        cartQuantity = Object.size(UserCookie);
        if (JSON.stringify(UserCookie) !== JSON.stringify(Cart)) {
            setCart(UserCookie);
        }
    }

    // Barre de recherche
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/product/")
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    //si le cart est modifié alors ce useEffect est trigger, il va récupérer les infos des produits à l'aide du tableau cart.
    useEffect(() => {
        if (Object.size(Cart) > 0) {
            async function fetchData() {
                for (const [key, value] of Object.entries(Cart)) {
                    await axios
                        .get(`http://localhost:8000/product/${key}`)
                        .then((res) => {
                            res.data.cart_quantity = value;
                            var1.push(res.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                setCartElement(var1);
            }
            fetchData();
        }
    }, [Cart]);

    function deleteCart() {
        setCartElement([]);
        setCart({});
        cookies.remove("UserCart", { path: "/" });
        window.location.reload();
    }

    const user = {
        email: username,
    };

    const userNavigation = [{ name: "Mon profil", href: "/user/coordonnées" }];

    const NewUserNavigation = [
        { name: "Se connecter", href: "/login" },
        { name: "Créer un compte", href: "/register" },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <Disclosure
            as="nav"
            className="bg-gray-100 border-b border-gray-200 font-body fixed top-0 z-40 w-full"
        >
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex w-full content-center ">
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 min-w-max">
                                    <a
                                        href="/"
                                        className="border-transparent text-gray-500 hover:border-orange hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-title"
                                    >
                                        Lor'N Tech
                                    </a>
                                    <Categories />
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <input
                                        className="h-8 rounded-lg p-4 border border-gray-200 bg-gray-200 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                                        type="search"
                                        name="search"
                                        placeholder="Recherche"
                                        onChange={(event) => {
                                            setSearchTerm(event.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {role == "ROLE_ADMIN" ? (
                                    <a
                                        href="/admin/products"
                                        className="text-gray-600 text-2xl rounded-full bg-white focus:ring-2 focus:ring-offset-2 focus:ring-orange hover:ring-2 hover:ring-offset-2 hover:ring-orange items-center"
                                    >
                                        <i className="fas fa-cogs"></i>
                                    </a>
                                ) : null}
                                {/* Cart dropdown */}
                                <Menu as="div" className="ml-3 relative z-20">
                                    <div>
                                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange hover:ring-2 hover:ring-offset-2 hover:ring-orange">
                                            <span className="sr-only">
                                                Open cart menu
                                            </span>
                                            <div>
                                                <svg
                                                    className="w-8 h-8 text-gray-600 pt-1 relative"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                                </svg>
                                                {cartQuantity !== 0 ? (
                                                    <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-600 text-white text-xs">
                                                        {cartQuantity}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40vw rounded-md shadow-lg h-80 py-1 overflow-scroll overflow-x-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="divide-y">
                                                {cartElement.length !== 0
                                                    ? cartElement.map(
                                                          (item) => (
                                                              <div
                                                                  key={item.id}
                                                                  className="flex flex-nowrap p-5"
                                                              >
                                                                  <img
                                                                      src={
                                                                          "http://127.0.0.1:8000/" +
                                                                          item
                                                                              .productImages[0]
                                                                              .image
                                                                      }
                                                                      alt="image_product"
                                                                      className="w-28 h-28 border rounded p-2 mr-3"
                                                                  />
                                                                  <div className="flex flex-col">
                                                                      <h1
                                                                          className="font-bold hover:underline hover:cursor-pointer"
                                                                          onClick={() => {
                                                                              window.location.href = `/product/${item.id}`;
                                                                          }}
                                                                      >
                                                                          {
                                                                              item.name
                                                                          }
                                                                      </h1>
                                                                      <p className="text-gray-600">
                                                                          Quantité
                                                                          :{" "}
                                                                          {
                                                                              item.cart_quantity
                                                                          }
                                                                      </p>
                                                                      {item.discount ? (
                                                                          <p className="text-4xl font-title float-right w-20">
                                                                              {substractPercentage(
                                                                                  item.price,
                                                                                  item.discount
                                                                              )}
                                                                              <span className="text-sm">
                                                                                  €
                                                                              </span>
                                                                          </p>
                                                                      ) : (
                                                                          <p className="text-4xl font-title float-right w-20">
                                                                              {
                                                                                  item.price
                                                                              }
                                                                              <span className="text-sm">
                                                                                  €
                                                                              </span>
                                                                          </p>
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          )
                                                      )
                                                    : null}
                                            </div>
                                            <div>
                                                {cartQuantity !== 0 ? (
                                                    <p className="text-bold font-body ml-5 mt-3">
                                                        Produit dans le panier :{" "}
                                                        {cartQuantity}
                                                    </p>
                                                ) : (
                                                    <p className="text-bold font-title text-xl text-center m-5">
                                                        Votre panier est vide
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="m-3 p-2 bg-orange rounded-xl text-white text-xs transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                                                    onClick={() => {
                                                        window.location.href =
                                                            "/panier";
                                                    }}
                                                >
                                                    Accéder au panier
                                                </button>
                                                <button
                                                    type="button"
                                                    className="m-3 p-2 bg-orange rounded-xl text-white text-xs transition duration-500 ease-in-out active:bg-lightbrown transform active:-translate-1 active:scale-90"
                                                    onClick={() => {
                                                        deleteCart();
                                                    }}
                                                >
                                                    Vider le panier
                                                </button>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative z-20">
                                    <div>
                                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange hover:ring-2 hover:ring-offset-2 hover:ring-orange">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <svg
                                                className="w-8 h-8 text-gray-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {sessid
                                                ? userNavigation.map(
                                                      (item, i) => (
                                                          <Menu.Item key={i}>
                                                              {({ active }) => (
                                                                  <a
                                                                      href={
                                                                          item.href
                                                                      }
                                                                      className={classNames(
                                                                          active
                                                                              ? "bg-gray-100"
                                                                              : "",
                                                                          "block px-4 py-2 text-sm text-gray-700"
                                                                      )}
                                                                  >
                                                                      {
                                                                          item.name
                                                                      }
                                                                  </a>
                                                              )}
                                                          </Menu.Item>
                                                      )
                                                  )
                                                : NewUserNavigation.map(
                                                      (item, i) => (
                                                          <Menu.Item key={i}>
                                                              {({ active }) => (
                                                                  <a
                                                                      href={
                                                                          item.href
                                                                      }
                                                                      className={classNames(
                                                                          active
                                                                              ? "bg-gray-100"
                                                                              : "",
                                                                          "block px-4 py-2 text-sm text-gray-700"
                                                                      )}
                                                                  >
                                                                      {
                                                                          item.name
                                                                      }
                                                                  </a>
                                                              )}
                                                          </Menu.Item>
                                                      )
                                                  )}
                                            {sessid ? (
                                                <button
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    onClick={logOut}
                                                >
                                                    Se déconnecter
                                                </button>
                                            ) : null}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {searchTerm.length < 2 ? null : (
                        <div className="text-sm border border-gray-200 bg-gray-200">
                            {product
                                .filter((val) => {
                                    if (searchTerm === "") {
                                        return val;
                                    } else if (
                                        val.name
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                })
                                .map((p, i) => (
                                    <a key={i} href={"/product/" + p.id}>
                                        <p className="pl-2 pr-1 py-1 relative cursor-pointer hover:text-orange">
                                            {p.name}
                                        </p>
                                    </a>
                                ))}
                        </div>
                    )}

                    <Disclosure.Panel className="sm:hidden z-40">
                        <div className="pt-2 pb-3 space-y-1">
                            <a
                                href="/"
                                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Lor'N Tech
                            </a>
                            <Categories />
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="w-8 h-8 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    {sessid ? (
                                        <div className="text-sm font-medium text-gray-500">
                                            {user.email}
                                        </div>
                                    ) : (
                                        <div className="text-sm font-medium text-gray-500">
                                            Utilisateur non connecté
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        window.location.href = "/panier";
                                    }}
                                    className=" relative ml-auto flex-shrink-0 p-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange hover:ring-2 hover:ring-offset-2 hover:ring-orange"
                                >
                                    <span className="sr-only">
                                        Open cart menu
                                    </span>
                                    <div>
                                        <svg
                                            className="w-8 h-8 text-gray-600 pt-1 "
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                        </svg>
                                        {cartQuantity !== 0 ? (
                                            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-600 text-white text-xs">
                                                {cartQuantity}
                                            </div>
                                        ) : null}
                                    </div>
                                </button>
                            </div>
                            <div className="mt-3 space-y-1">
                                {sessid
                                    ? userNavigation.map((item, i) => (
                                          <a
                                              key={i}
                                              href={item.href}
                                              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                          >
                                              {item.name}
                                          </a>
                                      ))
                                    : NewUserNavigation.map((item, i) => (
                                          <a
                                              key={i}
                                              href={item.href}
                                              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                          >
                                              {item.name}
                                          </a>
                                      ))}
                                {role == "ROLE_ADMIN" ? (
                                    <a
                                        href="/admin/products"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        <span>Panneau administrateur</span>
                                    </a>
                                ) : null}
                                {sessid ? (
                                    <button
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                        onClick={logOut}
                                    >
                                        Se déconnecter
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
