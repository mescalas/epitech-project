import { React, useEffect, useState } from "react";
import axios from "axios";
import { getAllCategories } from "../../utils/getRequests";
import { handleSelect, selectAllCheckbox } from "../../utils/utils";
import Header from "./Header";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

export default function CategoriesPage() {
    let [categoriesSelected, setCategoriesSelected] = useState(0);
    let [categories, setCategories] = useState();
    const token = localStorage.getItem("SESSID");

    useEffect(() => {
        Promise.all([getAllCategories()]).then((result) => {
            setCategories(result[0].data);
        });
    }, []);

    const handleUpdate = (e) => {
        let newValue = window.prompt("Entrez la nouvelle valeur");

        if (newValue !== "" && newValue !== null) {
            let confirm = window.confirm(
                "ATTENTION ! La catégorie " +
                    categories[categoriesSelected[0] - 1].name +
                    " sera modifiée en " +
                    newValue +
                    ". Continuez ?"
            );
            if (confirm) {
                axios
                    .put(
                        "http://127.0.0.1:8000/api/category",
                        {
                            id: categoriesSelected[0],
                            name: newValue,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((result) => {
                        alert("La catégorie a bien été modifiée.");
                        Promise.all([getAllCategories()]).then((result) => {
                            setCategories(result[0].data);
                        });
                    })
                    .catch((error) => {
                        alert("Une erreur est survenue.");
                        console.log(error);
                    });
            }
        }
    };

    const onSubmit = (data) => {
        const newCategory = window.prompt(
            "Saisissez le nom de la nouvelle catégorie."
        );
        if (newCategory != null) {
            if (
                window.confirm(
                    "Ajouter la catégorie " +
                        newCategory +
                        " dans la base de donnée ?"
                )
            ) {
                axios
                    .post(
                        "http://127.0.0.1:8000/api/category",
                        {
                            name: newCategory,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((result) => {
                        alert("Catégorie(s) Ajoutée(s)");

                        Promise.all([getAllCategories()]).then((result) => {
                            setCategories(result[0].data);
                        });
                    });
            }
        }
    };

    function handleDelete() {
        axios
            .delete("http://127.0.0.1:8000/api/category", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: categoriesSelected,
                },
            })
            .then((result) => {
                setCategoriesSelected([]);
                selectAllCheckbox(
                    document.querySelector("#categoriesTable"),
                    false
                );
                alert("Catégorie(s) supprimée(s)");
                Promise.all([getAllCategories()]).then((result) => {
                    setCategories(result[0].data);
                });
            })
            .catch((err) => {
                alert("La requête n'a pas aboutie, veuillez réessayer");
                console.log(err);
            });
    }

    return (
        <div className="">
            <Header />
            <div className="p-2">
                <button
                    className="btn-sm"
                    type="button"
                    onClick={() => onSubmit()}
                >
                    Ajouter une catégorie
                </button>
                <button
                    className={`btn-sm mx-4 ${
                        categoriesSelected.length !== 1 &&
                        "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                    }`}
                    onClick={(e) => handleUpdate(e)}
                    disabled={categoriesSelected.length !== 1 ? true : false}
                >
                    Modifier
                </button>
                <button
                    className={`btn-sm ${
                        categoriesSelected.length < 1 &&
                        "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                    }`}
                    onClick={() => handleDelete()}
                    disabled={categoriesSelected.length < 1 ? true : false}
                >
                    Supprimer
                </button>
            </div>
            <div className="p-2">
                <table className="border-2 w-full" id="categoriesTable">
                    <thead className="bg-yellow-500">
                        <tr className="">
                            <td className="font-bold text-xl text-center bg-yellow-500">
                                {" "}
                                Nom{" "}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories
                            ? categories.map((category, index) => (
                                  <>
                                      <tr>
                                          <td className="p-1 text-xl">
                                              {category.name}
                                          </td>
                                          <td className="text-center">
                                              <input
                                                  id={category.id}
                                                  type="checkbox"
                                                  onClick={async () =>
                                                      setCategoriesSelected(
                                                          await handleSelect(
                                                              document.querySelector(
                                                                  "#categoriesTable"
                                                              )
                                                          )
                                                      )
                                                  }
                                                  className="w-10 h-10 mx-auto"
                                              />
                                          </td>
                                      </tr>
                                  </>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
            <ScrollUpButton />
        </div>
    );
}
