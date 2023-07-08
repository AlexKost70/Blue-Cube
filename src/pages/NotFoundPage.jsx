import { Fragment } from "react";
import Header from "../components/header/Header";
import NotFound from "../components/notFound/NotFound";


const NotFoundPage = () => {
    return(
        <Fragment>
            <Header />
            <NotFound />
        </Fragment>
    )
}

export default NotFoundPage;