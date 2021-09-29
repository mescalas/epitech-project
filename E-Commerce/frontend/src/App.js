import { React, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RegisterForm from "./components/Register/RegisterForm";
import LoginForm from "./components/Login/LoginForm";
import ProductsPage from "./components/AdminPanel/ProductsPage";
import NotFound from "./components/404";
import Accueil from "./components/Accueil";
import DetailProduct from "./components/Products/DetailProduct";
import CategoriesPage from "./components/AdminPanel/CategoriesPage";
import OrdersPage from "./components/AdminPanel/OrdersPage";
import CreateProduct from "./components/AdminPanel/CreateProduct";
import SubCategoriesPage from "./components/AdminPanel/SubCategoriesPage";
import CreateSubCategory from "./components/AdminPanel/CreateSubCategory";
import UpdateProduct from "./components/AdminPanel/UpdateProduct";
import UpdateSubCategory from "./components/AdminPanel/UpdateSubCategory";
import CategoryPage from "./components/CategoryPage/Index";
import SubCategoryPage from "./components/SubCategoryPage/Index";
import CartPage from "./components/CartPage/Index";
import UserPanel from "./components/UserPanel/UserPanel";
import Discount from "./components/DiscountPage/Index";
import Configurateur from "./components/Configurateur/Index";
import Checkout from "./components/CommandPage/Checkout";
import Delivery from "./components/CommandPage/Delivery";
import Order from "./components/CommandPage/Order";
import DeliveryPage from "./components/DeliveryPage/Index";

function App() {

    useEffect(() => {
        document.title = "Lor'N Tech";
      }, []);

    return (
        <Router>
            <Switch>
                <Route path="/user/:tabActif">
                    <UserPanel />
                </Route>
                <Route path="/register">
                    <RegisterForm />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/404">
                    <NotFound />
                </Route>
                <Route path="/admin/create-product">
                    <CreateProduct />
                </Route>
                <Route path="/admin/categories">
                    <CategoriesPage />
                </Route>
                <Route path="/admin/subcategories">
                    <SubCategoriesPage />
                </Route>
                <Route path="/admin/create-subcategory">
                    <CreateSubCategory />
                </Route>
                <Route path="/admin/orders">
                    <OrdersPage />
                </Route>
                <Route path="/admin/products">
                    <ProductsPage />
                </Route>
                <Route path="/admin/update-product/:id">
                    <UpdateProduct />
                </Route>
                <Route path="/admin/update-subcategory/:id">
                    <UpdateSubCategory />
                </Route>
                <Route path="/product/:id">
                    <DetailProduct />
                </Route>
                <Route exact path="/panier">
                    <CartPage />
                </Route>
                <Route path="/category/:id">
                    <CategoryPage />
                </Route>
                <Route path="/subcategory/:id">
                    <SubCategoryPage />
                </Route>
                <Route path="/discount">
                    <Discount />
                </Route>
                <Route path="/configurateur">
                    <Configurateur />
                </Route>
                <Route exact path="/panier/checkout">
                    <Checkout />
                </Route>
                <Route path="/panier/checkout/delivery">
                    <Delivery />
                </Route>
                <Route path="/order/:ref">
                    <Order />
                </Route>
                <Route path="/delivery">
                    <DeliveryPage />
                </Route>
                <Route path="/">
                    <Accueil />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
