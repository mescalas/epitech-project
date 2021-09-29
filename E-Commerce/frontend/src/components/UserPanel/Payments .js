import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import PaymentCard from "./PaymentCard";
import axios from "axios";

import { Icon } from "@iconify/react";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import crossIcon from "@iconify/icons-akar-icons/cross";

import { getUserPaiements } from "../../utils/getRequests";
import { getCurrentYear } from "../../utils/utils";

export default function Payments({ userData }) {
    const tab = "paiements";
    const params = useParams();
    const tabActif = params.tabActif;
    const token = localStorage.getItem("SESSID");
    const { register, handleSubmit } = useForm();
    const formLabel = ["Nom", "Numéro de carte"];

    const [paymentsCards, setPaymentsCards] = useState();
    const [showCreateModale, setShowCreateModale] = useState(false);

    useEffect(() => {
        getUserPaiements(userData.username)
            .then((result) => {
                setPaymentsCards(result.data[0].paymentMethods);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
            .post(
                "http://127.0.0.1:8000/api/payment_method",
                {
                    fullname: data.input0,
                    creditcardNumber: data.input1,
                    creditcardExpiration: CreditcardExpiration,
                    user: userData.username,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("Moyen de paiement ajouté.");
                document.body.style.position = "";
                getUserPaiements(userData.username)
                    .then((result) => {
                        setShowCreateModale(!showCreateModale);
                        setPaymentsCards(result.data[0].paymentMethods);
                    })
                    .catch((error) => {
                        alert("Une erreur est survenue.");
                    });
            })
            .catch((error) => {});
    }

    return (
        <div className={`sm:mx-8 my-4 ${tabActif == tab ? "block" : "hidden"}`}>
            <h1 className="text-xl text-yellow-600 text-center m-4">
                MES MOYENS DE PAIEMENTS
            </h1>
            <div className="flex flex-wrap items-center justify-center px-auto py-8 border-b-2 border-t-2">
                <div className="sm:flex justify-center flex-wrap w-full p-4">
                    {paymentsCards &&
                        paymentsCards.map((card, index) => (
                            <PaymentCard
                                id={card.id}
                                key={card.id}
                                index={index}
                                name={card.fullname}
                                creditcardNumber={card.creditcardNumber}
                                creditcardExpiration={card.creditcardExpiration}
                                paymentsCards={paymentsCards}
                                setPaymentsCards={setPaymentsCards}
                                userData={userData}
                            />
                        ))}
                    <div className="relative border-2 border-yellow-600 sm:w-96 sm:mx-2 my-2 p-2 h-36 rounded-md bg-white text-gray-700 shadow-md w-full opacity-50 hover:opacity-100">
                        <button
                            type="button"
                            className="w-full h-full flex justify-center"
                            onClick={() => {
                                setShowCreateModale(!showCreateModale);
                                document.body.style.position = "fixed";
                            }}
                        >
                            <Icon
                                icon={plusCircleOutlined}
                                className="w-32 h-32"
                            />
                        </button>
                    </div>
                </div>
            </div>
            {showCreateModale && (
                <div
                    className={
                        " bg-black bg-opacity-80 flex justify-center items-center absolute z-50 left-0 top-0 w-screen h-screen"
                    }
                >
                    <div className="bg-gray-100 flex flex-col items-center p-4 absolute rounded-sm border-2 border-yellow-600">
                        <h1 className="mb-10 text-xl">
                            {" "}
                            Ajouter un moyen de paiement{" "}
                        </h1>
                        <div className="absolute right-0 top-0 p-4">
                            <Icon
                                icon={crossIcon}
                                style={{ height: 25, width: 25 }}
                                className={`text-gray-300 hover:text-yellow-700 mb-2`}
                                onClick={() => {
                                    setShowCreateModale(!showCreateModale);
                                    document.body.style.position = "";
                                }}
                            />
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col w-96"
                        >
                            {formLabel.map((label, index) => (
                                <div
                                    className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start"
                                    key={index}
                                >
                                    <label
                                        for={"input" + index}
                                        className="w-1/2 font-bold font-gray text-center sm:text-left"
                                    >
                                        {label}
                                    </label>
                                    <input
                                        {...register("input" + index)}
                                        type="text"
                                        name={"input" + index}
                                        className="block w-1/2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                    />
                                </div>
                            ))}
                            <div className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start ">
                                <label
                                    htmlFor="creditcard_expiration"
                                    className="w-1/2 font-bold font-gray text-center sm:text-left "
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
                                    required
                                    className="block w-1/4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-orange caret-orange p-2 sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-md my-4 mx-auto"
                            >
                                Valider
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
