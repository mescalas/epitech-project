import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { getSubCategory } from "../../utils/getRequests";
import { arrayOfSpecs, convertTo64 } from "../../utils/utils";
import { useForm } from "react-hook-form";

export default function UpdateSubCategory() {
    let [img64, setImg64] = useState();
    let [inputs, setInputs] = useState({});
    let [inputsAdded, setinputsAdded] = useState([]);

    const token = localStorage.getItem("SESSID");
    const params = useParams();
    const subCategoryId = params.id;

    const { handleSubmit, register } = useForm();

    useEffect(() => {
        Promise.all([getSubCategory(subCategoryId)])
            .then((result) => {
                setInputs({
                    name: result[0].data.name,
                    category: result[0].data.category,
                    characteristic: result[0].data.characteristic,
                });
                setImg64(result[0].data.image);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [subCategoryId]);

    const onSubmit = async (data) => {
        const specs = await arrayOfSpecs();
        axios
            .put(
                "http://127.0.0.1:8000/api/subcategory",
                {
                    id: subCategoryId,
                    image: img64,
                    characteristic: specs,
                    name: data.name,
                    category: data.category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                alert("La sous-catégorie a bien été modifiée.");
            })
            .catch((error) => {
                alert("Une erreur est survenue.");
                console.log(error);
            });
    };

    const removeNewInput = () => {
        let newinputsAdded = inputsAdded;
        newinputsAdded.pop();
        setinputsAdded([...inputsAdded], newinputsAdded);
    };

    const NewInput = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Spec"
                    className="spec"
                    required
                />
            </div>
        );
    };

    const handleChangeChar = (e) => {
        const state = { ...inputs };
        const name = e.target.name;

        state.characteristic[name] = e.target.value;

        setInputs(state);
    };

    const handleChange = (e) => {
        const state = { ...inputs };
        const name = e.target.name;

        state[name] = e.target.value;

        setInputs(state);
    };

    const deleteCharacteristic = (e) => {
        if (
            window.confirm(
                "Attention ! Cette caractéristique existe dans la base de de donnée. êtes-vous sûr de vouloir supprimer cette caractéristique ?"
            )
        ) {
            e.target.parentNode.remove();
        }
    };

    return inputs.characteristic ? (
        <div className="mycontainer">
            <Header />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="text-gray-700">Nom :</label>
                    <input
                        {...register("name")}
                        type="text"
                        className="mt-1 block w-full"
                        value={inputs.name}
                        name={"name"}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                {inputs.characteristic.map((spec, index) => (
                    <div>
                        <label className="text-gray-700">
                            {"Characteristique " + (index + 1) + " :"}
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full spec"
                            value={inputs.characteristic[index]}
                            name={index}
                            onChange={(e) => handleChangeChar(e)}
                            required
                        />
                        <button
                            type="button"
                            className="btn-sm"
                            onClick={(e) => deleteCharacteristic(e)}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}

                <div>
                    <p>Ajouter des propriétés :</p>
                    <button
                        type="button"
                        className="btn-sm"
                        onClick={() =>
                            setinputsAdded([...inputsAdded, <NewInput />])
                        }
                    >
                        +
                    </button>
                    <button
                        type="button"
                        onClick={() => removeNewInput()}
                        className="btn-sm"
                    >
                        -
                    </button>
                </div>

                {inputsAdded
                    ? inputsAdded.map((input, index) => (
                          <div className="p-2 bg-gray-300">{input}</div>
                      ))
                    : null}
                <div>
                    <label htmlFor="imageForm">Photo :</label>
                    <input
                        type="file"
                        id="imageForm"
                        name="imageForm"
                        accept="image/png, image/jpeg"
                        onChange={async (e) => setImg64(await convertTo64(e))}
                    />
                    {img64 ? (
                        <img
                            src={"data:image/png;base64," + img64}
                            alt="image_categorie"
                        />
                    ) : null}
                </div>
                <div>
                    <button type="submit" className="btn-sm">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    ) : null;
}
