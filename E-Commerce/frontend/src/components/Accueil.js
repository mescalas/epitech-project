import React from "react";
import CarouselComponent from "./Carousel/CarouselComponent";
import Category from "./HomePage/Category";
import Promo from "./HomePage/Promo";
import Bandeau from "./HomePage/Bandeau";
import TrendingProduct from "./HomePage/TrendingProduct";
import Footer from "./Footer/Footer";
import Header from "./Header/Index";

export default function Accueil() {
    return (
        <div>
            <Header />
            <CarouselComponent />
            <Category />
            <Promo />
            <Bandeau />
            <TrendingProduct />
            <Footer />
        </div>
    );
}
