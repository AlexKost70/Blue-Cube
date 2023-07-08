import { Fragment } from "react";
import Header from "../components/header/Header";
import ProductsList from "../components/productsList/ProductsList";


const ProductsPage = () => {
    return(
        <Fragment>
            <Header />
            <ProductsList />
        </Fragment>
    )
}

export default ProductsPage;