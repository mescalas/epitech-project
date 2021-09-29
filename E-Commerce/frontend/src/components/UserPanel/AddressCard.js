import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Icon } from "@iconify/react";
import crossIcon from "@iconify/icons-akar-icons/cross";
import edit16Filled from "@iconify/icons-fluent/edit-16-filled";
import deleteIcon from "@iconify/icons-mdi/delete";
import { getUserAdresses } from "../../utils/getRequests";

export default function AddressCard({
    id,
    indexCard,
    fullName,
    address,
    address2,
    city,
    phone,
    postCode,
    setAddressToUpdate,
    addresses,
    setAddresses,
    userData,
}) {
    const [showModale, setShowModale] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const token = localStorage.getItem("SESSID");
    const formLabel = [
        "Nom",
        "Adresse",
        "Complément d'adresse",
        "Ville",
        "Code postal",
        "Téléphone",
    ];

    function handleDelete() {
        if (window.confirm("Etes vous sûr ?")) {
            axios
                .delete("http://127.0.0.1:8000/api/address", {
                    data: {
                        id: [id],
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((result) => {
                    alert("Adresse supprimée.");
                    let addressesList = [...addresses];
                    addressesList.splice(indexCard, 1);
                    setAddresses(addressesList);
                })
                .catch((error) => {
                    alert("Une erreur est survenue.");
                    console.log(error);
                });
        }
    }

    function onSubmit(data) {
        axios
            .put(
                "http://127.0.0.1:8000/api/address",
                {
                    id: id,
                    fullname: data.fullname,
                    address1: data.address1,
                    address2: data.address2,
                    postCode: data.postcode,
                    city: data.city,
                    phone: data.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("Adresse modifiée.");
                getUserAdresses(userData.username).then((result) => {
                    setShowModale(!showModale);
                    setAddresses(result.data[0].addresses);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="relative border border-yellow-600 sm:w-96 sm:mx-2 my-2 p-2 h-44 rounded-md bg-white text-gray-700 shadow-md w-full">
                <div>
                    <h1 className="text-xl font-bold text-yellow-600">
                        {fullName}
                    </h1>
                    <p>
                        {address} <br />
                        {address2 && <span> {address2} </span>}
                        {city} <br />
                        {postCode} <br />
                        {phone}
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-3 flex flex-col">
                    <button type="button">
                        <Icon
                            icon={edit16Filled}
                            height="30"
                            className={`text-gray-300 hover:text-yellow-600 mb-2`}
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
                            className={`text-gray-300 hover:text-yellow-600`}
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
                            Modifier une adresse{" "}
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
                            {Object.keys(addresses[indexCard])
                                .splice(1)
                                .map((key, index) => (
                                    <div
                                        className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start"
                                        key={index}
                                    >
                                        <label
                                            for={key}
                                            className="w-64 font-bold font-gray text-center sm:text-left"
                                        >
                                            {formLabel[index]}
                                        </label>
                                        <input
                                            {...register(key)}
                                            type="text"
                                            name={key}
                                            defaultValue={
                                                addresses[indexCard][key]
                                            }
                                            className="input"
                                        />
                                        {setValue(
                                            key,
                                            addresses[indexCard][key]
                                        )}
                                    </div>
                                ))}
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
