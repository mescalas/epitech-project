import React from "react";
import axios from "axios";

export default function ProductList() {
    axios
        .get("http://127.0.0.1:8000/category")
        .then((res) => {})
        .then((error) => {
            console.log(error);
        });
    return (
        <div>
            <h1>Product List</h1>
        </div>
    );
}
