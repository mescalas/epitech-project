import { React } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function ModalDiscount({ productsSelected, setShowModale }) {
    const token = localStorage.getItem("SESSID");

    const { register, handleSubmit } = useForm();

    function submitDiscount(data) {
        axios
            .put(
                "http://localhost:8000/api/discount",
                {
                    id: productsSelected,
                    discount: data.discount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("La promotion a bien été modifié.");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div
            className={`bg-modale w-screen h-full absolute bg-black bg-opacity-80 z-50`}
        >
            <div className="modale p-4 text-center rounded-md mx-auto flex h-screen">
                <div className="p-8 my-auto bg-gray-700 mx-auto">
                    <form
                        onSubmit={handleSubmit(submitDiscount)}
                        className="flex flex-col"
                    >
                        <select className="p-2">
                            <option>Pourcentage</option>
                        </select>
                        <label htmlFor="discount" className="text-white my-2">
                            {" "}
                            Saisir un montant :
                        </label>
                        <input
                            {...register("discount")}
                            type="number"
                            className="input my-2"
                            max="100"
                            required
                        />
                        <button className="btn-md"> Valider </button>
                        <button
                            type="button"
                            onClick={() => setShowModale(false)}
                            className="btn-md bg-gray-600 my-2"
                        >
                            Annuler
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
