import { HashRouter, Routes, Route } from "react-router-dom";
import AdminHeader from "./adminheader";
import MyDashboard from "./dashboard";
import NewProduct from "./newproduct";
import MyOrder from "./order";
import MyProduct from "./product";

const AdminApp  = ()=>{
    return(
        <HashRouter>
          <AdminHeader/>
          <Routes>
            <Route exact path="/" element={<MyDashboard/>}/>
            <Route exact path="/newproduct" element={<NewProduct/>}/>
            <Route exact path="/product" element={<MyProduct/>}/>
            <Route exact path="/order" element={<MyOrder/>}/>
            
          </Routes>
       </HashRouter>
    )
}
export default AdminApp;
