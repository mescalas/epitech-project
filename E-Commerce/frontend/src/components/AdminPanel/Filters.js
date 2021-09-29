import { React, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { handleSelect } from "../../utils/utils";
import { Icon } from "@iconify/react";

import arrowDownAlt2 from "@iconify/icons-dashicons/arrow-down-alt2";

import { getAllCategories, getAllSubCategories } from "../../utils/getRequests";
import Toggle from "../subComponents/Toggle";

export default function Filters({ setProducts }) {
    const token = localStorage.getItem("SESSID");
    const { register, handleSubmit } = useForm();
    const [brands, setBrands] = useState();
    const [brandsSelected, setBrandsSelected] = useState();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleStock, setToggleStock] = useState(false);
    const [toggleDiscount, setToggleDiscount] = useState(false);
    const [categories, setCategories] = useState();
    const [categorySelected, setCategorySelected] = useState();
    const [subCategories, setSubCategories] = useState();
    const [subCategorySelected, setSubCategorySelected] = useState();

    useEffect(() => {
        axios
            .post(
                "http://127.0.0.1:8000/brand",
                {},
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

        Promise.all([getAllSubCategories(), getAllCategories()]).then(
            (result) => {
                setSubCategories(result[0].data);
                setCategories(result[1].data);
            }
        );
    }, [token]);

    useEffect(() => {
        axios
            .post(
                "http://127.0.0.1:8000/brand",
                {
                    id: subCategorySelected > 0 ? subCategorySelected : null,
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
    }, [subCategorySelected, token]);

    const onSubmit = (data) => {
        axios
            .post("http://127.0.0.1:8000/product/filter", {
                subCategory:
                    subCategorySelected === 0 ? null : subCategorySelected,
                brand: brandsSelected === 0 ? null : brandsSelected,
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
        <div className="p-4 bg-gray-100">
            <h1 className="text-2xl my-2 sm:justify-center text-yellow-500 font-bold">
                {" "}
                FILTRES
            </h1>
            <hr />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="sm:flex flex-wrap xl:flex-nowrap"
            >
                <div className="flex flex-col sm:mx-2 sm:max-w-xs">
                    <label
                        htmlFor="filters_searchbar"
                        className="bg-yellow-600 rounded-sm p-2 text-white my-2"
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
                <div className="flex flex-col sm:mx-2">
                    <label className="bg-yellow-600 rounded-sm p-2 text-white my-2">
                        Catégories
                    </label>
                    <select
                        onChange={(e) =>
                            setCategorySelected(e.target.selectedIndex)
                        }
                        className="p-2 rounded-sm mr-4 w-full border-2 border-yellow-600"
                    >
                        <option> Selectionner une catégorie </option>
                        {categories &&
                            categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex flex-col sm:mx-2">
                    <label className="bg-yellow-600 rounded-sm p-2 text-white my-2">
                        Sous-Catégorie
                    </label>
                    <select
                        onChange={(e) => setSubCategorySelected(e.target.value)}
                        className="p-2 rounded-sm w-full border-2 border-yellow-600"
                    >
                        <option value="0">
                            Selectionner une sous-catégorie
                        </option>
                        {subCategories
                            ? categorySelected
                                ? subCategories.map(
                                      (subCategory, index) =>
                                          subCategory.category.id ===
                                              categorySelected && (
                                              <option
                                                  value={subCategory.id}
                                                  key={index}
                                              >
                                                  {subCategory.name}
                                              </option>
                                          )
                                  )
                                : subCategories.map((subCategory, index) => (
                                      <option
                                          key={index}
                                          value={subCategory.id}
                                      >
                                          {subCategory.name}
                                      </option>
                                  ))
                            : null}
                    </select>
                </div>
                <div className="relative"></div>
                <div className="flex flex-col sm:mx-2">
                    <label
                        htmlFor="brands"
                        className="bg-yellow-600 rounded-sm p-2 text-white my-2"
                    >
                        Marque
                    </label>
                    <Icon icon="dashicons:arrow-down-alt2" />
                    <div className="relative w-52">
                        <div onClick={() => setToggleMenu(!toggleMenu)}>
                            <span className="w-full border-yellow-600 flex items-center bg-white input">
                                {" "}
                                Selectionner{" "}
                                <Icon
                                    icon={arrowDownAlt2}
                                    color="#000000"
                                    height="15"
                                />{" "}
                            </span>
                        </div>
                        <ul
                            className={`absolute bg-white w-full bg-opacity-80 flex-col max-h-50vh overflow-scroll ${
                                toggleMenu ? null : "hidden"
                            }`}
                            id="brandsList"
                        >
                            {brands
                                ? brands.map((brand, index) => (
                                      <li
                                          key={index}
                                          className="w-full flex p-2 border-b-2"
                                      >
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
                    <label className="bg-yellow-600 rounded-sm p-2 text-white my-2">
                        Prix
                    </label>
                    <div className="flex justify-center items-center">
                        <span className="mr-2"> De </span>
                        <input
                            {...register("priceMin")}
                            type="text"
                            placeholder="min"
                            className="input w-16"
                        />
                        <span className="mx-2"> à </span>
                        <input
                            {...register("priceMax")}
                            type="text"
                            placeholder="max"
                            className="input w-16"
                        />
                    </div>
                </div>
                <div className="mx-2">
                    <div className="flex my-2 justify-between">
                        <p className="w-52 text-sm">
                            Voir uniquement les produits en promotions
                        </p>
                        <Toggle
                            id="toggleDiscount"
                            toggleState={toggleDiscount}
                            setToggle={setToggleDiscount}
                        />
                    </div>
                    <div className="flex my-2 justify-between ">
                        <span className="text-sm">
                            Voir uniquement les produits en stock
                        </span>
                        <Toggle
                            id="toggleStock"
                            toggleState={toggleStock}
                            setToggle={setToggleStock}
                        />
                    </div>
                </div>
                <div className="text-center flex items-center justify-center">
                    <button type="submit" className="btn-md">
                        Rechercher
                    </button>
                </div>
            </form>
        </div>
    );
}
