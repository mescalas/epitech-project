import { React, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { handleSelect } from "../utils/utils";
import Toggle from "./subComponents/Toggle";

export default function Filters({ setProducts }) {
    const token = localStorage.getItem("SESSID");

    const { register, handleSubmit } = useForm();

    const params = useParams();
    const subCategoryId = params.id;

    const [brands, setBrands] = useState();
    const [brandsSelected, setBrandsSelected] = useState();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleStock, setToggleStock] = useState(false);
    const [toggleDiscount, setToggleDiscount] = useState(false);

    useEffect(() => {
        axios
            .post(
                "http://127.0.0.1:8000/brand",
                {
                    id: subCategoryId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                setBrands(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onSubmit = (data) => {
        axios
            .post("http://127.0.0.1:8000/product/filter", {
                subCategory: subCategoryId,
                brand: '"' + brandsSelected[0] + '"',
                stock: toggleStock,
                discount: toggleDiscount,
                minPrice: data.priceMin,
                maxPrice: data.priceMax,
                name: data.filters_searchbar,
            })
            .then((result) => {
                setProducts(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-64">
            <h1 className="text-2xl my-2">Filtres :</h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <label
                        htmlFor="filters_searchbar"
                        className="bg-yellow-500 rounded-sm p-2 text-white my-2"
                    >
                        Recherche
                    </label>
                    <input
                        {...register("filters_searchbar")}
                        type="text"
                        name="filters_searchbar"
                        placeholder="Rechercher par nom, marque..."
                        className="input"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="brands"
                        className="bg-yellow-500 rounded-sm p-2 text-white my-2"
                    >
                        Marque
                    </label>
                    <div className="relative">
                        <div onClick={() => setToggleMenu(!toggleMenu)}>
                            <p>Selectionner une marque</p>
                        </div>
                        <ul
                            className={`absolute bg-white w-full bg-opacity-80 flex-col ${
                                toggleMenu ? null : "hidden"
                            }`}
                            id="brandsList"
                        >
                            {brands
                                ? brands.map((brand, index) => (
                                      <li className="w-full flex p-2 border-b-2">
                                          <span> {brand.brand} </span>
                                          <input
                                              id={brand.brand}
                                              type="checkbox"
                                              className="ml-auto p-6"
                                              onClick={async () =>
                                                  setBrandsSelected(
                                                      await handleSelect(
                                                          document.querySelector(
                                                              "#brandsList"
                                                          )
                                                      )
                                                  )
                                              }
                                          />
                                      </li>
                                  ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="bg-yellow-500 rounded-sm p-2 text-white my-2">
                        Prix
                    </label>
                    <div className="flex justify-center items-center">
                        <span> De </span>
                        <input
                            {...register("priceMin")}
                            type="text"
                            placeholder="min"
                            className="input mx-2 w-16"
                        />
                        <span> à </span>
                        <input
                            {...register("priceMax")}
                            type="text"
                            placeholder="max"
                            className="input mx-2 w-16"
                        />
                    </div>
                </div>
                <div className="flex my-2">
                    <span>Voir uniquement les produits en promotions</span>
                    <Toggle
                        id="toggleDiscount"
                        toggleState={toggleDiscount}
                        setToggle={setToggleDiscount}
                    />
                </div>
                <div className="flex my-2">
                    <span>Voir uniquement les produits en stock</span>
                    <Toggle
                        id="toggleStock"
                        toggleState={toggleStock}
                        setToggle={setToggleStock}
                    />
                </div>
                <div className="text-center my-6">
                    <button type="submit" className="btn-md">
                        Valider
                    </button>
                </div>
            </form>
        </div>
    );
}
