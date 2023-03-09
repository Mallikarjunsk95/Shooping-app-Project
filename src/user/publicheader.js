import { Link } from "react-router-dom";

const PublicHeader =()=>{
    return(
        <ul className="block2">
            <li><Link to="/">Shopping</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/wishlist">My Wishlist</Link></li>   
        </ul>
    )
}

export default PublicHeader;