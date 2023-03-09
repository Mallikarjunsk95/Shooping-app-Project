import { useState, useEffect } from "react";
const MyOrder = ()=>{
     let [order, updateOrder] = useState([]);

    const getOrder =()=>{
        fetch("http://localhost:1234/order")
        .then(response=>response.json())
        .then(orderArray=>{
            updateOrder(orderArray.reverse());
        })
    }

    useEffect(()=>{
        getOrder();
    },[1]); //calling will happen only one time

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3> Order Management : {order.length} </h3>
                </div>
            </div>
            {
                order.map((myorder, index)=>{
                    return(
                        <div className="row mb-5">
                            <div className="col-lg-3">
                                <h5>Customer Details</h5>
                                <p>Name - {myorder.customername}</p>
                                <p>Mobile No - {myorder.mobile}</p>
                                <p>Emailid - {myorder.email}</p>
                                <p>Delivery Address - {myorder.address}</p>
                            </div>
                            <div className="col-lg-9">
                                <h5 className="text-center text-primary">
                                    Items ordered:{myorder.orderitem.length}
                                    </h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>Item Id</td>
                                                <td>Name</td>
                                                <td>Price</td>
                                                <td>Quantity</td>
                                                <td>Total cost</td>
                                                <td>Photo</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myorder.orderitem.map((item, index2)=>{
                                                    return(
                                                        <tr key={index2}>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.price*item.qty}</td>
                                                            <td>
                                                                <img src={item.photo} height="40"/>
                                                            </td>
                                        
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
 export default MyOrder;