import React from "react";
import axios from "axios";

const handleSubmit = (searchProduct) => {
    axios
        .post(
            "",
            {},
            {
                search: searchProduct,
            }
        )
        .then((result) => {})
        .catch((error) => [console.log(error)])
        .then({});
};

const handleUpdate = (productsSelected) => {
    axios
        .post(
            "",
            {},
            {
                action: "update",
                productsId: productsSelected,
            }
        )
        .then((result) => {})
        .catch((err) => {});
};

const handleDelete = (productsSelected) => {
    axios
        .post(
            "",
            {},
            {
                action: "delete",
                productsId: productsSelected,
            }
        )
        .then((result) => {})
        .catch((err) => {});
};
