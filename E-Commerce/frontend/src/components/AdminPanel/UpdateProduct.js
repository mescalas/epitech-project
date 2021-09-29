import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import { getAllSubCategories, getProduct } from "../../utils/getRequests";
import { arrayOfSpecs } from "../../utils/utils";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Input from "../subComponents/Input";
import CustomTextArea from "../subComponents/CustomTextArea";

export default function UpdateProduct() {
    const params = useParams();
    const productId = params.id;
    const { register, handleSubmit } = useForm();
    const token = localStorage.getItem("SESSID");

    const [images, setImages] = useState();
    let [subCategories, setSubCategories] = useState();
    let [subCategorySelected, setSubCategorySelected] = useState();
    let [product, setproduct] = useState();
    let [inputs, setInputs] = useState({});

    const handleDeleteImg = (id, index) => {
        if (
            window.confirm(
                "ATTENTION ! Etes-vous sûr de vouloir supprimer cette image ?"
            )
        ) {
            axios
                .delete("http://127.0.0.1:8000/api/product/image", {
                    data: {
                        id: [id],
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((result) => {
                    let newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                })
                .catch((error) => {});
        }
    };

    const onSubmit = async (data) => {
        const specs = await arrayOfSpecs(
            subCategories[subCategorySelected - 1].characteristic
        );

        axios
            .put(
                "http://127.0.0.1:8000/api/product",
                {
                    id: productId,
                    characteristic: specs,
                    name: inputs.name,
                    description: inputs.description,
                    subCategory: data.subCategory,
                    brand: inputs.brand,
                    quantity: inputs.quantity,
                    weight: inputs.weight,
                    price: inputs.price,
                    featured: "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("Le produit a bien été modifié.");
                window.location.href = "/admin/products";
            })
            .catch((error) => {
                alert("Une erreur est survenue.");
                console.log(error);
            });
    };

    useEffect(() => {
        Promise.all([getAllSubCategories(), getProduct(productId)]).then(
            (result) => {
                setSubCategories(result[0].data);
                setproduct(result[1].data);
                setSubCategorySelected(result[1].data.sub_category.id);
                setInputs({
                    name: result[1].data.name,
                    brand: result[1].data.brand,
                    price: result[1].data.price,
                    weight: result[1].data.weight,
                    quantity: result[1].data.quantity,
                    specs: result[1].data.characteristic,
                    description: result[1].data.description,
                });
                setImages(result[1].data.productImages);
            }
        );
    }, [productId]);

    return product && inputs ? (
        <div className="">
            <Header />

            <div className="mycontainer">
                <button type="button" className="btn-md my-2">
                    <Link to="/admin/products">Retour</Link>
                </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        inputs={inputs}
                        setInputs={setInputs}
                        label="Nom :"
                        name="name"
                        value={inputs.name}
                    />
                    <Input
                        inputs={inputs}
                        setInputs={setInputs}
                        label="Marque :"
                        name="brand"
                        value={inputs.brand}
                    />
                    <Input
                        inputs={inputs}
                        setInputs={setInputs}
                        label="Quantité :"
                        name="quantity"
                        value={inputs.quantity}
                    />
                    <Input
                        inputs={inputs}
                        setInputs={setInputs}
                        label="Prix :"
                        name="price"
                        value={inputs.price}
                    />
                    <Input
                        inputs={inputs}
                        setInputs={setInputs}
                        label="Poids :"
                        name="weight"
                        value={inputs.weight}
                    />

                    <label className="text-gray-700">Sous-catégorie :</label>
                    {subCategories ? (
                        <select
                            {...register("subCategory")}
                            onChange={(e) =>
                                setSubCategorySelected(
                                    e.target.selectedIndex + 1
                                )
                            }
                            value={product.subCategory}
                            className="input my-2 mx-2"
                        >
                            {subCategories.map((subCategory, index) => (
                                <option
                                    value={subCategory.id}
                                    selected={
                                        subCategory.id ===
                                        product.sub_category.id
                                            ? true
                                            : false
                                    }
                                >
                                    {subCategory.name}
                                </option>
                            ))}
                        </select>
                    ) : null}

                    {subCategorySelected && inputs.specs
                        ? subCategories[
                              subCategorySelected - 1
                          ].characteristic.map((spec, index) => (
                              <div className="my-2">
                                  <span>{spec} :</span>
                                  <input
                                      type="text"
                                      className="bg-gray-300 border p-2 rounded-md spec"
                                      value={inputs.specs[spec]}
                                      name={spec}
                                      onChange={(e) => {
                                          const state = { ...inputs };
                                          const name = e.target.name;
                                          state.specs[name] = e.target.value;
                                          setInputs(state);
                                      }}
                                  />
                              </div>
                          ))
                        : null}

                    <CustomTextArea
                        label="Description :"
                        textContent={product.description}
                    />

                    <div>
                        <label htmlFor="avatar">Photo</label>
                        <div className="flex">
                            {images &&
                                images.map((image, index) => (
                                    <div className="relative w-52 h-50 mx-2">
                                        <div
                                            className="bg-black absolute opacity-0 w-full h-full flex justify-center items-center hover:opacity-100 hover:bg-opacity-50 duration-200"
                                            id={`Image`}
                                        >
                                            <button
                                                type="button"
                                                className="btn-sm"
                                                onClick={() =>
                                                    handleDeleteImg(
                                                        image.id,
                                                        index
                                                    )
                                                }
                                            >
                                                {" "}
                                                Supprimer{" "}
                                            </button>
                                        </div>
                                        <img
                                            id={image.id}
                                            src={`http://127.0.0.1:8000/${image.image}`}
                                            alt="picture_product"
                                            className="input"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="my-2">
                        <button type="submit" className="btn-md">
                            {" "}
                            Modifier{" "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
}
