import React, { Component } from "react";
import axios from "axios";

export default function UserList() {
    axios
        .post("http://127.0.0.1:8000/user")
        .then((res) => {})
        .then((error) => {
            console.log(error);
        });
    return (
        <div>
            <h1>User List</h1>
        </div>
    );
}
