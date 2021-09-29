import { React } from "react";
import HeaderTab from "./HeaderTab";
export default function Header() {
    return (
        <div className="sm:block font-body">
            <ul className="flex rounded-t-md text-white">
                <HeaderTab link="/admin/products" label="Produits" />
                <HeaderTab link="/admin/categories" label="Catégories" />
                <HeaderTab link="/admin/subcategories" label="Sous-catégories" />
            </ul>
            <div className="w-full py-2 bg-gray-100 border-b border-gray-300 hover:text-yellow-600 font-bold text-gray-600">
                <a href="/" className="pl-5 text-xl">&#8592; Retour à l'accueil</a>
            </div>
        </div>
    );
}
