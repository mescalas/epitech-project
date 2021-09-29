import { React, useState } from "react";
import Footer from "../Footer/Footer";
import Index from "../Header/Index";

export default function DeliveryPage() {
    const [ref, setRef] = useState();

    const handleRef = (event) => {
        setRef(event.target.value);
    };

    const handleForm = async (event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/order/${ref}`;
    };

    return (
        <div>
            <Index />
            <div className="bg-gray-200 pt-32 font-body flex flex-col items-center">
                <h1 className="font-title text-2xl mb-14">
                    Suivi de livraison
                </h1>
                <p>
                    Merci d'indiquer votre référence de commande dans le champ
                    ci dessous pour accéder au suivi de votre commande.
                </p>
                <form className="flex flex-col" onSubmit={handleForm}>
                    <input
                        className="mt-8 rounded p-4 w-20vw border border-transparent focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent"
                        placeholder="Votre numéro de commande"
                        name="number"
                        onChange={handleRef}
                        required
                    />
                    <button
                        type="submit"
                        className="my-14 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                    >
                        Rechercher
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
