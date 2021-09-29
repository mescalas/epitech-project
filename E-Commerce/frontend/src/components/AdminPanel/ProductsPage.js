import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../utils/getRequests";
import {
    handleSelect,
    selectAllCheckbox,
    substractPercentage,
} from "../../utils/utils";
import Header from "./Header";
import Filters from "./Filters";
import ModalDiscount from "./ModalDiscount";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

export default function ProductsPage() {
    const [productsSelected, setProductsSelected] = useState([]);
    const [products, setproducts] = useState();
    const token = localStorage.getItem("SESSID");
    const [showModale, setShowModale] = useState(false);

    const colsNames = [
        "Catégorie",
        "Sous-catégorie",
        "Marque",
        "Nom",
        "Prix",
        "Réduction",
    ];

    useEffect(() => {
        Promise.all([getAllProducts()]).then((result) => {
            setproducts(result[0].data);
        });
    }, []);

    function handleDelete() {
        axios
            .delete("http://127.0.0.1:8000/api/product", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: productsSelected,
                },
            })
            .then((result) => {
                setProductsSelected([]);
                selectAllCheckbox(
                    document.querySelector("#productsTable"),
                    false
                );
                alert("Article(s) supprimé(s).");
                document.querySelectorAll("checkbox");
                Promise.all([getAllProducts()]).then((result) => {
                    setproducts(result[0].data);
                });
            })
            .catch((err) => {
                alert("La requête n'a pas aboutie, veuillez réessayer");
                console.log(err);
            });
    }

    return (
        <div className="relative h-screen">
            {showModale && (
                <ModalDiscount
                    productsSelected={productsSelected}
                    setShowModale={setShowModale}
                />
            )}
            <Header />
            <Filters setProducts={setproducts} />
            <div className="p-2">
                <div className="sm:flex">
                    <Link
                        to="/admin/create-product"
                        className="btn-sm text-center"
                    >
                        {" "}
                        Ajouter un article{" "}
                    </Link>
                    <div className="">
                        <button
                            type="button"
                            className={`btn-sm mx-4 my-2 ${
                                productsSelected.length !== 1 &&
                                "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                            }`}
                        >
                            {productsSelected.length !== 1 ? (
                                <p> Modifier </p>
                            ) : (
                                <Link
                                    to={`/admin/update-product/${productsSelected[0]}`}
                                >
                                    Modifier
                                </Link>
                            )}
                        </button>
                        <button
                            type="button"
                            className={`btn-sm my-2 ${
                                productsSelected.length < 1 &&
                                "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                            }`}
                            disabled={
                                productsSelected.length < 1 ? true : false
                            }
                            onClick={() => handleDelete()}
                        >
                            Supprimer
                        </button>
                        <button
                            type="button"
                            className={`btn-sm mx-4 my-2 ${
                                productsSelected.length < 1 &&
                                "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                            }`}
                            disabled={
                                productsSelected.length < 1 ? true : false
                            }
                            onClick={() => setShowModale(true)}
                        >
                            Définir des rabais
                        </button>
                    </div>
                </div>
                {products && (
                    <div className="my-2">
                        {" "}
                        {Object.keys(products).length} élements trouvés{" "}
                    </div>
                )}
            </div>
            <div className="overflow-auto h-full p-2">
                <table
                    className="border-2 w-full max-h-full"
                    id="productsTable"
                >
                    <thead>
                        <tr>
                            {colsNames.map((colName, i) => (
                                <td
                                    key={i}
                                    className="font-bold text-xl text-center bg-yellow-500"
                                >
                                    {colName}
                                </td>
                            ))}
                            <td className="bg-yellow-500 my-auto border-none flex flex-col items-center">
                                Tous
                                <input
                                    type="checkbox"
                                    className="h-10 w-10"
                                    onClick={async (e) => {
                                        await selectAllCheckbox(
                                            document.querySelector(
                                                "#productsTable"
                                            ),
                                            e.target.checked
                                        ).then(
                                            setProductsSelected(
                                                await handleSelect(
                                                    document.querySelector(
                                                        "#productsTable"
                                                    )
                                                )
                                            )
                                        );
                                    }}
                                />
                            </td>
                        </tr>
                    </thead>
                    <tbody className="">
                        {products
                            ? products.map((product, index) => (
                                  <tr key={index}>
                                      <td>
                                          {product.sub_category.category.name}
                                      </td>
                                      <td>{product.sub_category.name}</td>
                                      <td>{product.brand}</td>
                                      <td>{product.name}</td>
                                      <td className="">
                                          {product.discount !== 0 ? (
                                              <>
                                                  <div className="flex flex-col items-center">
                                                      <p>
                                                          {substractPercentage(
                                                              parseFloat(
                                                                  product.price
                                                              ),
                                                              parseFloat(
                                                                  product.discount
                                                              )
                                                          )}{" "}
                                                          €
                                                      </p>
                                                      <p className="italic text-gray-500">
                                                          Avant réduction :
                                                          {parseFloat(
                                                              product.price
                                                          )}{" "}
                                                          €
                                                      </p>
                                                  </div>
                                              </>
                                          ) : (
                                              <p className="text-center">
                                                  {" "}
                                                  {product.price} €{" "}
                                              </p>
                                          )}
                                      </td>
                                      <td> {product.discount} % </td>
                                      <td className="text-center">
                                          <input
                                              id={product.id}
                                              type="checkbox"
                                              onClick={async () => {
                                                  setProductsSelected(
                                                      await handleSelect(
                                                          document.querySelector(
                                                              "#productsTable"
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
