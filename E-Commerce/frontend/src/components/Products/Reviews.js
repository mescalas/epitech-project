import { React, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ReactStars from "react-stars";

export default function Reviews({ product, reviews }) {
    const [rating, setRating] = useState();
    const [comment, setComment] = useState("");
    const [data, setData] = useState();
    const sessid = localStorage.getItem("SESSID");
    const product_id = product.id;
    let email;

    if (sessid) {
        const decoded = jwt_decode(sessid);
        email = decoded.username;
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const handleComment = (event) => {
        setComment(event.target.value);
    };

    // Vérifier si l'utilisateur peut poster un avis
    useEffect(() => {
        if (product_id) {
            axios
                .get(
                    "http://localhost:8000/api/review?user=" +
                        email +
                        "&id=" +
                        product_id,
                    {
                        headers: {
                            Authorization: `Bearer ${sessid}`,
                        },
                    }
                )
                .then((result) => {
                    setData(result.data);
                })
                .catch((error) => {
                    return error;
                });
        }
    });

    const handleForm = async (event) => {
        event.preventDefault();

        const body = {
            email,
            product_id,
            rating,
            comment,
        };

        // Poster un avis
        axios
            .post("http://localhost:8000/api/review", body, {
                headers: {
                    Authorization: `Bearer ${sessid}`,
                },
            })
            .then((res) => {
                window.location.reload();
                return res;
            })
            .catch((err) => {
                return err;
            });
    };

    return (
        <>
            <div>
                {data == true ? (
                    <form className="flex flex-col" onSubmit={handleForm}>
                        <h1>Note générale</h1>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            color2={"#FC8621"}
                            half={false}
                            edit={true}
                        />
                        <h1 className="mt-6 mb-2">Ajouter un commentaire</h1>
                        <textarea
                            className="text-sm mb-2 h-10vh border border-transparent focus:outline-none focus:ring-1 focus:ring-orange focus:border-transparent"
                            placeholder="Qu'est ce vous n'avez pas aimé ou aimé ? Pour quelles utilisations avez-vous employé ce produit?"
                            name="comment"
                            onChange={handleComment}
                        />
                        <button
                            type="submit"
                            className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                        >
                            Envoyer
                        </button>
                    </form>
                ) : (
                    <div className="text-sm">
                        <p>
                            Vous n'êtes pas connecté ou vous n'avez pas acheté
                            cet article.
                        </p>
                        <p>
                            Vous ne pouvez pas laisser de commentaire pour ce
                            produit.
                        </p>
                    </div>
                )}
            </div>

            {reviews ? (
                <div className="mt-10">
                    <h1 className="pb-2">Les avis laissés par nos acheteurs</h1>
                    <div className="lg:max-h-20vh lg:overflow-y-scroll md:max-h-20vh md:overflow-y-scroll">
                        {reviews.map((review, i) => (
                            <div
                                key={i}
                                className="border-t border-orange p-4 text-sm"
                            >
                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={14}
                                    color2={"#FC8621"}
                                    half={false}
                                    edit={false}
                                />
                                <span>{review.comment}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-10 border-t border-orange p-2 text-sm">
                    <span>
                        Il n'y a pas d'avis sur cet article pour le moment.
                    </span>
                </div>
            )}
        </>
    );
}
