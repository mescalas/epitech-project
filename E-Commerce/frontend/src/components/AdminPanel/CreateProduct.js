import { React, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { getAllSubCategories } from "../../utils/getRequests";
import { arrayOfSpecs } from "../../utils/utils";
import { useForm } from "react-hook-form";

export default function CreateProduct() {
    let [subCategories, setSubCategories] = useState();
    let [subCategorySelected, setSubCategorySelected] = useState();
    let [image, setImage] = useState();
    let [feature, setFeature] = useState(false);
    let discount = 0;

    const token = localStorage.getItem("SESSID");
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        const specs = await arrayOfSpecs(
            subCategories[subCategorySelected - 1].characteristic
        );
        for (const key in data) {
            formData.append(key, data[key]);
        }

        [...image].forEach((file) => formData.append("image[]", file));

        formData.append("characteristic", specs);
        formData.append("featured", feature);
        formData.append("discount", discount);

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/product",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                alert("Le produit a bien été enregistré.");
                window.location.href = "/admin/products";
            })
            .catch((error) => {
                alert("Une erreur est survenue.");
                console.log(error);
            });
    };

    useEffect(() => {
        Promise.all([getAllSubCategories()]).then((result) => {
            setSubCategories(result[0].data);
        });
    }, []);

    return (
        <div className="">
            <Header />
            <div className="mycontainer my-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <span className="text-gray-700">NOM :</span>
                        <input
                            {...register("name")}
                            type="text"
                            className="form-input mt-2  w-full input"
                            required
                        />
                    </div>
                    <label className="block my-2">
                        <span className="text-gray-700">SOUS-CATEGORIES :</span>
                        {subCategories ? (
                            <select
                                {...register("subCategory")}
                                onChange={(e) =>
                                    setSubCategorySelected(
                                        e.target.selectedIndex
                                    )
                                }
                                className="input"
                                required
                            >
                                <option value="">
                                    Choisissez une sous-catégorie
                                </option>
                                {subCategories.map((subCategory, index) => (
                                    <>
                                        <option value={subCategory.id}>
                                            {subCategory.name}
                                        </option>
                                    </>
                                ))}
                            </select>
                        ) : null}
                        {subCategorySelected
                            ? subCategories[
                                  subCategorySelected - 1
                              ].characteristic.map((spec, index) => (
                                  <div className="my-2">
                                      <span className="specKey">{spec} :</span>
                                      <input
                                          type="text"
                                          className="bg-gray-300 border p-2 rounded-md spec input"
                                          required
                                      />
                                  </div>
                              ))
                            : null}
                    </label>
                    <div>
                        <label htmlFor="brand">MARQUE :</label>
                        <input
                            {...register("brand")}
                            type="text"
                            className="form-input mt-1 block w-full input"
                            name="brand"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Description</label>
                        <textarea
                            {...register("description")}
                            className="form-textarea mt-1 block w-full input"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="">Prix :</label>
                        <input
                            {...register("price")}
                            type="text"
                            className="form-input mt-1 block w-full input"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="avatar">Photo</label>
                        <input
                            type="file"
                            multiple
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setImage(e.target.files)}
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="quantity"> Quantité : </label>
                        <input
                            {...register("quantity")}
                            type="text"
                            name="quantity"
                            className="input"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="weight"> Poids : </label>
                        <input
                            {...register("weight")}
                            type="text"
                            name="weight"
                            className="input"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="feature">Article phare :</label>
                        <input
                            type="checkbox"
                            name="feature"
                            onChange={() => setFeature(!feature)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn-md my-2">
                            {" "}
                            Ajouter{" "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
