import { React, useEffect, useState } from "react";
import Index from "../Header/Index";
import { getAllSubCategories } from "../../utils/getRequests";
import axios from "axios";

import Summary from "./Summary";
import ProductSheet from "./ProductSheet";
import ProductsList from "./ProductsList";

import { Icon } from "@iconify/react";
import crossIcon from "@iconify/icons-akar-icons/cross";
import nutIcon from "@iconify/icons-bi/nut";
import toolsIcon from "@iconify/icons-la/tools";
import { CookieCart } from "../CookieCart/Index";

export default function Configurateur() {
    const [subCategories, setSubcategories] = useState();
    const [tabActif, setTabActif] = useState();
    const [products, setProducts] = useState();
    const [panier, setPanier] = useState([]);
    const [idsProducts, setIdProducts] = useState([]);
    const [productSelected, setProductSelected] = useState();
    const [config, setConfig] = useState([]);

    useEffect(() => {
        getAllSubCategories()
            .then((result) => {
                setSubcategories(result.data.splice(0, 9));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getTotalPrice = () => {
        let sum = 0;
        panier.map((product) => (sum += product.price));
        return sum;
    };

    const validerPanier = () => {
        panier.forEach((product) => {
            CookieCart(product.id);
        });
        alert("Config ajoutée au panier.");
    };

    const viderPanier = () => {
        if (
            window.confirm("Etes vous sûr de vouloir supprimer votre config ?")
        ) {
            setPanier([]);
        }
    };

    useEffect(() => {
        axios
            .post("http://127.0.0.1:8000/product/filter", {
                subCategory: tabActif,
                brand: null,
                stock: null,
                discount: null,
                minPrice: null,
                maxPrice: null,
                name: null,
            })
            .then((result) => {
                setProducts(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [tabActif]);

    const [showProductsListResp, setShowProductsListResp] = useState(false);

    const removeItem = (index) => {
        let items = [...panier];
        items.splice(index, 1);
        setPanier(items);
    };

    useEffect(() => {
        let clone = [];
        panier.forEach((product) => clone.push(product.sub_category.id));
        setIdProducts(clone);
        console.log(clone);
    }, [panier]);

    return (
        <div className="h-90vh">
            <Index />
            <div className="text-center text-gray-700 font-bold p-4 border-t border-b border-yellow-500 text-xl mt-20 h-20">
                <div className="flex items-center justify-center">
                    <Icon icon={toolsIcon} style={{ height: 50, width: 50 }} />
                    <h1 className="mx-6 text-3xl"> LE CONFIGURATOR </h1>
                    <Icon icon={nutIcon} style={{ height: 50, width: 50 }} />
                </div>
            </div>
            <div className="mx-auto sm:px-6 lg:px-8 mt-4 h-80vh">
                <div className="lg:flex mt-4 h-full">
                    <div className="w-full lg:w-20vw h-full overflow-scroll overflow-x-hidden">
                        {subCategories &&
                            subCategories.map((subCategory, index) => (
                                <div className="border mb-2" key={index}>
                                    <div
                                        className={`cursor-pointer p-4 border border-gray-500 hover:border-l-8 hover:border-yellow-500 duration-200 bg-gray-200 ${
                                            tabActif === subCategory.id &&
                                            "border-l-8 border-yellow-500"
                                        } ${
                                            idsProducts.includes(
                                                subCategory.id
                                            ) && "bg-green-200"
                                        }`}
                                        onClick={() => {
                                            !idsProducts.includes(
                                                subCategory.id
                                            ) && setTabActif(subCategory.id);
                                            window.screen.width < 1024 &&
                                                setShowProductsListResp(true);
                                        }}
                                        index={index}
                                        key={subCategory.id}
                                    >
                                        {subCategory.name}
                                    </div>
                                    {panier.map(
                                        (product, index) =>
                                            product.sub_category.id ===
                                                subCategory.id && (
                                                <div
                                                    className="flex items-center justify-between p-2"
                                                    key={product.id}
                                                >
                                                    <div className="flex items-center w-10/12">
                                                        <img
                                                            src={`http://127.0.0.1:8000/${product.productImages[0].image}`}
                                                            alt="image_produit"
                                                            className="w-14 h-14"
                                                        />
                                                        <span>
                                                            {" "}
                                                            {product.name}{" "}
                                                        </span>
                                                    </div>
                                                    <Icon
                                                        icon={crossIcon}
                                                        style={{
                                                            maxHeight: "50px",
                                                            maxWidth: "50px",
                                                            height: "30px",
                                                            width: "30px",
                                                        }}
                                                        className={`text-gray-300 hover:text-red-700 mb-2 cursor-pointer`}
                                                        onClick={() => {
                                                            removeItem(index);
                                                        }}
                                                    />
                                                </div>
                                            )
                                    )}
                                </div>
                            ))}
                    </div>
                    {tabActif && (
                        <div>
                            <div className="hidden lg:block">
                                <ProductsList
                                    products={products}
                                    panier={panier}
                                    setPanier={setPanier}
                                    productSelected={productSelected}
                                    setProductSelected={setProductSelected}
                                    productsConfig={config}
                                    setProductsConfig={setConfig}
                                    setTabActif={setTabActif}
                                    tabActif={tabActif}
                                />
                            </div>
                            {showProductsListResp && (
                                <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-60 mt-20">
                                    <Icon
                                        icon={crossIcon}
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "50px",
                                            height: "30px",
                                            width: "30px",
                                        }}
                                        className={`text-gray-300 hover:text-red-700 mb-2 cursor-pointer`}
                                        onClick={() => {
                                            setShowProductsListResp(false);
                                        }}
                                    />
                                    <div
                                        className=""
                                        id="productListResponsive"
                                    >
                                        <ProductsList
                                            products={products}
                                            panier={panier}
                                            setPanier={setPanier}
                                            productSelected={productSelected}
                                            setProductSelected={
                                                setProductSelected
                                            }
                                            productsConfig={config}
                                            setProductsConfig={setConfig}
                                            setTabActif={setTabActif}
                                            tabActif={tabActif}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="w-30vw relative h-full hidden lg:block">
                        {productSelected && (
                            <ProductSheet productSelected={productSelected} />
                        )}
                        {panier.length > 0 && (
                            <Summary panier={panier} setPanier={setPanier} />
                        )}
                    </div>
                    <div className="lg:hidden block">
                        <div className="flex justify-between w-full border-t border-yellow-500 font-bold text-lg py-2">
                            <span> TOTAL : </span>
                            <span> {getTotalPrice()} € </span>
                        </div>
                        <div className="flex justify-center my-4">
                            <button
                                className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white duration-200 p-2 rounded-md font-bold mx-2"
                                onClick={() => validerPanier()}
                            >
                                Ajouter au panier
                            </button>
                            <button
                                className="border flex items-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-200 p-2 rounded-md font-bold mx-2"
                                onClick={() => viderPanier()}
                            >
                                Vider la sélection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
