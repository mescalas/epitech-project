import React from "react";
import axios from "axios";
import UserList from "./UserList";
import ProductList from "./ProductList";

export default function AdminPage() {
    let token = localStorage.getItem("SESSID");
    axios
        .post(
            "http://127.0.0.1:8000/api/admin",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => {
            if (res.data.role[0] == "ROLE_USER") {
                window.location.href = "/404";
            }
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "/404";
        });

    return (
        <div>
            <UserList />
            <ProductList />
        </div>
    );
}
