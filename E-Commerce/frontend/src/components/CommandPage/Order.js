import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import Header from "../Header/Index";
import axios from "axios";
import Footer from "../Footer/Footer";
import { substractPercentage } from "../../utils/utils";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function cancelOrder(ref, orderID) {
    axios
        .delete(`http://localhost:8000/order`, {
            data: ref,
        })
        .then((res) => {
            axios
                .delete(`http://localhost:8000/orderItem`, {
                    data: orderID,
                })
                .then((res) => {
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

export default function Order() {
    const { ref } = useParams();
    const [OrderInfo, setOrderInfo] = useState([]);
    const [Products, setProducts] = useState(null);
    const [OrderID, setOrderID] = useState(0);
    const [step, setStep] = useState(0);
    const [OrderDate, setOrderDate] = useState(null);
    const [UpdateDateOrder, setUpdatedDateOrder] = useState(null);
    const [ShippingPrice, setShippingPrice] = useState(0);
    const [AddressInfo, setAddressInfo] = useState([]);
    const [Price, setPrice] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [cancel, setCancel] = useState(false);
    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    useEffect(() => {
        let orderID = null;
        let product = null;
        let addressID = null;
        let productsTemp = [];
        let priceTemp = 0;
        let TotalPrice = 0;

        async function fetchAllData(ref) {
            await axios
                .get(`http://localhost:8000/order/${ref}`)
                .then((res) => {
                    setOrderInfo(res.data);
                    switch (res.data.status) {
                        case "En cours de préparation":
                            setStep(0);
                            setCancel(true);
                            break;
                        case "Expédié":
                            setStep(1);
                            break;
                        case "En cours de livraison":
                            setStep(2);
                            break;
                        case "Livré":
                            setStep(3);
                            break;
                    }
                    addressID = res.data.addressId;
                    let OrderDate = new Date(res.data.createdAt);
                    let date = "";
                    var options = { month: "long" };
                    date =
                        OrderDate.getDate() +
                        " " +
                        new Intl.DateTimeFormat("fr-FR", options).format(
                            OrderDate
                        ) +
                        " " +
                        OrderDate.getFullYear();
                    setOrderDate(date);

                    let UpdateOrderDate = new Date(res.data.updatedAt);
                    let updatedDate = "";
                    var options = { month: "long" };
                    updatedDate =
                        UpdateOrderDate.getDate() +
                        " " +
                        new Intl.DateTimeFormat("fr-FR", options).format(
                            UpdateOrderDate
                        ) +
                        " " +
                        UpdateOrderDate.getFullYear();
                    setUpdatedDateOrder(updatedDate);
                    orderID = res.data.id;
                })
                .catch((error) => {
                    window.location.href = "/";
                    console.log(error);
                });

            await axios
                .get(`http://localhost:8000/address/${addressID}`)
                .then((res) => {
                    setAddressInfo(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            await axios
                .get(`http://localhost:8000/orderItem/${orderID}`)
                .then((res) => {
                    setShippingPrice(res.data.shippingPrice);
                    setOrderID(res.data);
                    product = res.data.products;
                    for (const [key, value] of Object.entries(
                        res.data.products
                    )) {
                        if (res.data.currentDiscount[key]) {
                            priceTemp +=
                                substractPercentage(
                                    res.data.currentPrice[key],
                                    res.data.currentDiscount[key]
                                ) * Number(value);
                        } else {
                            priceTemp +=
                                Number(res.data.currentPrice[key]) *
                                Number(value);
                        }
                    }

                    TotalPrice =
                        Number(priceTemp) + Number(res.data.shippingPrice);
                })
                .catch((error) => {
                    console.log(error);
                });

            for (const [key, value] of Object.entries(product)) {
                await axios
                    .get(`http://localhost:8000/product/${key}`)
                    .then((res) => {
                        productsTemp[res.data.id] = res.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            setPrice(priceTemp);
            setTotalPrice(TotalPrice.toFixed(2));
            setProducts(productsTemp);
        }
        fetchAllData(ref);
    }, []);

    return (
        <div className="bg-gray-50 font-body mt-10">
            <Header />
            <main className="max-w-2xl mx-auto pt-8 pb-12 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
                    <div className="flex sm:items-baseline sm:space-x-4">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            Commande #{ref}
                        </h1>
                    </div>
                    <p className="text-sm text-gray-600">
                        Commande effectuée le {OrderDate}
                    </p>
                </div>

                {/* Products */}
                <section aria-labelledby="products-heading" className="mt-6">
                    <h2 id="products-heading" className="sr-only">
                        Produit(s) Acheté(s)
                    </h2>

                    <div className="space-y-8">
                        {Products
                            ? Products.map((product) => (
                                  <div
                                      key={product.id}
                                      className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
                                  >
                                      <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                                          <div className="sm:flex lg:col-span-10">
                                              <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                                                  <img
                                                      src={
                                                          "http://localhost:8000/" +
                                                          product
                                                              .productImages[0]
                                                              .image
                                                      }
                                                      alt="image_product"
                                                      className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                                                  />
                                              </div>

                                              <div className="mt-6 sm:mt-0 sm:ml-6">
                                                  <h3 className="text-base font-medium text-gray-900">
                                                      <a href={product.href}>
                                                          {product.name}
                                                      </a>
                                                  </h3>
                                                  <p className="mt-2 text-sm font-medium text-gray-900">
                                                      {substractPercentage(
                                                          product.price,
                                                          product.discount
                                                      )}{" "}
                                                      €
                                                  </p>
                                                  <p className="mt-2 text-sm font-medium text-gray-900">
                                                      Quantité :{" "}
                                                      {
                                                          OrderID.products[
                                                              product.id
                                                          ]
                                                      }
                                                  </p>
                                                  <p className="mt-3 text-sm text-gray-500">
                                                      {product.description}
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : "loading"}
                        <div className="mt-6 lg:mt-0 lg:col-span-5">
                            <dl className="grid grid-cols-2 gap-x-6 text-sm m-3">
                                <div>
                                    <dt className="font-medium text-gray-900">
                                        Adresse de livraison
                                    </dt>
                                    <dd className="mt-3 text-gray-500">
                                        <span className="block">
                                            {AddressInfo.fullname}
                                        </span>
                                        <span className="block">
                                            {AddressInfo.address1}
                                        </span>
                                        <span className="block">
                                            {AddressInfo.postcode}
                                        </span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-900">
                                        Mises à jour sur l’expédition
                                    </dt>
                                    <dd className="mt-3 text-gray-500 space-y-3">
                                        <p>{OrderInfo.userId}</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                            <h4 className="sr-only">Status</h4>
                            <p className="text-sm font-medium text-gray-900">
                                {OrderInfo.status} le {UpdateDateOrder}
                            </p>
                            <div className="mt-6" aria-hidden="true">
                                <div className="bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-2 bg-orange rounded-full"
                                        style={{
                                            width: `calc((${step} * 2 + 1) / 8 * 100%)`,
                                        }}
                                    />
                                </div>
                                <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                                    <div className="text-orange">
                                        Commande passée
                                    </div>
                                    <div
                                        className={classNames(
                                            step > 0 ? "text-orange" : "",
                                            "text-center"
                                        )}
                                    >
                                        Expédiée
                                    </div>
                                    <div
                                        className={classNames(
                                            step > 1 ? "text-orange" : "",
                                            "text-center"
                                        )}
                                    >
                                        En cours de livraison
                                    </div>
                                    <div
                                        className={classNames(
                                            step > 2 ? "text-orange" : "",
                                            "text-right"
                                        )}
                                    >
                                        Livrée
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Billing */}
                <section aria-labelledby="summary-heading" className="mt-8">
                    <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8">
                        <dl className="divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
                            <div className="pb-4 flex items-center justify-between">
                                <dt className="text-gray-600">Sous-total</dt>
                                <dd className="font-medium text-gray-900">
                                    {Price} €
                                </dd>
                            </div>
                            <div className="py-4 flex items-center justify-between">
                                <dt className="text-gray-600">Frais de port</dt>
                                <dd className="font-medium text-gray-900">
                                    {ShippingPrice} €
                                </dd>
                            </div>
                            <div className="pt-4 flex items-center justify-between">
                                <dt className="font-medium text-gray-900">
                                    Total
                                </dt>
                                <dd className="font-medium text-orange">
                                    {TotalPrice} €
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>

                {cancel ? (
                    <button
                        type="button"
                        className="text-red-600 m-3"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Annuler ma commande
                    </button>
                ) : null}

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
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                                Annuler ma commande
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Êtes-vous sûr de vouloir
                                                    annuler votre commande ?
                                                    Cette action est
                                                    irréversible.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                setOpen(false);
                                                cancelOrder(
                                                    ref,
                                                    OrderID.orderId
                                                );
                                            }}
                                        >
                                            Confirmer
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </main>
            <Footer />
        </div>
    );
}
