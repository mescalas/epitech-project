import React from 'react';
import Header from '../Header/Index';
import Category from '../HomePage/Category';
import Promo from '../HomePage/Promo';
import Bandeau from '../HomePage/Bandeau';
import TrendingProduct from '../HomePage/TrendingProduct';
import Footer from '../Footer/Footer';

export default function Accueil() {
	return (
		<div>
			<Header />
			<Category />
			<Promo />
			<Bandeau />
			<TrendingProduct />
			<Footer />
		</div>
	);
}
