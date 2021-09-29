import { React } from "react";

import Index from "../Header/Index";
import Navbar from "./Navbar";
import MesCoords from "./MesCoords";
import Addresses from "./Addresses";
import Payments from "./Payments ";
import Orders from "./Orders";

import jwtDecode from "jwt-decode";

export default function UserPanel() {
    const sessid = localStorage.getItem("SESSID");
    const decoded = sessid && jwtDecode(sessid);

    return (
        <div>
            <Index />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:justify-between my-20">
                    <Navbar />
                    <div className="border border-gray-300 sm:ml-2 bg-gray-100 w-screen">
                        <MesCoords userData={decoded} />
                        <Addresses userData={decoded} />
                        <Payments userData={decoded} />
                        <Orders userData={decoded} />
                    </div>
                </div>
            </div>
        </div>
    );
}
