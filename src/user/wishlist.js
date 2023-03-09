import { useState,useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";

const MyWish = ()=>{
    let [product, updateProduct] = useState([]);
    const getProduct = ()=>{
      fetch("http://localhost:1234/wishlist")
      .then(response=>response.json())
      .then(productArray=>{
          updateProduct(productArray.reverse());
      })
  }
  

  useEffect(()=>{
      getProduct();
  },[1]);
  const saveCart=(productinfo)=>{
    productinfo["qty"] = 1;
    let postoption = {
        headers:{'Content-Type':'application/json'},
        method:'POST',
        body:JSON.stringify(productinfo)
    };
    let url = "http://localhost:1234/cart";
    fetch(url, postoption )
    .then(response=>response.json())
    .then(serverres=>{
        toast(productinfo.name + "Added in your Cart");
        
    })
}
    return(
        <>        
        <div className="container">
        <ToastContainer/>
          <div className="row">
              
              {
                  product.map((pinfo, index)=>{
                      return(
                          <div key={index} className="col-lg-3 mb-4">
                              <div className="p-4 shadow-lg rounded">
                                  <h4 className="text-primary text-center">{pinfo.name}</h4>
                                  <img src={pinfo.photo} height="150" width="100%"/>
                                  <p className="text-center">
                                      <del className="m-2 text-danger">
                                          {parseInt(pinfo.price) + parseInt(pinfo.price *10/100)}
                                      </del>
                                      <ins className="m-2 text-primary">Rs.{pinfo.price}</ins>
                                  </p>
                                  <p className="text-center">{pinfo.details}</p>
                                  <div className="text-center mt-3">
                                      <button className="btn btn-danger btn-sm m-2"
                                      onClick={saveCart.bind(this, pinfo)}>Add to Cart</button>
                                      <button className="btn btn-warning btn-sm m-2">Add to Wishlist</button>
                                  </div>
                              </div>

                          </div>
                      )
                  })
              }
          </div>
        </div>
      </>
       
    )
}

export default MyWish;