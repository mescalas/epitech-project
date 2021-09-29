import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getCurrentYear } from "../../utils/utils";
import { getUserPaiements } from "../../utils/getRequests";

import { Icon } from "@iconify/react";
import crossIcon from "@iconify/icons-akar-icons/cross";
import edit16Filled from "@iconify/icons-fluent/edit-16-filled";
import deleteIcon from "@iconify/icons-mdi/delete";

export default function PaymentCard({
    id,
    index,
    name,
    creditcardNumber,
    creditcardExpiration,
    paymentsCards,
    setPaymentsCards,
    userData,
}) {
    const [showModale, setShowModale] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const token = localStorage.getItem("SESSID");
    const formLabel = ["Nom", "Numéro de carte"];
    const CreditcardExpirationMonth =
        paymentsCards[index].creditcardExpiration.split("/")[0];
    const CreditcardExpirationYear =
        paymentsCards[index].creditcardExpiration.split("/")[1];

    function onSubmit(data) {
        if (data.CreditcardExpirationYear < getCurrentYear()) {
            alert("Entrez une année valide.");
            return;
        }

        if (
            parseInt(data.CreditcardExpirationMonth, 10) > "0" + 12 ||
            parseInt(data.CreditcardExpirationMonth, 10) < 1
        ) {
            alert("Entrez un mois valide.");
            return;
        }

        const CreditcardExpiration =
            data.CreditcardExpirationYear +
            "/" +
            data.CreditcardExpirationMonth;

        axios
            .put(
                "http://127.0.0.1:8000/api/payment_method",
                {
                    fullname: data.fullname,
                    creditcardNumber: data.creditcardNumber,
                    creditcardExpiration: CreditcardExpiration,
                    id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                getUserPaiements(userData.username)
                    .then((result) => {
                        alert("Moyen de paiement modifié");
                        setShowModale(!showModale);
                        setPaymentsCards(result.data[0].paymentMethods);
                    })
                    .catch((error) => {});
            })
            .catch((error) => {
                alert("Une errreur est survenue.");
            });
    }

    function handleDelete() {
        axios
            .delete("http://127.0.0.1:8000/api/payment_method", {
                data: {
                    id: [id],
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                alert("Moyen de paiement supprimé.");
                let pc = [...paymentsCards];
                pc.splice(index, 1);
                setPaymentsCards(pc);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="relative border border-yellow-600 hover:border-yellow-700 sm:w-96 sm:mx-2 my-2 p-2 h-36 rounded-md bg-white text-gray-700 shadow-md w-full">
                <div>
                    <h1 className="text-xl font-bold text-yellow-600">
                        {name}
                    </h1>
                    <p>
                        {creditcardNumber} <br />
                        {creditcardExpiration}
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-3 flex flex-col">
                    <button type="button">
                        <Icon
                            icon={edit16Filled}
                            height="30"
                            className={`text-gray-300 hover:text-yellow-700 mb-2`}
                            onClick={() => {
                                setShowModale(!showModale);
                                document.body.style.position = "fixed";
                            }}
                        />
                    </button>
                    <button type="button">
                        <Icon
                            icon={deleteIcon}
                            height="30"
                            className={`text-gray-300 hover:text-yellow-700`}
                            onClick={() => handleDelete()}
                        />
                    </button>
                </div>
            </div>
            {showModale && (
                <div
                    className={
                        " bg-black bg-opacity-80 flex justify-center items-center absolute z-50 left-0 top-0 w-screen h-screen"
                    }
                >
                    <div className="bg-gray-100 flex flex-col items-center p-4 absolute rounded-sm border-2 border-yellow-600">
                        <h1 className="mb-10 text-xl">
                            {" "}
                            Modifier un moyen de paiement{" "}
                        </h1>
                        <div className="absolute right-0 top-0 p-4">
                            <Icon
                                icon={crossIcon}
                                style={{ height: 25, width: 25 }}
                                className={`text-gray-300 hover:text-yellow-700 mb-2`}
                                onClick={() => {
                                    setShowModale(!showModale);
                                    document.body.style.position = "";
                                }}
                            />
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col"
                        >
                            {Object.keys(paymentsCards[index])
                                .splice(1, 2)
                                .map((key, indexMap) => (
                                    <div
                                        className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start"
                                        key={index}
                                    >
                                        <label
                                            for={key}
                                            className="w-64 font-bold font-gray text-center sm:text-left"
                                        >
                                            {formLabel[indexMap]}
                                        </label>
                                        <input
                                            {...register(key)}
                                            type="text"
                                            name={key}
                                            defaultValue={
                                                paymentsCards[index][key]
                                            }
                                            className="input"
                                        />
                                        {setValue(
                                            key,
                                            paymentsCards[index][key]
                                        )}
                                    </div>
                                ))}
                            <div className="                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start ">
                                <label
                                    htmlFor="creditcard_expiration"
                                    className="w-64 font-bold font-gray text-center sm:text-left "
                                >
                                    Date d'expiration
                                </label>
                                <input
                                    {...register("CreditcardExpirationYear")}
                                    name="CreditcardExpirationYear"
                                    type="text"
                                    id="CreditcardExpirationYear"
                                    placeholder="AAAA"
                                    pattern="[0-9]{4}"
                                    defaultValue={CreditcardExpirationMonth}
                                    required
                                    className="block w-1/4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                />
                                <input
                                    {...register("CreditcardExpirationMonth")}
                                    name="CreditcardExpirationMonth"
                                    type="text"
                                    id="CreditcardExpiration"
                                    placeholder="MM"
                                    pattern="[0-9]{2}"
                                    maxLength="2"
                                    defaultValue={CreditcardExpirationYear}
                                    required
                                    className="block w-1/4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-md my-4 mx-auto"
                            >
                                Modifier
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
