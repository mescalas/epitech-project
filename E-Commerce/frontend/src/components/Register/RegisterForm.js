import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Index from "../Header/Index";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleChange(e) {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("http://127.0.0.1:8000/register", {
                email: email,
                password: password,
            })
            .then((res) => {
                setSuccessMessage("Compte créé avec succès!");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            })
            .catch((error) => {
                console.log(error);
                //adresse mail déjà prise
            });
    }

    return (
        <>
            <Index />
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">
                                    Créer mon compte
                                </h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <form
                                    onSubmit={(e) => handleSubmit(e)}
                                    className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                                >
                                    <div className="relative">
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => handleChange(e)}
                                            required="required"
                                            placeholder="Email"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => handleChange(e)}
                                            required="required"
                                            placeholder="Mot de passe"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        />
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="submit"
                                            className="bg-yellow-500 text-white rounded-md px-2 py-1"
                                        >
                                            S'inscrire
                                        </button>
                                    </div>
                                    {successMessage && (
                                        <span className="bg-green-200 flex items-center font-medium tracking-wide text-green-500 text-xs mt-1 py-3 px-3 rounded-lg">
                                            {" "}
                                            {successMessage}{" "}
                                        </span>
                                    )}
                                </form>
                                <div className="relative border-none">
                                    <Link to="/login">
                                        <button className="bg-yellow-500 text-white rounded-md px-2 py-1">
                                            Se connecter
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
