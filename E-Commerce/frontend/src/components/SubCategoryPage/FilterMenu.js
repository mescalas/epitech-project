import { React, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { handleSelect } from "../../utils/utils";
import { Icon } from "@iconify/react";

import arrowDownAlt2 from "@iconify/icons-dashicons/arrow-down-alt2";

import Toggle from "../subComponents/Toggle";

export default function Filters({ setProducts, setShowMenuRes }) {
    const token = localStorage.getItem("SESSID");

    const { register, handleSubmit } = useForm();

    const params = useParams();
    const subCategoryId = params.id;

    const [brands, setBrands] = useState();
    const [brandsSelected, setBrandsSelected] = useState();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleStock, setToggleStock] = useState(false);
    const [toggleDiscount, setToggleDiscount] = useState(false);
    const [showMenuResp, setShowMenuResp] = useState(false);

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
    }, [token, subCategoryId]);

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
                brand: brandsSelected == 0 ? null : brandsSelected,
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
        <>
            <div
                className={`p-4 -ml-10 lg:top-0 md:top-0 top-48 border border-orange lg:rounded-lg md:rounded-lg w-screen bg-gray-200 absolute md:relative md:w-full md:block 
    ${showMenuResp ? "block" : "hidden"}`}
            >
                <h1 className="text-xl my-2 sm:justify-center text-orange font-bold">
                    Filtres de recherche
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-wrap xl:flex-nowrap"
                >
                    <div className="flex flex-col sm:mx-2 sm:max-w-xs">
                        <label
                            htmlFor="filters_searchbar"
                            className="border-b border-orange rounded-sm p-1 text-orange my-1 text-sm"
                        >
                            Recherche
                        </label>
                        <input
                            {...register("filters_searchbar")}
                            type="text"
                            name="filters_searchbar"
                            placeholder="Rechercher par nom, marque..."
                            className="input text-sm border border-transparent focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent shadow-lg"
                        />
                    </div>
                    <div className="relative"></div>
                    <div className="flex flex-col sm:mx-2 relative">
                        <label
                            htmlFor="brands"
                            className="border-b border-orange rounded-sm p-1 text-orange my-1 text-sm"
                        >
                            Marque
                        </label>
                        <Icon icon="dashicons:arrow-down-alt2" />
                        <div className="relative w-full">
                            <div onClick={() => setToggleMenu(!toggleMenu)}>
                                <span className="w-full input border border-transparent focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent shadow-lg flex justify-between items-center bg-white input text-sm">
                                    Sélectionner
                                    <Icon
                                        icon={arrowDownAlt2}
                                        color="#000000"
                                        height="15"
                                    />
                                </span>
                            </div>
                            <ul
                                className={`absolute bg-white w-full flex-col max-h-50vh overflow-scroll z-20 text-sm ${
                                    toggleMenu ? null : "hidden"
                                }`}
                                id="brandsList"
                            >
                                {brands
                                    ? brands.map((brand, index) => (
                                          <li
                                              className="w-full flex p-2 border-b-2"
                                              key={brand.brand}
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
                    <div className="flex flex-col sm:mx-2 relative">
                        <label className="border-b border-orange rounded-sm p-1 text-orange my-1 text-sm">
                            Prix
                        </label>
                        <div className="flex items-center">
                            <span className="mr-2">De</span>
                            <input
                                {...register("priceMin")}
                                type="text"
                                placeholder="min"
                                className="input w-20 h-8 input text-sm border border-transparent focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent shadow-lg"
                            />
                            <span className="mx-2">à</span>
                            <input
                                {...register("priceMax")}
                                type="text"
                                placeholder="max"
                                className="input w-20 h-8 input text-sm border border-transparent focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="mx-2">
                        <div className="flex my-4 justify-between">
                            <p className="w-52 text-sm">
                                Produits en promotions
                            </p>
                            <Toggle
                                id="toggleDiscount"
                                toggleState={toggleDiscount}
                                setToggle={setToggleDiscount}
                            />
                        </div>
                        <div className="flex my-2 justify-between">
                            <span className="text-sm">Produits en stock</span>
                            <Toggle
                                id="toggleStock"
                                toggleState={toggleStock}
                                setToggle={setToggleStock}
                            />
                        </div>
                    </div>
                    <div className="text-center flex items-center justify-center text-sm">
                        <button
                            type="submit"
                            className="btn-md text-orange border border-orange bg-white hover:bg-orange hover:text-white"
                        >
                            Rechercher
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="border-2 border-orange bg-white flex justify-center items-center h-10 min-w-full mb-5 -ml-5 -mr-2 md:hidden z-0"
                onClick={() => {
                    setShowMenuResp(!showMenuResp);
                }}
            >
                Filtres
            </div>
        </>
    );
}
