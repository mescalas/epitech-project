import { React } from "react";
import { Link } from "react-router-dom";

export default function HeaderTab({ link, label }) {
    const url = window.location.href;

    return (
        <li
            className={`text-center w-full border-r-2 text-xl hover:bg-yellow-700 items-center flex justify-center ${
                url.match(link) ? "bg-yellow-700" : "bg-gray-600"
            }`}
            id="tabArticle"
        >
            <Link to={link}>
                <div className="p-4">{label}</div>
            </Link>
        </li>
    );
}
