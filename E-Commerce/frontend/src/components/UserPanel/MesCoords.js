import axios from "axios";
import { React, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

export default function MesCoords({ userData }) {
    const tab = "coordonnées";
    const params = useParams();
    const tabActif = params.tabActif;
    const token = localStorage.getItem("SESSID");
    const { register, handleSubmit } = useForm();
    const [warningEmail, setWarningEmail] = useState({
        type: "",
        message: "",
    });
    const [warningPassword, setWarningPassword] = useState({
        type: "",
        message: "",
    });

    function onSubmitEmail(data) {
        setWarningEmail({});
        axios
            .put(
                "http://127.0.0.1:8000/api/user",
                {
                    email: userData.username,
                    newEmail: data.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                localStorage.clear();
                setWarningEmail({
                    type: "valid",
                    message:
                        "Adresse e-mail modifiée. Vous allez être rédirigé(e).",
                });

                setTimeout(() => {
                    window.location.href = "/login";
                }, 5000);
            })
            .catch((error) => {
                setWarningEmail({
                    type: "error",
                    message: "L'adresse e-mail doit être différente.",
                });
                console.log(error);
            });
    }

    function onSubmitPassword(data) {
        setWarningPassword({});
        if (!check(data.newPassword, data.passwordConfirm)) {
            setWarningPassword({
                type: "error",
                message: "Les mots de passes ne correspondent pas.",
            });
            return;
        }

        axios
            .put(
                "http://127.0.0.1:8000/api/user",
                {
                    email: userData.username,
                    password: data.password,
                    newPassword: data.newPassword,
                    passwordConfirm: data.passwordConfirm,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                setWarningPassword({
                    type: "valid",
                    message: "Votre mot de passe a bien été modifié",
                });

                setTimeout(() => {
                    setWarningPassword({});
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function check(value1, value2) {
        if (value1 !== value2) {
            return false;
        }
        return true;
    }

    return (
        <div className={`mx-8 my-4 ${tabActif === tab ? "block" : "hidden"}`}>
            <h1 className="text-xl text-yellow-600 text-center m-4">
                MES IDENTIFIANTS
            </h1>
            <div className="flex items-center justify-center sm:justify-start py-8 border-b-2 border-t-2">
                <form
                    className="sm:w-full flex flex-col sm:flex-row sm:justify-between"
                    onSubmit={handleSubmit(onSubmitEmail)}
                >
                    <div className="flex flex-col justify-center items-center sm:flex-row">
                        <label className="w-64 font-bold font-gray text-center sm:text-left">
                            {" "}
                            Adresse e-mail{" "}
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            name="email"
                            className={`input ${
                                warningEmail === "error" &&
                                "border border-red-500"
                            }`}
                            defaultValue={userData.username}
                            required
                        ></input>
                    </div>
                    {warningEmail.type === "valid" && (
                        <div className="text-center p-2 rounded-sm mx-2 border border-green-500 text-green-500 bg-green-100 my-4 sm:my-0">
                            {" "}
                            {warningEmail.message}{" "}
                        </div>
                    )}
                    {warningEmail.type === "error" && (
                        <span className="text-center p-2 rounded-sm mx-2 border border-red-500 text-red-500 bg-red-100 my-4 sm:my-0">
                            {" "}
                            {warningEmail.message}{" "}
                        </span>
                    )}
                    <div className="text-center ml-4 mt-4 sm:mt-0">
                        <button type="submit" className="btn-md">
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
            <div className=" bg-gray-100 py-8 border-b-2">
                <h1 className="font-gray text-xl font-bold mb-8 text-center sm:text-left">
                    {" "}
                    CHANGER DE MOT DE PASSE{" "}
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmitPassword)}
                    className="sm:w-full"
                >
                    <div className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start">
                        <label className="w-64 font-bold font-gray text-center sm:text-left">
                            {" "}
                            Mot de passe actuel{" "}
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            name="password"
                            className={`input ${
                                warningPassword.type === "error" &&
                                "border-2 border-red-500"
                            }`}
                            required
                        ></input>
                    </div>
                    <div className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start">
                        <label className="w-64 font-bold font-gray text-center sm:text-left">
                            {" "}
                            Nouveau mot de passe{" "}
                        </label>
                        <input
                            {...register("newPassword")}
                            name="newPassword"
                            type="password"
                            className={`input ${
                                warningPassword.type === "error" &&
                                "border-2 border-red-500"
                            }`}
                            required
                        ></input>
                    </div>
                    <div className="mb-4 flex flex-col justify-center items-center sm:flex-row sm:justify-start">
                        <label className="w-64 font-bold font-gray text-center sm:text-left">
                            {" "}
                            Confirmer le nouveau mot de passe{" "}
                        </label>
                        <input
                            {...register("passwordConfirm")}
                            name="passwordConfirm"
                            type="password"
                            className={`input ${
                                warningPassword.type === "error" &&
                                "border-2 border-red-500"
                            }`}
                            required
                        ></input>
                        {warningPassword.type === "valid" && (
                            <div
                                className={`text-center p-2 rounded-sm mx-2 border border-green-500 text-green-500 bg-green-100  ${
                                    warningPassword.type === "valid"
                                        ? "block"
                                        : "hidden"
                                }`}
                            >
                                {warningPassword.message}
                            </div>
                        )}
                        {warningPassword.type === "error" && (
                            <span className="text-center p-2 rounded-sm mx-2 border border-red-500 text-red-500 bg-red-100 ">
                                {" "}
                                {warningPassword.message}{" "}
                            </span>
                        )}
                    </div>
                    <div className="text-center mt-8">
                        <button type="submit" className="btn-md">
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
