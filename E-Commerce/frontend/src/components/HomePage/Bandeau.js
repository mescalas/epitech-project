import React from "react";

export default function Bandeau() {
    return (
        <div className="font-body">
            <div className="bg-bandeau">
                <div className="p-10">
                    <p className="text-white font-bold text-4xl pb-10">
                        Nouvelle RTX <span className="text-orange">3080</span>
                    </p>
                    <p className="text-white text-lg">
                        Venez découvrir la{" "}
                        <span className="text-orange">pointe</span> de la
                        technologie
                    </p>
                    <p className="text-white text-lg pb-10">
                        dans le domaine{" "}
                        <span className="text-lightbrown">
                            des cartes garphiques
                        </span>
                        .
                    </p>
                    <p className="text-white font-bold text-xl">
                        Exclusivement chez nous.
                    </p>
                </div>
            </div>
        </div>
    );
}
