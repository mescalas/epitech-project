import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OrdersPage() {
    let [searchProduct, setSearchProduct] = useState();
    let token = localStorage.getItem("SESSID");

    useEffect(() => {
        axios
            .get(
                "http://127.0.0.1:8000/api/category",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.role[0] === "ROLE_USER") {
                    window.location.href = "/404";
                }
            })
            .catch((error) => {
                console.log(error);
                window.location.href = "/404";
            });
    }, [token]);

    useEffect(() => {
        axios
            .get(
                "http://127.0.0.1:8000/api/category/",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            })
            .then(() => {});
    }, [token]);

    function handleSubmit() {
        axios
            .post("", {
                search: searchProduct,
            })
            .then((result) => {})
            .catch((error) => [console.log(error)])
            .then({});
    }

    /**
     *
     * @param {event} e
     * Met à jour le tableau de valeurs des élements sélectionné par l'admin
     */
    function handleSelect(e) {
        let selected = [];
        document.querySelectorAll("tr input").forEach((checkbox) => {
            let row = checkbox.parentNode.parentNode;
            let values = [];
            if (checkbox.checked) {
                row.classList.add("bg-green-100");
                selected.push(values); //push l'id suffit, puis l'envoyer au back
            } else if (
                !checkbox.checked &&
                row.classList.contains("bg-green-100")
            ) {
                row.classList.remove("bg-green-100");
            }
        });
    }

    return (
        <div className="mycontainer">
            <ul className="flex rounded-t-md">
                <li className="mr-10 text-center rounded-t-md bg-gray-600 p-4 text-xl">
                    <Link to="/admin"> Article </Link>
                </li>
                <li className="mr-10 text-center rounded-t-md bg-gray-600 p-4 text-xl">
                    <Link to="/categories"> Catégories </Link>
                </li>
                <li className="mr-10 text-center rounded-t-md bg-gray-600 p-4 text-xl">
                    <Link to="/commande"> Commande </Link>
                </li>
                <li className="mr-10 text-center rounded-t-md bg-gray-600 p-4 text-xl">
                    <Link to="/client"> Client </Link>
                </li>
            </ul>
            <div className="bg-green-100 p-2">
                <form
                    method="POST"
                    onSubmit={() => handleSubmit()}
                    className=""
                >
                    <input
                        type="search"
                        placeholder="Recherche par nom, référence..."
                        className="p-2"
                        onChange={(e) => setSearchProduct(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="text-center bg-indigo-200 m-4 rounded-md p-2"
                    >
                        Rechercher
                    </button>
                    <div className="flex">
                        <button className="text-center bg-indigo-200 rounded-md">
                            Ajouter
                        </button>
                        <button className="text-center bg-indigo-200 mx-4 p-3 rounded-md">
                            Modifier
                        </button>
                        <button className="text-center bg-indigo-200 p-3 rounded-md">
                            Supprimer
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <table className="border-2">
                    <thead>
                        <tr>
                            <td>CommandePage</td>
                            <td>Sous-catégorie</td>
                            <td>Marque</td>
                            <td>Prix</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p1">Composant</td>
                            <td className="p1">Catégorie</td>
                            <td className="p1">MSI</td>
                            <td className="p1">300</td>
                            <td className="p1">
                                <input
                                    type="checkbox"
                                    onClick={(e) => handleSelect(e)}
                                    className="p1"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
