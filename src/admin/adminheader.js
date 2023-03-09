import { Link } from "react-router-dom";

const AdminHeader =()=>{
    return(
        <ul className="block1">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/newproduct">New Product</Link></li>
            <li><Link to="/product">Product List</Link></li>
            <li><Link to="/order">Order List</Link></li>
            <li>
                <button className="btn btn-info"
                onClick={logout}> Welcome - {localStorage.getItem("fullname")} - Logout</button>
            </li>   
        </ul>
    )
}

export default AdminHeader;

const logout = ()=>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/login";
   // window.location.href="http://localhost:5500/index.html/#/login";
    window.location.reload();
}