import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/category/")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {});
    }, []);

    return (
        <div className="">
            {categories.map((categorie) => (
                <a
                    key={categorie.id}
                    href={"/category/" + categorie.id}
                    className="border-transparent text-gray-500 hover:border-orange hover:text-gray-700 lg:inline-flex md:inline-flex block items-center pt-1 border-b-2 lg:text-xl lg:font-title md:font-title lg:mx-5 mx-4 text-base font-medium"
                >
                    {categorie.name}
                </a>
            ))}
        </div>
    );
}
