import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export default function CarouselProductDetail() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/product/" + id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                return err;
            });
    }, [id]);

    return (
        <Splide
            options={{
                type: "loop",
                gap: "0.5rem",
                autoplay: true,
                pauseOnHover: false,
                resetProgress: false,
                arrows: true,
                width: "500px",
                pagination: false,
            }}
            hasSliderWrapper
            hasAutoplayProgress
            className="lg:w-1/2 w-full mb-6 lg:mb-0 lg:mt-20"
        >
            {product.productImages ? (
                product.productImages.map((item, i) => (
                    <SplideSlide key={i}>
                        <img
                            src={"http://127.0.0.1:8000/" + item.image}
                            alt="product.name"
                        />
                    </SplideSlide>
                ))
            ) : (
                <div>Loading</div>
            )}
        </Splide>
    );
}
