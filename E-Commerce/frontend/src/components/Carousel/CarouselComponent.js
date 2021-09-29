import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Configurateur from "../../Assets/slide_config.png";
import Discount from "../../Assets/slide_promo.png";
import Laptop from "../../Assets/slide_laptop.png";

export default function CarouselComponent() {
    return (
        <>
            <Splide
                options={{
                    type: "loop",
                    gap: "0.5rem",
                    autoplay: true,
                    pauseOnHover: false,
                    resetProgress: false,
                    arrows: false,
                    fixedHeight: "99vh",
                    fixedWidth: "100vw",
                    cover: true,
                }}
                hasSliderWrapper
                hasAutoplayProgress
            >
                <SplideSlide>
                    <img src={Configurateur} alt="Cover 1" />
                    <a href="/configurateur">
                        <div className="p-5 font-body font-bold text-white lg:text-6xl text-4xl lg:mt-96 lg:pt-24 mt-72">
                            <p className="mt-48">
                                Besoin d'une{" "}
                                <span className="text-orange">
                                    configuration sur mesure
                                </span>{" "}
                                ?
                            </p>
                            <p className="mt-5">
                                Testez notre{" "}
                                <span className="text-orange">
                                    configurateur PC
                                </span>{" "}
                                sans plus attendre
                            </p>
                        </div>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <img src={Discount} alt="Cover 2" />
                    <a href="/discount">
                        <div className="p-5 font-body font-bold lg:text-6xl text-4xl text-white lg:mt-96 lg:pt-40 mt-96">
                            <p className="mt-48">
                                Découvrez nos{" "}
                                <span className="text-orange">promotions</span>{" "}
                                du moment
                            </p>
                        </div>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <img src={Laptop} alt="Cover 3" />
                    <a href="/subcategory/17">
                        <div className="p-5 font-body font-bold text-white lg:text-6xl text-4xl lg:mt-96 lg:pt-40 mt-96">
                            <p className="mt-48">
                                Notre{" "}
                                <span className="text-orange">nouvelle</span>{" "}
                                gamme de PC portable vous attends
                            </p>
                        </div>
                    </a>
                </SplideSlide>
            </Splide>
        </>
    );
}
