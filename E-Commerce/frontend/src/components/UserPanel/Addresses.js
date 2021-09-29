import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import AddressCard from "./AddressCard";
import axios from "axios";

import { Icon } from "@iconify/react";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import crossIcon from "@iconify/icons-akar-icons/cross";

import { getUserAdresses } from "../../utils/getRequests";

export default function Addresses({ userData }) {
    const tab = "adresses";
    const params = useParams();
    const tabActif = params.tabActif;
    const token = localStorage.getItem("SESSID");
    const { register, handleSubmit } = useForm();
    const [addresses, setAddresses] = useState();
    const [showCreateModale, setShowCreateModale] = useState(false);
    const formLabel = [
        "Nom",
        "Adresse",
        "Complément d'adresse",
        "Ville",
        "Code postal",
        "Téléphone",
    ];

    useEffect(() => {
        getUserAdresses(userData.username)
            .then((result) => {
                setAddresses(result.data[0].addresses);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onSubmit(data) {
        axios
            .post(
                "http://127.0.0.1:8000/address",
                {
                    user: userData.username,
                    fullname: data.input0,
                    address1: data.input1,
                    address2: data.input2,
                    postCode: parseInt(data.input4),
                    city: data.input4,
                    phone: data.input5,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("Adresse ajoutée.");
                document.body.style.position = "";
                getUserAdresses(userData.username).then((result) => {
                    setShowCreateModale(!showCreateModale);
                    setAddresses(result.data[0].addresses);
                });
            })
            .catch((error) => {
                alert("Une erreur est survenue.");
                console.log(error);
            });
    }

    return (
        <div className={`sm:mx-8 my-4 ${tabActif == tab ? "block" : "hidden"}`}>
            <h1 className="text-xl text-yellow-600 text-center m-4">
                MES ADRESSES
            </h1>
            <div className="flex flex-wrap items-center justify-center px-auto py-8 border-b-2 border-t-2">
                <div className="sm:flex justify-center flex-wrap w-full p-6">
                    {addresses &&
                        addresses.map((address, index) => (
                            <AddressCard
                                id={address.id}
                                indexCard={index}
                                fullName={address.fullname}
                                address={address.address1}
                                address2={address.address2}
                                city={address.city}
                                phone={address.phone}
                                postCode={address.postcode}
                                setAddresses={setAddresses}
                                addresses={addresses}
                                key={index}
                                userData={userData}
                            />
                        ))}
                    <div className="relative sm:mx-2 border-2 border-yellow-600 sm:w-96 my-2 h-44 rounded-md bg-white text-gray-700 shadow-md w-full opacity-50 hover:opacity-100">
                        <button
                            type="button"
                            className="w-full h-full flex justify-center items-center"
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
                        <h1 className="mb-10 text-xl"> Ajouter une adresse </h1>
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
                            className="flex flex-col"
                        >
                            {formLabel.map((label, index) => (
                                <div
                                    className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start"
                                    key={index}
                                >
                                    <label
                                        for={"input" + index}
                                        className="w-64 font-bold font-gray text-center sm:text-left"
                                    >
                                        {label}
                                    </label>
                                    <input
                                        {...register("input" + index)}
                                        type="text"
                                        name={"input" + index}
                                        className="input"
                                    />
                                </div>
                            ))}
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
