import { React, useEffect, useState } from "react";
import axios from "axios";
import { getAllCategories } from "../../utils/getRequests";
import { convertTo64, arrayOfSpecs } from "../../utils/utils";
import { useForm } from "react-hook-form";
import Header from "./Header";

export default function CreateSubCategory() {
    let [img64, setImg64] = useState();
    let [InputDom, setInputDom] = useState([]);
    let [categories, setCategories] = useState();

    const token = localStorage.getItem("SESSID");
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const specs = await arrayOfSpecs();

        axios
            .post(
                "http://127.0.0.1:8000/api/subcategory",
                {
                    image: "img64",
                    characteristic: specs,
                    name: data.subcategoryName,
                    category: data.category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("La sous-catégorie a bien était créée.");
                window.location.href = "/admin/subcategories";
            })
            .catch((error) => {
                alert("Une erreur est survenue.");
                console.log(error);
            });
    };

    useEffect(() => {
        Promise.all([getAllCategories()]).then((result) => {
            setCategories(result[0].data);
        });
    }, []);

    const lessButton = () => {
        let newInputDom = InputDom;
        newInputDom.pop();
        setInputDom([...InputDom], newInputDom);
    };

    const Input = () => {
        return (
            <>
                <input
                    type="text"
                    placeholder="Spec"
                    className="spec input my-2"
                    required
                />
            </>
        );
    };

    return (
        <div>
            <Header />
            <div className="mycontainer my-2">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-200 p-2"
                >
                    {categories ? (
                        <select
                            {...register("category")}
                            name="category"
                            className="input"
                            required
                        >
                            <option value="">Choisissez une catégorie</option>
                            {categories.map((category, index) => (
                                <>
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                                </>
                            ))}
                        </select>
                    ) : null}
                    <div className="my-2">
                        <label htmlFor="">Nom :</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Nom de la sous-catégorie"
                            {...register("subcategoryName")}
                            required
                        />
                    </div>
                    <div id="Characteristic" className="my-2">
                        <label htmlFor="">
                            Ajouter des charactéristiques :
                        </label>
                        <span>
                            <button
                                type="button"
                                className="rounded-md bg-gray-700 text-yellow-300 p-2 mx-2"
                                onClick={() =>
                                    setInputDom([...InputDom, <Input />])
                                }
                            >
                                +
                            </button>
                            <button
                                type="button"
                                onClick={(e) => lessButton(e)}
                                className="rounded-md bg-gray-700 text-yellow-300 p-2"
                            >
                                -
                            </button>
                        </span>

                        {InputDom
                            ? InputDom.map((input, index) => <div>{input}</div>)
                            : null}
                    </div>

                    <div>
                        <label htmlFor="imageForm">Photo :</label>
                        <input
                            type="file"
                            id="imageForm"
                            name="imageForm"
                            accept="image/png, image/jpeg"
                            onChange={async (e) =>
                                setImg64(await convertTo64(e))
                            }
                            className="my-2"
                            required
                        />
                    </div>
                    <div>
                        {img64 ? (
                            <img
                                src={"data:image/png;base64," + img64}
                                alt="image_sous_categorie"
                            />
                        ) : null}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="rounded-md bg-gray-700 text-yellow-300 p-2"
                            onClick={(e) => handleSubmit(e)}
                        >
                            {" "}
                            Ajouter{" "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
