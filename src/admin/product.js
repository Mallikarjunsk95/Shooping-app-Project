import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const MyProduct = ()=>{
    let [product, updateProduct] = useState([]);

    const getProduct = ()=>{
        fetch("http://localhost:1234/product")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray.reverse());
        })
    }
    const deleteItem=(pid, name)=>{
        let url = "http://localhost:1234/product/"+pid;
        let postoption= {method:'DELETE'};
        fetch(url,postoption)
        .then(response=>response.json())
        .then(serverres=>{
            toast(name + "Deleted Successfully...");
            getProduct();
        })
    }

    useEffect(()=>{
        getProduct();
    },[1]);

    return(
        <div className="container mt-4">
            <div className="row">
                <ToastContainer/>
               <h1 className="text-info text-center mb-4">Products</h1>
                <div className="col-lg-12">
                    <table cellPadding="15px" className="table table-bordered shadow-lg">
                        <thead>
                            <tr className="bg-secondary">
                                <th>Sl.No</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((pdetails, index)=>{
                                    return(
                                    <tr key={index}>
                                        <td>{(index+1)}</td>
                                        <td>{pdetails.name}</td>
                                        <td>{pdetails.price}</td>
                                        <td>
                                           <img src={pdetails.photo} height="50" width="60"/>
                                            </td>
                                        <td>{pdetails.details}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" 
                                            onClick={deleteItem.bind(this,pdetails.id, pdetails.name)}>Delete</button>
                                        </td>
                                        
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-2"></div>

            </div>
        </div>
      
    )
}

export default MyProduct;
