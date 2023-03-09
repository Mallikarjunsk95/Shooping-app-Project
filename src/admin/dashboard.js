import { useEffect, useState } from "react";

const MyDashboard = ()=>{
    let [product, updateProduct] = useState([]);
    let [order, updateOrder] = useState([]);

    const getProduct = ()=>{
        fetch("http://localhost:1234/product")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray);
        })
    }

    const getOrder =()=>{
        fetch("http://localhost:1234/order")
        .then(response=>response.json())
        .then(orderArray=>{
            updateOrder(orderArray);
        })
    }

    useEffect(()=>{
        getProduct();
        getOrder();
    },[1]); //calling will happen only one time
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-12 text-center mb-5">
                    <h1 className="text-info">My Dashboard</h1>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3 text-center">
                    <h3 className="text-danger">Total Product <br/>{product.length}</h3>
                </div>
                <div className="col-lg-3 text-center">
                    <h3 className="text-success">Total Orders <br/>{order.length}</h3>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default MyDashboard;