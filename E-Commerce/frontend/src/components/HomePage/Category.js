import React from "react";
import GraphicCard from "../../Assets/graphiccard.png";
import Computer from "../../Assets/computer.png";
import Screen from "../../Assets/screen.png";
import Config from "../../Assets/config.png";

export default function Category() {
    function Redirect(id) {
        window.location.href = `/category/${id}`;
    }

    return (
        <div className="bg-gray-100">
            <div className="font-body">
                <div className="ml-16 w-50vw pt-14 border-b border-black mb-12">
                    <h1 className="font-title font-bold text-3xl md:text-5xl text-black pb-2">
                        Catégories
                    </h1>
                </div>
                <div className="flex flex-col justify-between w-90vw m-auto lg:flex-row lg:flex-nowrap">
                    <div
                        className="w-full m-auto mb-10 h-56 bg-white flex flex-nowrap cursor-pointer lg:w-23p lg:m-0"
                        onClick={() => {
                            Redirect(1);
                        }}
                    >
                        <div className="w-full mt-3 ml-3 overflow-hidden relative">
                            <img
                                src={GraphicCard}
                                alt="Graphic Card"
                                className="absolute left-40p sm:top-n50p sm:left-40p lg:left-40p lg:top-0"
                            />
                            <p className="font-bold text-4xl text-black mb-5 border-b border-black">
                                Composants
                            </p>
                            <div className="w-3/5">
                                <p className="text-sm">
                                    Venez découvrir nos toutes dernières cartes
                                    graphiques à des prix exceptionnels.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full m-auto mb-10 h-56 bg-white flex flex-nowrap cursor-pointer lg:w-23p lg:m-0"
                        onClick={() => {
                            Redirect(3);
                        }}
                    >
                        <div className="w-full mt-3 ml-3 overflow-hidden relative">
                            <img
                                src={Computer}
                                alt="Computer"
                                className="absolute w-40 left-50p top-20p sm:w-72 sm:left-60p lg:top-20p lg:left-50p lg:w-44 "
                            />
                            <p className="font-bold text-4xl text-darkbrown mb-5 border-b border-darkbrown">
                                Ordinateur
                            </p>
                            <div className="w-1/2">
                                <p className="text-sm">
                                    Notre large gamme d'ordinateur de bureau
                                    saura vous satisfaire dans vos futurs
                                    projets.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full m-auto mb-10 h-56 bg-white flex flex-nowrap cursor-pointer lg:w-23p lg:m-0"
                        onClick={() => {
                            Redirect(2);
                        }}
                    >
                        <div className="w-full mt-3 ml-3 overflow-hidden relative">
                            <img
                                src={Screen}
                                alt="Screen"
                                className="absolute w-40 top-30p left-60p sm:w-80 sm:left-60p sm:top-n20p lg:w-44 lg:top-30p lg:left-50p"
                            />
                            <p className="font-bold text-4xl text-lightbrown mb-5 border-b border-lightbrown">
                                Périphériques
                            </p>
                            <div className="w-1/2">
                                <p className="text-sm">
                                    Nos périphériques sauront vous accompagner
                                    durant vos longues sessions.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full m-auto h-56 bg-white flex flex-nowrap cursor-pointer lg:w-23p lg:m-0"
                        onClick={() => {
                            window.location.href = "/configurateur";
                        }}
                    >
                        <div className="w-full mt-3 ml-3 overflow-hidden relative">
                            <img
                                src={Config}
                                alt="Configurateur"
                                className="absolute w-40 top-30p left-50p sm:w-52 sm:top-10p sm:left-70p lg:w-44 lg:top-30p lg:left-50p"
                            />
                            <p className="font-bold text-4xl text-orange mb-5 border-b border-orange">
                                Configurateur
                            </p>
                            <div className="w-1/2">
                                <p className="text-sm">
                                    Nous possédons des écrans capable d'afficher
                                    toute la puissance de votre ordinateur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
