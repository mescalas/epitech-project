import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAllSubCategories } from "../../utils/getRequests";
import { handleSelect, selectAllCheckbox } from "../../utils/utils";
import Header from "./Header";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

export default function SubCategoriesPage() {
    let [subCategoriesSelected, setsubCategoriesSelected] = useState([]);
    let [subCategories, setSubCategories] = useState();

    const token = localStorage.getItem("SESSID");

    const colsNames = ["Nom", "Catégorie", "Caractéristiques"];

    useEffect(() => {
        Promise.all([getAllSubCategories()]).then((result) => {
            setSubCategories(result[0].data);
        });
    }, []);

    function handleDelete() {
        axios
            .delete("http://127.0.0.1:8000/api/subcategory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: subCategoriesSelected,
                },
            })
            .then((result) => {
                setsubCategoriesSelected([]);
                selectAllCheckbox(
                    document.querySelector("#subCategoriesTable"),
                    false
                );
                alert(
                    "Les sous-catégories sélectionnées ont bien étaient supprimée"
                );
                Promise.all([getAllSubCategories()]).then((result) => {
                    setSubCategories(result[0].data);
                });
            })
            .catch((err) => {
                alert("Une erreur est survenue.");
                console.log(err);
            });
    }

    return (
        <div className="bg-gray-200">
            <Header />
            <div className="p-2">
                <div className="flex">
                    <button className="btn-sm">
                        <Link to="/admin/create-subcategory">
                            {" "}
                            Ajouter une sous-catégorie{" "}
                        </Link>
                    </button>
                    <button
                        type="button"
                        className={`mx-4 ${
                            subCategoriesSelected.length !== 1
                                ? "btn-md-disabled"
                                : "btn-sm"
                        } `}
                    >
                        {subCategoriesSelected.length !== 1 ? (
                            <p> Modifier </p>
                        ) : (
                            <Link
                                to={`/admin/update-subcategory/${subCategoriesSelected[0]}`}
                            >
                                Modifier
                            </Link>
                        )}
                    </button>
                    <button
                        className="btn-sm"
                        onClick={handleDelete}
                        type="button"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
            <div className="h-screen overflow-scroll p-2">
                <table className="w-full" id="subCategoriesTable">
                    <thead>
                        <tr className="text-center">
                            {colsNames.map((name) => (
                                <td className="font-bold text-xl text-center bg-yellow-500">
                                    {" "}
                                    {name}{" "}
                                </td>
                            ))}
                            <td className="bg-yellow-500 my-auto flex flex-col items-center">
                                <span> Tous </span>
                                <input
                                    type="checkbox"
                                    onClick={async (e) => {
                                        await selectAllCheckbox(
                                            document.querySelector(
                                                "#subCategoriesTable"
                                            ),
                                            e.target.checked
                                        ).then(
                                            setsubCategoriesSelected(
                                                await handleSelect(
                                                    document.querySelector(
                                                        "#subCategoriesTable"
                                                    )
                                                )
                                            )
                                        );
                                    }}
                                    className="h-10 w-10 my-2"
                                />
                            </td>
                        </tr>
                    </thead>
                    <tbody className="text-xl">
                        {subCategories
                            ? subCategories.map((subCategory, index) => (
                                  <tr className="text-center">
                                      <td className="">{subCategory.name}</td>
                                      <td className="">
                                          {subCategory.category.name}
                                      </td>
                                      <td className="">
                                          {subCategory.characteristic.map(
                                              (spec, index) => (
                                                  <span>{spec}; </span>
                                              )
                                          )}
                                      </td>
                                      <td className="text-center">
                                          <input
                                              id={subCategory.id}
                                              type="checkbox"
                                              onClick={async () => {
                                                  setsubCategoriesSelected(
                                                      await handleSelect(
                                                          document.querySelector(
                                                              "#subCategoriesTable"
                                                          )
                                                      )
                                                  );
                                              }}
                                              className="h-10 w-10"
                                          />
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
            <ScrollUpButton />
        </div>
    );
}
