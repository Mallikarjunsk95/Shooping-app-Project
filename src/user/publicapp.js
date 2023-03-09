import { HashRouter, Routes, Route } from "react-router-dom";
import PublicHeader from "./publicheader";
import MyHome from "./home";
import MyCart from "./cart";
import MyWish from "./wishlist";
import MyLogin from "./login";

const PublicApp = ()=>{
    return(
        <HashRouter>
            <PublicHeader/>
            <Routes>
                <Route exact path="/" element={ <MyHome/>}></Route>
                <Route exact path="/cart" element={ <MyCart/>}></Route>
                <Route exact path="/login" element={ <MyLogin/>}></Route>
                <Route exact path="/wishlist" element={ <MyWish/>}></Route>
                
            </Routes>
        </HashRouter>
    )

}

export default PublicApp;