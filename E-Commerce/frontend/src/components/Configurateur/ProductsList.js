import { React, useEffect, useState } from "react";
import { CookieCart } from "../CookieCart/Index";

export default function ProductsList({
    products,
    panier,
    setPanier,
    productSelected,
    setProductSelected,
    productsConfig,
    setProductsConfig,
    setTabActif,
    tabActif,
}) {
    const [config, setConfig] = useState({});

    const clone = (obj) => Object.assign({}, obj);

    const renameKey = (object, key, newKey) => {
        const clonedObj = clone(object);
        const targetKey = clonedObj[key];

        delete clonedObj[key];

        clonedObj[newKey] = targetKey;

        return clonedObj;
    };

    const check = (product) => {
        setProductsConfig([...productsConfig, product]);
    };

    return (
        <div className="w-screen lg:w-60vw border md:mx-4">
            <div className="border overflow-scroll overflow-x-hidden h-full">
                <table
                    id="productsTable"
                    className="w-full bg-gray-100 text-gray-800"
                    style={{ tableLayout: "fixed" }}
                >
                    <thead className="sticky bg-gray-700 text-white">
                        <tr className="p-4 cursor-pointer">
                            <th style={{ width: "50%", maxWidth: "200px" }}>
                                {" "}
                                Nom{" "}
                            </th>
                            <th> Prix </th>
                            <th> Dispo </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {products &&
                            products.map((product) => (
                                <tr
                                    className="p-4 cursor-pointer hover:bg-yellow-500 hover:bg-opacity-60"
                                    key={product.id}
                                    onClick={() =>
                                        product.quantity > 0
                                            ? setPanier([...panier, product])
                                            : alert(
                                                  "Ce produit n'est pas disponible."
                                              )
                                    }
                                    onMouseEnter={() => {
                                        setProductSelected(product);
                                    }}
                                >
                                    <td
                                        style={{
                                            width: "300px",
                                            maxWidth: "300px",
                                        }}
                                        className="truncate text-xs md:text-md"
                                        onClick={async () => {
                                            console.log(tabActif);
                                            check(product);
                                            tabActif < 9
                                                ? setTabActif(
                                                      product.sub_category.id +
                                                          1
                                                  )
                                                : setTabActif(15);
                                        }}
                                    >
                                        <span className=" whitespace-nowrap overflow-hidden">
                                            {" "}
                                            {product.name}{" "}
                                        </span>
                                    </td>
                                    <td className="text-center text-xs md:text-md">
                                        {product.price} €
                                    </td>
                                    <td className="justify-center h-full">
                                        {product.quantity !== 0 ? (
                                            <div className="flex justify-center">
                                                {" "}
                                                <span className="bg-green-500 rounded-full w-4 h-4">
                                                    {" "}
                                                </span>{" "}
                                            </div>
                                        ) : (
                                            <div>
                                                {" "}
                                                <span className="bg-red-500 rounded-full w-4 h-4">
                                                    {" "}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
